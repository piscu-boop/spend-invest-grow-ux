#!/usr/bin/env node
// @ts-check
/**
 * fetchRates.js — Actualizador automático de tasas para el simulador UX Dual
 * ============================================================================
 * Ejecutado por GitHub Actions cada 6 horas (y manualmente si es necesario).
 * Escribe public/rates.json y docs/rates.json con tasas actualizadas.
 *
 * FUENTES VERIFICADAS
 * ─────────────────────────────────────────────────────────────────────────
 * • Mercado Pago  → CAFCI API — Mercado Fondo - Clase A       — fondo 798, clase 1982
 * • Ualá          → CAFCI API — Ualintec Ahorro Pesos       — fondo 1307, clase 3713
 * • Naranja X     → CAFCI API — Naranja X Money Market       — fondo 1213, clase 3355
 * • Personal Pay  → CAFCI API — Delta Pesos - Clase A        — fondo 394, clase 715
 *
 * ENDPOINT CAFCI UTILIZADO
 * ─────────────────────────────────────────────────────────────────────────
 * GET /fondo/{fundId}/clase/{classId}/ficha
 *   → data.info.diaria.rendimientos.day.rendimiento  (rendimiento diario %)
 *   → Se convierte a TNA: rendimientoDiario * 365 / 100
 *
 * Fuente de referencia: https://github.com/fedemoglia/cafci-api
 * Los IDs se obtienen de: https://www.cafci.org.ar/ficha-fondo.html?q={fundId};{classId}
 *
 * VARIABLES DE ENTORNO
 * ─────────────────────────────────────────────────────────────────────────
 * FORCE_FALLBACK=true  → skippea todos los fetches y usa tasas estáticas
 * DRY_RUN=true         → ejecuta fetch pero no escribe archivos
 */

"use strict";

const fs   = require("fs");
const path = require("path");
const https = require("https");

