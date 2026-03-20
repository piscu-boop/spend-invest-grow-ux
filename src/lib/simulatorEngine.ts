// ============================================================
// MOTOR DE CÁLCULO — SIMULADOR UX DUAL  v2.1
// ============================================================
//
// CAMBIOS v2.1:
//   • Modelo de gasto uniforme diario (reemplaza 3 franjas con pesos)
//
// CAMBIOS v2.0:
//   • Interés compuesto (reemplaza linealización simple)
//   • Documentación matemática completa
//
// ============================================================
// MODELO MATEMÁTICO
// ============================================================
//
// 1. CONVERSIÓN DE TASA
//    ─────────────────────────────────────────────────────────
//    effectiveRate(TNA, days) = (1 + TNA)^(days/365) − 1
//
//    Consistente con capitalización diaria de FCI money market.
//    Ejemplo: TNA = 23% → 30 días → (1.23)^(30/365) − 1 ≈ 1.71%
//
// 2. MODELO DE GASTO — DISTRIBUCIÓN UNIFORME DIARIA
//    ─────────────────────────────────────────────────────────
//    El usuario elige un día d (principio=5, mitad=15, fin=25).
//    El gasto total G se distribuye uniformemente entre los
//    días 1 y d:
//
//      gasto_diario = G / d
//
//    Desde el día d+1 al 30 no se agrega nuevo gasto.
//
//    Para cada día t (de 1 a d) se gasta gasto_diario.
//    Ese monto estuvo invertido t días antes de gastarse,
//    y queda (30 − t) días después del gasto.
//
// 3. UX DUAL — Rendimiento
//    ─────────────────────────────────────────────────────────
//    a) Dinero NO gastado (unspent):
//       yieldUnspent = unspent × effectiveRate(TNA_UX, 30)
//
//    b) Por cada día t (1..d), gasto_diario:
//       PRE:  gasto_diario × effectiveRate(TNA_UX, t)
//       POST: gasto_diario × effectiveRate(TNA_UX, 30 − t) × 0.67
//
//    Total UX = yieldUnspent + Σ_{t=1}^{d}(PRE_t + POST_t)
//
// 4. BILLETERA TRADICIONAL — Rendimiento
//    ─────────────────────────────────────────────────────────
//    a) Dinero NO gastado:
//       yieldUnspent = unspent × effectiveRate(TNA_trad, 30)
//
//    b) Por cada día t (1..d), gasto_diario:
//       yield_t = gasto_diario × effectiveRate(TNA_trad, t)
//       → una vez gastado, deja de generar rendimiento
//
//    Total Tradicional = yieldUnspent + Σ_{t=1}^{d}(yield_t)
//
// 5. PROYECCIÓN ANUAL
//    ─────────────────────────────────────────────────────────
//    yearlyAdvantage = monthlyAdvantage × 12
//    (multiplicación simple, no compuesta)
//
// ============================================================

import {
  UX_DUAL_CONFIG,
  TRADITIONAL_AVERAGE_TNA,
  WALLET_RATES,
  SPEND_MOMENT_MAP,
  type SpendMoment,
} from "@/data/simulatorRates";

// -------------------------------------------------------
// CONVERSIÓN DE TASAS — INTERÉS COMPUESTO
// -------------------------------------------------------

/**
 * Convierte TNA a tasa efectiva para N días usando interés compuesto.
 *
 * Fórmula: (1 + TNA)^(days/365) − 1
 *
 * Esto es más preciso que la linealización TNA/365×días
 * y consistente con la capitalización diaria de los FCI.
 *
 * @param tna  Tasa Nominal Anual como decimal (ej: 0.23 = 23%)
 * @param days Cantidad de días
 * @returns    Tasa efectiva para el período (ej: 0.0171 = 1.71%)
 */
export function tnaToEffectiveRate(tna: number, days: number): number {
  if (days <= 0 || tna <= 0) return 0;
  return Math.pow(1 + tna, days / 365) - 1;
}

/**
 * Alias para compatibilidad con código existente.
 * @deprecated Usar tnaToEffectiveRate() directamente.
 */
