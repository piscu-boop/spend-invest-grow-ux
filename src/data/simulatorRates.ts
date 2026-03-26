// ============================================================
// TASAS MOCK DEL SIMULADOR UX DUAL
// ============================================================
// PARA CONECTAR DATOS EN TIEMPO REAL:
//   1. Reemplazar los valores de `tna` en WALLET_RATES y UX_DUAL_CONFIG
//      con llamadas a tu API de tasas.
//   2. Convertir este archivo en un hook (useRates.ts) que haga fetch
//      periódico y exponga los valores actualizados al engine.
//   3. La firma de tipos no cambia — solo los valores numéricos.
// ============================================================

export interface WalletRate {
  id: string;
  name: string;
  /** Tasa Nominal Anual, expresada como decimal. Ej: 0.21 = 21% TNA */
  tna: number;
  color: string;
}

// -------------------------------------------------------
// CONFIGURACIÓN UX DUAL
// -------------------------------------------------------
export const UX_DUAL_CONFIG = {
  /** TNA de UX Dual — refleja Delta Pesos - Clase A (personalpay). Fallback estático. */
  tna: 0.1992,

  /** Fracción del rendimiento post-gasto que recibe el usuario (67%). */
  spentYieldFactor: 0.67,

  /** Días del mes (supuesto del MVP). */
  monthDays: 30,
};

// -------------------------------------------------------
// TASA PROMEDIO DE BILLETERAS TRADICIONALES
// -------------------------------------------------------
// Fuente fallback: Perfil.com — 3 de marzo de 2026
// https://www.perfil.com/noticias/economia/mercado-pago-naranja-x-y-uala-como-arrancan-marzo-las-tasas-de-las-billeteras-virtuales-en-2026-a35.phtml
// En producción, estos valores se sobreescriben con datos de CAFCI via rates.json
export const TRADITIONAL_AVERAGE_TNA = 0.2227;

// -------------------------------------------------------
// BILLETERAS INDIVIDUALES (fallback — sobreescritas por rates.json en runtime)
// -------------------------------------------------------
export const WALLET_RATES: WalletRate[] = [
  { id: "mercadopago",  name: "Mercado Pago (Mercado Fondo - Clase A)",  tna: 0.2117, color: "#009ee3" },
  { id: "naranjax",     name: "Naranja X",                tna: 0.2500, color: "#ff6900" },
  { id: "uala",         name: "Ualá",                     tna: 0.2300, color: "#7b3ff5" },
  { id: "personalpay",  name: "Personal Pay (Delta Pesos - Clase A)",    tna: 0.1992, color: "#e40046" },
];

// -------------------------------------------------------
// LOGOS DE BILLETERAS (archivos locales en public/logos/)
// -------------------------------------------------------
export const WALLET_LOGOS: Record<string, string> = {
  uxdual:       "/favicon.png",
  mercadopago:  "/logos/mercadopago.png",
  naranjax:     "/logos/naranjax.png",
  uala:         "/logos/uala.png",
  personalpay:  "/logos/personalpay.png",
};

// -------------------------------------------------------
// MAPA DE MOMENTOS DE GASTO → DÍA PROMEDIO
// -------------------------------------------------------
export const SPEND_MOMENT_MAP = {
  principio: 5,   // Principio de mes  → día 5
  mitad:     15,  // Mitad de mes      → día 15
  fin:       25,  // Fin de mes        → día 25
} as const;

export type SpendMoment = keyof typeof SPEND_MOMENT_MAP;