// ────────────────────────────────────────────────────────────────────────────
// TASAS FALLBACK ESTÁTICAS
// ────────────────────────────────────────────────────────────────────────────
// Fuente: Perfil.com — 3 de marzo de 2026
// https://www.perfil.com/noticias/economia/mercado-pago-naranja-x-y-uala-como-arrancan-marzo-las-tasas-de-las-billeteras-virtuales-en-2026-a35.phtml
// ────────────────────────────────────────────────────────────────────────────
const FALLBACK = {
  ux_tna: 0.23,
  wallets: [
    { id: "mercadopago",  name: "Mercado Pago (Mercado Fondo - Clase A)",  tna: 0.2117, color: "#009ee3" },
    { id: "naranjax",     name: "Naranja X",               tna: 0.2500, color: "#ff6900" },
    { id: "uala",         name: "Ualá",                    tna: 0.2300, color: "#7b3ff5" },
    { id: "personalpay",  name: "Personal Pay (Delta Pesos - Clase A)",   tna: 0.1992, color: "#e40046" },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE FONDOS CAFCI — IDs VERIFICADOS
// ────────────────────────────────────────────────────────────────────────────
// Cada entrada tiene:
//   fundId:    ID numérico del fondo en CAFCI (verificado en cafci.org.ar)
//   classId:   ID numérico de la clase del fondo
//   fundName:  nombre legible del fondo para logging
//   cafciUrl:  URL de la ficha en CAFCI (para verificación humana)
//
// Para verificar/cambiar un fondo:
//   1. Ir a https://www.cafci.org.ar/consultaNombre.html
//   2. Buscar el fondo, abrir la ficha
//   3. De la URL extraer los números: ficha-fondo.html?q={fundId};{classId}
//   4. Actualizar aquí
// ────────────────────────────────────────────────────────────────────────────
const CAFCI_FUND_CONFIG = {
  mercadopago: {
    fundId:    798,
    classId:   1982,
    fundName:  "Mercado Fondo (BIND/IAM)",
    cafciUrl:  "https://www.cafci.org.ar/ficha-fondo.html?q=798;1982",
  },
  uala: {
    fundId:    1307,
    classId:   3713,
    fundName:  "Ualintec Ahorro Pesos",
    cafciUrl:  "https://www.cafci.org.ar/ficha-fondo.html?q=1307;3713",
  },
  naranjax: {
    fundId:    1213,
    classId:   3355,
    fundName:  "Naranja X Money Market",
    cafciUrl:  "https://www.cafci.org.ar/ficha-fondo.html?q=1213;3355",
  },
  personalpay: {
    fundId:    394,
    classId:   715,
    fundName:  "Delta Pesos - Clase A (Fiwind/Personal Pay)",
    cafciUrl:  "https://www.cafci.org.ar/ficha-fondo.html?q=394;715",
  },
};

// Ya no hay wallets pendientes — todas tienen fuente
const PENDING_WALLETS = [];

// ────────────────────────────────────────────────────────────────────────────
// HTTP HELPER
// ────────────────────────────────────────────────────────────────────────────
/**
 * @param {string} url
 * @param {number} [timeoutMs=15000]
 * @returns {Promise<unknown>}
 */
function fetchJson(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "UXDual-RatesBot/2.0 (github-actions)",
          "Accept": "application/json",
        },
      },
      (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchJson(res.headers.location, timeoutMs).then(resolve, reject);
        }

        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error(`HTTP ${res.statusCode} desde ${url} — body: ${raw.slice(0, 200)}`));
          }
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(new Error(`JSON parse error (${url}): ${/** @type {Error} */ (e).message} — raw: ${raw.slice(0, 200)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => req.destroy(new Error(`Timeout ${timeoutMs}ms: ${url}`)));
  });
}

// ────────────────────────────────────────────────────────────────────────────
// CAFCI — OBTENER TNA DESDE FICHA DEL FONDO
// ────────────────────────────────────────────────────────────────────────────
// Endpoint: GET /fondo/{fundId}/clase/{classId}/ficha
// Response: { data: { info: { diaria: { rendimientos: { day: { rendimiento: number } } } } } }
// El campo "rendimiento" es el rendimiento diario en porcentaje (ej: 0.0534 = 0.0534%)
// TNA = rendimientoDiario * 365 / 100
//
// Fuente: https://github.com/fedemoglia/cafci-api/blob/master/getDailyYield.gs
// ────────────────────────────────────────────────────────────────────────────

/**
 * @param {number} fundId
 * @param {number} classId
 * @param {string} fundName
 * @returns {Promise<{tna: number, dailyYield: number} | null>}
 */
async function cafciGetDailyTNA(fundId, classId, fundName) {
  const url = `https://api.cafci.org.ar/fondo/${fundId}/clase/${classId}/ficha`;
  console.log(`  [CAFCI] GET ${url}`);

  const data = /** @type {any} */ (await fetchJson(url));

  // Navegar la estructura: data.info.diaria.rendimientos.day.rendimiento
  const dailyYield = data?.data?.info?.diaria?.rendimientos?.day?.rendimiento;

  if (dailyYield === undefined || dailyYield === null) {
    console.warn(`  [CAFCI] Campo rendimiento no encontrado para ${fundName}`);
    console.warn(`  [CAFCI] Estructura recibida (keys): ${JSON.stringify(Object.keys(data?.data ?? {}))}`);

    // Intentar ruta alternativa: data.rendimientos o data.diaria
    const alt1 = data?.data?.rendimiento;
    const alt2 = data?.rendimiento;
    if (typeof alt1 === "number" || typeof alt2 === "number") {
      const altVal = /** @type {number} */ (typeof alt1 === "number" ? alt1 : alt2);
      console.log(`  [CAFCI] Usando ruta alternativa, rendimiento: ${altVal}`);
      const tna = altVal * 365 / 100;
      if (tna > 0.05 && tna < 2.0) return { tna: parseFloat(tna.toFixed(6)), dailyYield: altVal };
    }

    return null;
  }

  const rendimiento = parseFloat(String(dailyYield));
  if (isNaN(rendimiento) || rendimiento === 0) {
    console.warn(`  [CAFCI] Rendimiento inválido para ${fundName}: ${dailyYield}`);
    return null;
  }

  // Convertir rendimiento diario (%) a TNA decimal
  // Ej: 0.0534% diario → 0.0534 * 365 / 100 = 0.1949 (19.49% TNA)
  const tna = rendimiento * 365 / 100;

  // Validar rango razonable: 5% – 200% TNA
  if (tna < 0.05 || tna > 2.0) {
    console.warn(`  [CAFCI] TNA fuera de rango para ${fundName}: ${(tna * 100).toFixed(2)}% — descartando`);
    return null;
  }

  console.log(`  [CAFCI] ✅ ${fundName}: rendimiento diario ${rendimiento.toFixed(4)}% → TNA ${(tna * 100).toFixed(2)}%`);
  return { tna: parseFloat(tna.toFixed(6)), dailyYield: rendimiento };
}

/**
 * Fallback: intentar obtener TNA via endpoint de rendimiento entre dos fechas
 * GET /fondo/{fundId}/clase/{classId}/rendimiento/{startDate}/{endDate}
 * @param {number} fundId
 * @param {number} classId
 * @param {string} fundName
 * @returns {Promise<{tna: number} | null>}
 */
async function cafciGetPeriodTNA(fundId, classId, fundName) {
  // Pedir rendimiento de los últimos 7 días
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 7);

  const fmt = (/** @type {Date} */ d) => d.toISOString().split("T")[0];
  const url = `https://api.cafci.org.ar/fondo/${fundId}/clase/${classId}/rendimiento/${fmt(startDate)}/${fmt(endDate)}`;
  console.log(`  [CAFCI] GET (fallback período) ${url}`);

  const data = /** @type {any} */ (await fetchJson(url));
  const rendimiento = data?.data?.rendimiento ?? data?.rendimiento;

  if (typeof rendimiento !== "number" || rendimiento === 0) {
    console.warn(`  [CAFCI] Sin rendimiento de período para ${fundName}`);
    return null;
  }

  // rendimiento es el rendimiento total del período en %
  // Convertir a TNA: (rendimiento / días) * 365 / 100
  const days = 7;
  const tna = (rendimiento / days) * 365 / 100;

  if (tna < 0.05 || tna > 2.0) {
    console.warn(`  [CAFCI] TNA período fuera de rango para ${fundName}: ${(tna * 100).toFixed(2)}%`);
    return null;
  }

  console.log(`  [CAFCI] ✅ ${fundName} (período): rendimiento ${rendimiento.toFixed(4)}% en ${days}d → TNA ${(tna * 100).toFixed(2)}%`);
  return { tna: parseFloat(tna.toFixed(6)) };
}