export const tnaToNDays = tnaToEffectiveRate;

// -------------------------------------------------------
// MODELO DE GASTO — DISTRIBUCIÓN UNIFORME DIARIA
// -------------------------------------------------------
// El usuario elige un perfil de gasto que mapea a un día d.
// El gasto total G se reparte uniformemente entre día 1 y día d:
//   gasto_diario = G / d
// Desde día d+1 a 30 no hay nuevo gasto.

// -------------------------------------------------------
// INPUTS & VALIDACIÓN
// -------------------------------------------------------

export interface SimulatorInput {
  /** Dinero disponible al inicio del mes (en ARS). */
  initialAmount: number;
  /** Gasto total del mes (en ARS). Debe ser ≤ initialAmount. */
  spentAmount: number;
  /** Momento en que se concentra el gasto: principio / mitad / fin. */
  spendMoment: SpendMoment;
}

export interface SimulatorValidation {
  valid: boolean;
  error?: string;
}

export function validateInput(input: SimulatorInput): SimulatorValidation {
  if (!input.initialAmount || input.initialAmount <= 0) {
    return { valid: false, error: "Ingresá un monto inicial mayor a cero." };
  }
  if (input.spentAmount < 0) {
    return { valid: false, error: "El pago no puede ser negativo." };
  }
  if (input.spentAmount > input.initialAmount) {
    return {
      valid: false,
      error: "El pago no puede superar el dinero disponible.",
    };
  }
  return { valid: true };
}

// -------------------------------------------------------
// CÁLCULO UX DUAL (distribución uniforme diaria)
// -------------------------------------------------------

/**
 * Retorno mensual estimado con UX Dual.
 *
 * Distribuye el gasto G uniformemente entre día 1 y día d.
 * Para cada día t: gasto_diario rindió t días PRE gasto (100%)
 * y (30 − t) días POST gasto (67%).
 */
export function calcUXDualReturn(
  input: SimulatorInput,
  uxTna?: number
): number {
  const { initialAmount, spentAmount, spendMoment } = input;
  const { spentYieldFactor, monthDays } = UX_DUAL_CONFIG;
  const tna = uxTna ?? UX_DUAL_CONFIG.tna;

  const unspentAmount = initialAmount - spentAmount;
  const spendDay = SPEND_MOMENT_MAP[spendMoment]; // d

  // Rendimiento del dinero no gastado (30 días completos)
  const returnUnspent = unspentAmount * tnaToEffectiveRate(tna, monthDays);

  // Si no hay gasto, solo devolver rendimiento del no gastado
  if (spentAmount <= 0 || spendDay <= 0) return returnUnspent;

  // Gasto diario uniforme: G / d
  const dailySpend = spentAmount / spendDay;

  // Rendimiento del dinero gastado, día por día
  let returnSpent = 0;
  for (let t = 1; t <= spendDay; t++) {
    // Tramo PRE gasto: el dinero estuvo invertido t días antes de gastarse
    const yieldPre = dailySpend * tnaToEffectiveRate(tna, t);

    // Tramo POST gasto: queda congelado (30 − t) días, usuario recibe 67%
    const yieldPost = dailySpend * tnaToEffectiveRate(tna, monthDays - t) * spentYieldFactor;

    returnSpent += yieldPre + yieldPost;
  }

  return returnUnspent + returnSpent;
}

// -------------------------------------------------------
// CÁLCULO BILLETERA TRADICIONAL (distribución uniforme diaria)
// -------------------------------------------------------

/**
 * Retorno mensual de una billetera tradicional.
 *
 * Distribuye el gasto G uniformemente entre día 1 y día d.
 * Dinero gastado en día t solo rindió t días (deja de rendir al gastarse).
 */
