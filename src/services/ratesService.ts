// ============================================================
// RATES SERVICE — Simulador UX Dual
// ============================================================
// FUENTES (en orden de prioridad):
//   1. rendimientos.co/api/config  → sección "garantizados"
//   2. /rates.json                → generado por GitHub Actions (CAFCI)
//   3. Fallback estático          → simulatorRates.ts (Perfil.com mar-2026)
// ============================================================

import {
  WALLET_RATES,
  TRADITIONAL_AVERAGE_TNA,
  UX_DUAL_CONFIG,
} from "@/data/simulatorRates";

// -------------------------------------------------------
// Tipos públicos del servicio
// -------------------------------------------------------

export type RateSourceType =
  | "cafci"
  | "official_api"
  | "official_site"
  | "aggregator"
  | "fallback";

export interface RateEntry {
  id: string;
  name: string;
  tna: number;
  color: string;
  status: "live" | "fallback" | "pending";
  sourceType?: RateSourceType;
  sourceLabel?: string;
  lastUpdated?: string | null;
}

export interface RatesPayload {
  uxTna: number;
  traditionalAverageTna: number;
  wallets: RateEntry[];
  lastUpdated: string;
  isFallback: boolean;
  liveCount?: number;
}

// -------------------------------------------------------
// Fallback estático (siempre disponible)
// -------------------------------------------------------

export const FALLBACK_RATES: RatesPayload = {
  uxTna: UX_DUAL_CONFIG.tna,
  traditionalAverageTna: TRADITIONAL_AVERAGE_TNA,
  wallets: WALLET_RATES.map((w) => ({
    ...w,
    status: "fallback" as const,
    sourceType: "fallback" as const,
    sourceLabel: "Dato estático de referencia",
  })),
  lastUpdated: "referencia",
  isFallback: true,
  liveCount: 0,
};

// -------------------------------------------------------
// URLs
// -------------------------------------------------------

// En desarrollo: usa el proxy de Vite para evitar CORS
// En producción: va directo a rendimientos.co
const RENDIMIENTOS_URL = import.meta.env.DEV
  ? "/api/rendimientos"
  : "https://rendimientos.co/api/config";

const RATES_URL: string =
  (import.meta.env.VITE_RATES_URL as string | undefined) ?? "/rates.json";

// -------------------------------------------------------
// Colores por wallet (para enriquecer datos de rendimientos.co)
// -------------------------------------------------------

const WALLET_COLORS: Record<string, string> = Object.fromEntries(
  WALLET_RATES.map((w) => [w.id, w.color])
);

// -------------------------------------------------------
// Helpers de validación
// -------------------------------------------------------

function isValidTna(v: unknown): v is number {
  return typeof v === "number" && isFinite(v) && v > 0 && v < 5;
}

function normalizeWallet(
  raw: unknown,
  fallback?: (typeof WALLET_RATES)[0]
): RateEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const id    = typeof r.id    === "string" ? r.id    : fallback?.id;
  const name  = typeof r.name  === "string" ? r.name  : fallback?.name;
  const color = typeof r.color === "string" ? r.color : (fallback?.color ?? "#888");
  const tna   = isValidTna(r.tna)
    ? r.tna
    : fallback && isValidTna(fallback.tna)
      ? fallback.tna
      : null;

  if (!id || !name || tna === null) return null;

  const rawStatus = r.status;
  const status: RateEntry["status"] =
    rawStatus === "live" || rawStatus === "pending"
      ? rawStatus
      : "fallback";

  const validSourceTypes: RateSourceType[] = ["cafci", "official_api", "official_site", "aggregator", "fallback"];
  const sourceType: RateSourceType | undefined =
    validSourceTypes.includes(r.sourceType as RateSourceType)
      ? (r.sourceType as RateSourceType)
      : undefined;

  return {
    id,
    name,
    tna,
    color,
    status,
    sourceType,
    sourceLabel:  typeof r.sourceLabel  === "string" ? r.sourceLabel  : undefined,
    lastUpdated:  typeof r.lastUpdated  === "string" ? r.lastUpdated
                : r.lastUpdated === null ? null : undefined,
  };
}

// -------------------------------------------------------
// Fuente 1: rendimientos.co/api/config → garantizados
// -------------------------------------------------------

interface RendimientosEntry {
  tna: number;       // decimal (ya convertido de %)
  nombre: string;
  vigente: string;
}