// ────────────────────────────────────────────────────────────────────────────
// RENDIMIENTOS.CO — FUENTE PRIMARIA (garantizados)
// ────────────────────────────────────────────────────────────────────────────
// Endpoint: GET https://rendimientos.co/api/config
// Sección "garantizados": billeteras con tasa garantizada
// TNA viene como entero porcentual (25 = 25%), se convierte a decimal (0.25)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene tasas desde rendimientos.co/api/config → garantizados
 * @returns {Promise<Record<string, {tna: number, nombre: string, vigente: string}>>}
 */
async function fetchRendimientosConfig() {
  const url = "https://rendimientos.co/api/config";
  console.log(`\n  [rendimientos.co] GET ${url}`);

  const data = /** @type {any} */ (await fetchJson(url));

  if (!data?.garantizados || !Array.isArray(data.garantizados)) {
    throw new Error("No se encontró array 'garantizados' en la respuesta");
  }

  const map = {};
  for (const g of data.garantizados) {
    if (!g.activo || typeof g.tna !== "number" || g.tna <= 0) continue;
    const tna = g.tna / 100; // 25 → 0.25
    if (tna < 0.05 || tna > 2.0) continue; // sanity check
    map[g.id] = {
      tna: parseFloat(tna.toFixed(6)),
      nombre: g.nombre || g.id,
      vigente: g.vigente_desde || "",
    };
  }

  console.log(`  [rendimientos.co] ✅ ${Object.keys(map).length} billeteras en garantizados: ${Object.keys(map).join(", ")}`);
  return map;
}