export function calcTraditionalReturn(
  input: SimulatorInput,
  tna: number
): number {
  const { initialAmount, spentAmount, spendMoment } = input;
  const { monthDays } = UX_DUAL_CONFIG;

  const unspentAmount = initialAmount - spentAmount;
  const spendDay = SPEND_MOMENT_MAP[spendMoment]; // d

  // Dinero no gastado: rinde los 30 días
  const returnUnspent = unspentAmount * tnaToEffectiveRate(tna, monthDays);

  // Si no hay gasto, solo devolver rendimiento del no gastado
  if (spentAmount <= 0 || spendDay <= 0) return returnUnspent;

  // Gasto diario uniforme: G / d
  const dailySpend = spentAmount / spendDay;

  // Dinero gastado día por día: rinde solo hasta el día de gasto
  let returnSpent = 0;
  for (let t = 1; t <= spendDay; t++) {
    returnSpent += dailySpend * tnaToEffectiveRate(tna, t);
  }

  return returnUnspent + returnSpent;
}

// -------------------------------------------------------
// RESULTADO PRINCIPAL
// -------------------------------------------------------

export interface WalletResult {
  id: string;
  name: string;
  tna: number;
  color: string;
  monthlyReturn: number;
  /** Diferencia UX − wallet (positivo = UX gana). */
  advantageVsUX: number;
}

export interface SimulatorResult {
  uxMonthlyReturn: number;
  traditionalAverageMonthlyReturn: number;
  /** Ventaja mensual de UX sobre el promedio tradicional. */
  uxAdvantageMonthly: number;
  /** Proyección anual de esa ventaja (× 12). */
  uxAdvantageYearly: number;
  /** Comparativa individual por billetera. */
  walletResults: WalletResult[];
  /** Input original para referencias en la UI. */
  input: SimulatorInput;
  /** Día promedio de gasto según la selección del usuario (legacy, para UI). */
  avgSpendDay: number;
}

/**
 * Sobreescrituras de tasas opcionales.
 * Cuando se proveen, reemplazan los valores estáticos de simulatorRates.ts.
 * Usar junto con el hook useRates() para pasar datos en tiempo real.
 */
export interface RateOverrides {
  uxTna?: number;
  traditionalAverageTna?: number;
  wallets?: Array<{ id: string; name: string; tna: number; color: string }>;
}

/**
 * Función principal del simulador.
 * Recibe los inputs validados y retorna todos los resultados.
 *
 * @param rateOverrides - Tasas dinámicas desde useRates(). Si se omiten, usa los valores estáticos.
 */
export function calcSimulation(
  input: SimulatorInput,
  rateOverrides?: RateOverrides
): SimulatorResult {
  const uxTna             = rateOverrides?.uxTna             ?? UX_DUAL_CONFIG.tna;
  const traditionalAvgTna = rateOverrides?.traditionalAverageTna ?? TRADITIONAL_AVERAGE_TNA;
  const walletList        = rateOverrides?.wallets            ?? WALLET_RATES;

  const uxMonthlyReturn = calcUXDualReturn(input, uxTna);
  const traditionalAverageMonthlyReturn = calcTraditionalReturn(input, traditionalAvgTna);
  const uxAdvantageMonthly = uxMonthlyReturn - traditionalAverageMonthlyReturn;
  const uxAdvantageYearly  = uxAdvantageMonthly * 12;

  const walletResults: WalletResult[] = walletList.map((wallet) => {
    const monthlyReturn = calcTraditionalReturn(input, wallet.tna);
    return {
      id:           wallet.id,
      name:         wallet.name,
      tna:          wallet.tna,
      color:        wallet.color,
      monthlyReturn,
      advantageVsUX: uxMonthlyReturn - monthlyReturn,
    };
  });

  return {
    uxMonthlyReturn,
    traditionalAverageMonthlyReturn,
    uxAdvantageMonthly,
    uxAdvantageYearly,
    walletResults,
    input,
    avgSpendDay: SPEND_MOMENT_MAP[input.spendMoment],
  };
}

// -------------------------------------------------------
// HELPERS DE FORMATO
// -------------------------------------------------------

/** Formatea un número como moneda ARS sin decimales. */
export function formatARS(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Formatea una TNA como porcentaje con un decimal. */
export function formatTNA(tna: number): string {
  return `${(tna * 100).toFixed(1)}% TNA`;
}