async function tryFetchRendimientos(): Promise<Map<string, RendimientosEntry> | null> {
  try {
    const res = await fetch(RENDIMIENTOS_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;

    const json = await res.json();
    if (!Array.isArray(json?.garantizados)) return null;

    const map = new Map<string, RendimientosEntry>();

    for (const g of json.garantizados) {
      if (!g.activo || typeof g.tna !== "number" || g.tna <= 0) continue;
      if (typeof g.id !== "string") continue;

      const tna = g.tna / 100; // 25 → 0.25
      if (!isValidTna(tna)) continue;

      map.set(g.id, {
        tna,
        nombre: typeof g.nombre === "string" ? g.nombre : g.id,
        vigente: typeof g.vigente_desde === "string" ? g.vigente_desde : "",
      });
    }

    return map.size > 0 ? map : null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------
// Fuente 1b: rendimientos.co/api/fci → FCIs (Mercado Fondo, Delta Pesos)
// -------------------------------------------------------

// Mapeo: nuestro wallet id → nombre del FCI en rendimientos.co/api/fci
const FCI_NAME_MAP: Record<string, string> = {
  mercadopago: "Mercado Fondo - Clase A",
  personalpay: "Delta Pesos - Clase A",
};

const RENDIMIENTOS_FCI_URL = import.meta.env.DEV
  ? "/api/rendimientos-fci"
  : "https://rendimientos.co/api/fci";

async function tryFetchFciRates(): Promise<Map<string, number> | null> {
  try {
    const res = await fetch(RENDIMIENTOS_FCI_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const fcis = json?.data;
    if (!Array.isArray(fcis)) return null;

    const map = new Map<string, number>();

    for (const [walletId, fciName] of Object.entries(FCI_NAME_MAP)) {
      const fci = fcis.find(
        (f: Record<string, unknown>) => f.nombre === fciName
      );
      if (fci && typeof fci.tna === "number" && fci.tna > 0) {
        const tna = fci.tna / 100; // 21.17 → 0.2117
        if (isValidTna(tna)) {
          map.set(walletId, tna);
        }
      }
    }

    return map.size > 0 ? map : null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------
// Fuente 2: rates.json (GitHub Actions / CAFCI)
// -------------------------------------------------------

async function tryFetchRatesJson(): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(RATES_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json && typeof json === "object" ? json as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------
// Función principal de fetch
// -------------------------------------------------------

export async function fetchRates(): Promise<RatesPayload> {
  // Obtener todas las fuentes en paralelo
  const [rendimientosResult, fciResult, ratesJsonResult] = await Promise.allSettled([
    tryFetchRendimientos(),
    tryFetchFciRates(),
    tryFetchRatesJson(),
  ]);

  const rendimientos = rendimientosResult.status === "fulfilled"
    ? rendimientosResult.value : null;
  const fciRates = fciResult.status === "fulfilled"
    ? fciResult.value : null;
  const ratesJson = ratesJsonResult.status === "fulfilled"
    ? ratesJsonResult.value : null;

  // Si no hay ninguna fuente disponible, lanzar para que useRates use fallback
  if (!rendimientos && !fciRates && !ratesJson) {
    throw new Error("fetchRates: ninguna fuente de tasas disponible");
  }

  // Construir lista de wallets: nuestra lista base, enriquecida con datos live
  const wallets: RateEntry[] = WALLET_RATES.map((fb) => {
    // Prioridad 1a: rendimientos.co garantizados (Naranja X, Ualá)
    const rData = rendimientos?.get(fb.id);
    if (rData) {
      return {
        id: fb.id,
        name: fb.name,
        tna: rData.tna,
        color: fb.color,
        status: "live" as const,
        sourceType: "aggregator" as RateSourceType,
        sourceLabel: "Tercero conectado a CAFCI",
        lastUpdated: rData.vigente || new Date().toISOString(),
      };
    }

    // Prioridad 1b: rendimientos.co/api/fci (Mercado Fondo, Delta Pesos)
    const fciTna = fciRates?.get(fb.id);
    if (fciTna) {
      return {
        id: fb.id,
        name: fb.name,
        tna: fciTna,
        color: fb.color,
        status: "live" as const,
        sourceType: "aggregator" as RateSourceType,
        sourceLabel: "Tercero conectado a CAFCI",
        lastUpdated: new Date().toISOString(),
      };
    }

    // Prioridad 2: rates.json
    if (ratesJson && Array.isArray(ratesJson.wallets)) {
      const rjWallet = (ratesJson.wallets as unknown[]).find(
        (w) => (w as Record<string, unknown>).id === fb.id
      );
      if (rjWallet) {
        const normalized = normalizeWallet(rjWallet, fb);
        if (normalized) return normalized;
      }
    }

    // Prioridad 3: fallback estático
    return {
      id: fb.id,
      name: fb.name,
      tna: fb.tna,
      color: fb.color,
      status: "fallback" as const,
      sourceType: "fallback" as RateSourceType,
      sourceLabel: "Dato estático de referencia",
    };
  });

  const liveCount = wallets.filter((w) => w.status === "live").length;

  // Recalcular promedio si hay alguna tasa live
  const avgTna = liveCount > 0
    ? wallets.reduce((s, w) => s + w.tna, 0) / wallets.length
    : (isValidTna(ratesJson?.traditional_average_tna as number)
        ? (ratesJson!.traditional_average_tna as number)
        : TRADITIONAL_AVERAGE_TNA);

  // ux_tna siempre refleja la tasa de Delta Pesos - Clase A (personalpay)
  const personalpayWallet = wallets.find((w) => w.id === "personalpay");
  const uxTna =
    personalpayWallet && isValidTna(personalpayWallet.tna)
      ? personalpayWallet.tna
      : isValidTna(ratesJson?.ux_tna as number)
        ? (ratesJson!.ux_tna as number)
        : UX_DUAL_CONFIG.tna;

  const lastUpdated =
    typeof ratesJson?.lastUpdated === "string" && ratesJson.lastUpdated
      ? ratesJson.lastUpdated as string
      : new Date().toISOString();

  return {
    uxTna,
    traditionalAverageTna: avgTna,
    wallets,
    lastUpdated,
    isFallback: liveCount === 0 && !ratesJson,
    liveCount,
  };
}