// ────────────────────────────────────────────────────────────────────────────
// RESOLVER TASA DE UNA BILLETERA CON FUENTE CAFCI (fallback de rendimientos.co)
// ────────────────────────────────────────────────────────────────────────────
/**
 * @param {string} walletId
 * @param {typeof CAFCI_FUND_CONFIG[keyof typeof CAFCI_FUND_CONFIG]} config
 * @param {typeof FALLBACK.wallets[0]} fallbackWallet
 * @returns {Promise<object>}
 */
async function resolveCAFCIRate(walletId, config, fallbackWallet) {
  console.log(`\n▶ [${walletId}] Resolviendo via CAFCI — ${config.fundName}`);
  console.log(`  Fondo: ${config.fundId} · Clase: ${config.classId}`);
  console.log(`  Ficha: ${config.cafciUrl}`);

  try {
    // Intento 1: endpoint de ficha (rendimiento diario)
    let result = await cafciGetDailyTNA(config.fundId, config.classId, config.fundName);

    // Intento 2: si falla, probar con rendimiento de período
    if (!result) {
      console.log(`  [CAFCI] Intentando endpoint de período como fallback...`);
      const periodResult = await cafciGetPeriodTNA(config.fundId, config.classId, config.fundName);
      if (periodResult) {
        result = { tna: periodResult.tna, dailyYield: 0 };
      }
    }

    if (!result) {
      throw new Error(`No se pudo obtener TNA para ${config.fundName} (fondo ${config.fundId})`);
    }

    return {
      ...fallbackWallet,
      tna: result.tna,
      status: "live",
      sourceType: "cafci",
      sourceLabel: `CAFCI — ${config.fundName} (fondo ${config.fundId}, clase ${config.classId})`,
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.warn(`  ⚠️  [${walletId}] Fallback por error: ${/** @type {Error} */ (err).message}`);
    return {
      ...fallbackWallet,
      status: "fallback",
      sourceType: "cafci",
      sourceLabel: `CAFCI — ${config.fundName} (error al consultar API, usando referencia Perfil.com mar-2026)`,
      lastUpdated: null,
    };
  }
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────────────
async function main() {
  const now = new Date().toISOString();
  console.log(`\n${"═".repeat(62)}`);
  console.log(`  UX Dual — Actualización de tasas`);
  console.log(`  ${now}`);
  console.log(`${"═".repeat(62)}\n`);

  const forceFallback = process.env.FORCE_FALLBACK === "true";
  const dryRun        = process.env.DRY_RUN === "true";

  if (forceFallback) console.log("⚠️  FORCE_FALLBACK activo — usando tasas estáticas\n");
  if (dryRun)        console.log("🔍 DRY_RUN activo — no se escribirán archivos\n");

  const fallbackMap = Object.fromEntries(FALLBACK.wallets.map((w) => [w.id, w]));
  const updatedWallets = [];

  // ── Paso 1: Obtener tasas de rendimientos.co (fuente primaria) ──
  let rendimientosRates = {};
  if (!forceFallback) {
    try {
      rendimientosRates = await fetchRendimientosConfig();
    } catch (err) {
      console.warn(`  ⚠️  rendimientos.co no disponible: ${/** @type {Error} */ (err).message}`);
      console.warn(`  Continuando con CAFCI como fallback...`);
    }
  }

  // ── Paso 2: Para cada wallet, resolver tasa con cadena de prioridad ──
  for (const walletId of Object.keys(fallbackMap)) {
    const fbWallet = fallbackMap[walletId];

    // Prioridad 1: rendimientos.co
    const rData = rendimientosRates[walletId];
    if (rData) {
      console.log(`\n▶ [${walletId}] Resuelto via rendimientos.co → ${(rData.tna * 100).toFixed(2)}% TNA`);
      updatedWallets.push({
        ...fbWallet,
        tna: rData.tna,
        status: "live",
        sourceType: "aggregator",
        sourceLabel: `Tercero conectado a CAFCI (${rData.nombre}, vigente ${rData.vigente})`,
        lastUpdated: new Date().toISOString(),
      });
      continue;
    }

    // Prioridad 2: CAFCI API (para wallets con fondo verificado)
    const cafciCfg = CAFCI_FUND_CONFIG[/** @type {keyof typeof CAFCI_FUND_CONFIG} */ (walletId)];
    if (cafciCfg && !forceFallback) {
      const result = await resolveCAFCIRate(walletId, cafciCfg, fbWallet);
      updatedWallets.push(result);
      continue;
    }

    // Prioridad 3: fallback estático
    console.log(`\n▶ [${walletId}] Usando fallback estático`);
    updatedWallets.push({
      ...fbWallet,
      status: "fallback",
      sourceType: "fallback",
      sourceLabel: "Referencia Perfil.com mar-2026",
      lastUpdated: null,
    });
  }

  // Recalcular promedio tradicional
  const avgTna =
    updatedWallets.reduce((sum, w) => sum + w.tna, 0) / updatedWallets.length;

  const liveCount = updatedWallets.filter((w) => w.status === "live").length;

  // ── Resumen ──
  console.log(`\n${"─".repeat(62)}`);
  console.log(`  Resumen: ${liveCount}/${updatedWallets.length} billeteras en tiempo real`);
  console.log(`${"─".repeat(62)}`);
  for (const w of updatedWallets) {
    const icon = w.status === "live" ? "🟢" : "🟡";
    console.log(
      `  ${icon}  ${String(w.name).padEnd(18)} ${(w.tna * 100).toFixed(2).padStart(6)}% TNA  [${w.status}]`
    );
  }
  console.log(`  ${"─".repeat(58)}`);
  console.log(`      Promedio tradicional: ${(avgTna * 100).toFixed(2)}% TNA`);
  console.log(`${"─".repeat(62)}\n`);

  // ── Payload final ──
  const output = {
    _comment:     "Generado automáticamente por scripts/fetchRates.js — no editar a mano.",
    _sources: [
      "rendimientos.co/api/config (garantizados) como fuente primaria.",
      "CAFCI API (api.cafci.org.ar) como fallback para billeteras no cubiertas.",
      "Fallback estático: Perfil.com marzo 2026 para billeteras sin fuente automática.",
    ],
    _cafci_ids: {
      mercadopago: "fondo 798, clase 1982 — Mercado Fondo (BIND/IAM)",
      uala:        "fondo 1307, clase 3713 — Ualintec Ahorro Pesos",
      naranjax:    "fondo 1213, clase 3355 — Naranja X Money Market",
    },
    _instructions: [
      "Para forzar actualización manual: node scripts/fetchRates.js",
      "Para probar sin escribir archivos: DRY_RUN=true node scripts/fetchRates.js",
      "Para usar solo fallback: FORCE_FALLBACK=true node scripts/fetchRates.js",
      "Para verificar un ID CAFCI: abrir https://www.cafci.org.ar/ficha-fondo.html?q={fundId};{classId}",
    ],
    version:                "3",
    lastUpdated:            now,
    generatedBy:            "scripts/fetchRates.js",
    liveRatesCount:         liveCount,
    totalWallets:           updatedWallets.length,
    ux_tna:                 FALLBACK.ux_tna,
    traditional_average_tna: parseFloat(avgTna.toFixed(4)),
    wallets:                updatedWallets,
  };

  if (dryRun) {
    console.log("🔍 DRY_RUN — output que se escribiría:");
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  const jsonStr = JSON.stringify(output, null, 2);
  const root    = path.join(__dirname, "..");

  // Siempre escribir public/rates.json
  const publicPath = path.join(root, "public", "rates.json");
  fs.writeFileSync(publicPath, jsonStr, "utf8");
  console.log(`✅ Escrito: public/rates.json`);

  // Escribir docs/rates.json solo si la carpeta existe (GitHub Pages)
  const docsPath = path.join(root, "docs", "rates.json");
  if (fs.existsSync(path.join(root, "docs"))) {
    fs.writeFileSync(docsPath, jsonStr, "utf8");
    console.log(`✅ Escrito: docs/rates.json`);
  } else {
    console.log(`ℹ️  docs/ no existe — solo se actualizó public/rates.json`);
  }

  console.log("\n✨ Actualización completada.\n");
}

main().catch((err) => {
  console.error("\n❌ Error fatal en fetchRates.js:", err);
  process.exit(1);
});
