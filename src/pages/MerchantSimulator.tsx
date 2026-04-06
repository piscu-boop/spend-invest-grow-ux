import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingDown,
  CalendarClock,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  CircleDollarSign,
  BarChart3,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Configuration — easy to update
// ---------------------------------------------------------------------------
const CALENDLY_URL = "https://calendly.com/uxcapital"; // ← Replace with final Calendly URL

// Business rules
const TRADITIONAL_RATES = {
  debit: 0.0168, // 1.68%
  qr: 0.008,    // 0.80%
};
const UX_RATES = {
  // max(0.5%, traditional * 0.5) for each method
  debit: Math.max(0.005, TRADITIONAL_RATES.debit * 0.5), // → 0.0084 (0.84%)
  qr: Math.max(0.005, TRADITIONAL_RATES.qr * 0.5),       // → 0.005 (0.50%)
};
const SETTLEMENT = {
  traditional: { debit: 1, qr: 0 }, // business days
  ux: 17.4, // calendar days average (2nd business day of following month)
};

type PaymentMethod = "debit" | "qr" | "combined";
type SimMode = "estimated" | "real";

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------
const t = {
  es: {
    // Nav badge
    pageBadge: "Simulador para Comercios",

    // Hero
    heroTag: "Para comercios y negocios",
    heroTitle: "¿Cuánto te cobran de más por cada venta?",
    heroSubtitle:
      "Calculá cuánto podrías ahorrar cobrando con UX Capital versus los procesadores de pago tradicionales. Sin compromisos, sin datos sensibles.",
    heroStart: "Calcular ahorro",

    // Mode tabs
    modeEstimated: "Estimado",
    modeReal: "Con mis datos",
    modeEstimatedHint: "Rápido — usá valores aproximados",
    modeRealHint: "Más preciso — ingresá tus datos reales",

    // Inputs
    inputsTitle: "Datos de tu negocio",
    labelVolume: "Volumen mensual de ventas",
    hintVolume: "Total que facturás por mes con tarjetas y QR",
    labelTicket: "Ticket promedio",
    hintTicket: "Valor promedio de cada transacción",
    labelMethod: "Método de cobro principal",
    methodDebit: "Débito",
    methodQr: "QR / transferencia",
    methodCombined: "Combinación",
    labelDebitPct: "% Débito",
    labelQrPct: "% QR / transferencia",
    combinedHint: "El total debe sumar 100%",
    combinedError: "El porcentaje de débito y QR debe sumar exactamente 100%",
    calcBtn: "Ver mi ahorro estimado",
    resetBtn: "Calcular de nuevo",

    // Validation
    errVolume: "Ingresá un volumen mayor a cero.",
    errTicket: "Ingresá un ticket promedio mayor a cero.",
    errExceedsVolume: "El ticket promedio no puede superar el volumen mensual.",

    // Results
    resultTitle: "Tu ahorro estimado con UX Capital",
    resultSubtitle: "Comparando con el benchmark de procesadores tradicionales",
    savingsMonthly: "Ahorro mensual",
    savingsAnnual: "Proyección anual",
    savingsTagline: "menos por cada peso cobrado",
    transactionsEst: "Transacciones estimadas / mes",

    // Comparison table
    compareTitle: "Comparativa detallada",
    colUx: "UX Capital",
    colTraditional: "Tradicional",
    rowCommissionDebit: "Comisión débito",
    rowCommissionQr: "Comisión QR",
    rowTotalCost: "Costo mensual total",
    rowNetIncome: "Ingreso neto mensual",
    rowSettlement: "Acreditación",

    // Settlement labels
    settlementDebitTrad: "T+1",
    settlementQrTrad: "Inmediata",
    settlementCombinedTrad: (days: string) => `Prom. ${days} día(s)`,
    settlementUx: "2° día hábil del mes siguiente",
    settlementUxHint: "Acreditación por defecto al 2° día hábil del mes siguiente",

    // Immediate settlement flag
    immediateTitle: "¿Necesitás acreditación inmediata?",
    immediateBody:
      "Podemos evaluar condiciones de acreditación especiales con un asesor. Hablalo en tu llamada.",

    // CTA
    ctaTitle: "Hablemos de tu negocio",
    ctaBody:
      "Reservá una llamada gratuita con nuestro equipo comercial y recibí una propuesta personalizada.",
    ctaBtn: "Reservar llamada",
    ctaDisclaimer:
      "Sin compromisos. La llamada dura 20 minutos y es completamente gratuita.",

    // Methodology
    methodologyBtn: "Ver supuestos del cálculo",
    methodologyTitle: "Supuestos del cálculo",
    methodologyItems: [
      "Las tasas tradicionales son valores de referencia de mercado: débito 1,68%, QR 0,80%.",
      "La comisión de UX Capital es max(0,50%, tasa_tradicional × 0,5): débito 0,84%, QR 0,50%.",
      "La acreditación UX por defecto se modela como promedio de 17,4 días calendario (2° día hábil del mes siguiente).",
      "El cálculo no incluye impuestos ni otros cargos asociados a cada procesador.",
      "Los valores son estimativos. La propuesta final puede variar según el perfil y volumen del comercio.",
    ],
  },
  en: {
    pageBadge: "Business Simulator",
    heroTag: "For businesses & merchants",
    heroTitle: "How much are you overpaying per sale?",
    heroSubtitle:
      "Calculate how much you could save by accepting payments with UX Capital vs. traditional payment processors. No commitment, no sensitive data required.",
    heroStart: "Calculate savings",

    modeEstimated: "Estimated",
    modeReal: "With my data",
    modeEstimatedHint: "Quick — use approximate values",
    modeRealHint: "More precise — enter your real figures",

    inputsTitle: "Your business data",
    labelVolume: "Monthly sales volume",
    hintVolume: "Total you invoice per month via cards and QR",
    labelTicket: "Average ticket",
    hintTicket: "Average value per transaction",
    labelMethod: "Main payment method",
    methodDebit: "Debit",
    methodQr: "QR / transfer",
    methodCombined: "Combination",
    labelDebitPct: "% Debit",
    labelQrPct: "% QR / transfer",
    combinedHint: "Must add up to 100%",
    combinedError: "Debit and QR percentages must add up to exactly 100%",
    calcBtn: "See my estimated savings",
    resetBtn: "Recalculate",

    errVolume: "Enter a volume greater than zero.",
    errTicket: "Enter an average ticket greater than zero.",
    errExceedsVolume: "Average ticket cannot exceed monthly volume.",

    resultTitle: "Your estimated savings with UX Capital",
    resultSubtitle: "Compared to the traditional processor benchmark",
    savingsMonthly: "Monthly savings",
    savingsAnnual: "Annual projection",
    savingsTagline: "less per peso collected",
    transactionsEst: "Estimated transactions / month",

    compareTitle: "Detailed comparison",
    colUx: "UX Capital",
    colTraditional: "Traditional",
    rowCommissionDebit: "Debit commission",
    rowCommissionQr: "QR commission",
    rowTotalCost: "Total monthly cost",
    rowNetIncome: "Monthly net income",
    rowSettlement: "Settlement",

    settlementDebitTrad: "T+1",
    settlementQrTrad: "Immediate",
    settlementCombinedTrad: (days: string) => `Avg. ${days} day(s)`,
    settlementUx: "2nd business day of following month",
    settlementUxHint: "Default settlement on the 2nd business day of the following month",

    immediateTitle: "Need immediate settlement?",
    immediateBody:
      "We can evaluate special settlement conditions with an advisor. Discuss this on your call.",

    ctaTitle: "Let's talk about your business",
    ctaBody:
      "Book a free call with our commercial team and receive a tailored proposal.",
    ctaBtn: "Book a call",
    ctaDisclaimer:
      "No commitment. The call is 20 minutes and completely free.",

    methodologyBtn: "View calculation assumptions",
    methodologyTitle: "Calculation assumptions",
    methodologyItems: [
      "Traditional rates are market benchmarks: debit 1.68%, QR 0.80%.",
      "UX Capital commission is max(0.50%, traditional_rate × 0.5): debit 0.84%, QR 0.50%.",
      "Default UX settlement is modeled as an average of 17.4 calendar days (2nd business day of following month).",
      "Calculation excludes taxes and other processor-specific fees.",
      "Values are estimates. The final proposal may vary based on merchant profile and volume.",
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatARS(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

function parseNum(raw: string): number {
  const cleaned = raw.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

function formatInput(raw: string): string {
  const num = parseNum(raw);
  if (!num) return raw;
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(num);
}

// ---------------------------------------------------------------------------
// Calculation
// ---------------------------------------------------------------------------
interface CalcInput {
  volume: number;
  ticket: number;
  method: PaymentMethod;
  debitPct: number; // 0–100
  qrPct: number;    // 0–100
}

interface CalcResult {
  transactions: number;
  debitVolume: number;
  qrVolume: number;
  traditionalCost: number;
  uxCost: number;
  monthlySavings: number;
  annualSavings: number;
  traditionalNet: number;
  uxNet: number;
  traditionalSettlementDays: number; // weighted
}

function calculate(input: CalcInput): CalcResult {
  const { volume, ticket, method, debitPct, qrPct } = input;

  const transactions = Math.round(volume / ticket);

  let debitVolume = 0;
  let qrVolume = 0;

  if (method === "debit") {
    debitVolume = volume;
  } else if (method === "qr") {
    qrVolume = volume;
  } else {
    debitVolume = volume * (debitPct / 100);
    qrVolume = volume * (qrPct / 100);
  }

  const traditionalCost =
    debitVolume * TRADITIONAL_RATES.debit + qrVolume * TRADITIONAL_RATES.qr;
  const uxCost =
    debitVolume * UX_RATES.debit + qrVolume * UX_RATES.qr;

  const monthlySavings = traditionalCost - uxCost;
  const annualSavings = monthlySavings * 12;

  const traditionalNet = volume - traditionalCost;
  const uxNet = volume - uxCost;

  const debitShare = debitVolume / volume;
  const qrShare = qrVolume / volume;
  const traditionalSettlementDays =
    debitShare * SETTLEMENT.traditional.debit + qrShare * SETTLEMENT.traditional.qr;

  return {
    transactions,
    debitVolume,
    qrVolume,
    traditionalCost,
    uxCost,
    monthlySavings,
    annualSavings,
    traditionalNet,
    uxNet,
    traditionalSettlementDays,
  };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
interface NumericInputProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  error?: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  label,
  hint,
  value,
  onChange,
  prefix = "$",
  error,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
      {label}
    </label>
    {hint && (
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
        {hint}
      </p>
    )}
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
        error ? "border-red-400/60" : "border-white/15 focus-within:border-[var(--color-accent)]"
      }`}
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <span className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
        {prefix}
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onChange(formatInput(e.target.value))}
        className="flex-1 bg-transparent text-white text-sm font-medium outline-none placeholder:text-white/30"
        placeholder="0"
      />
    </div>
    {error && (
      <p className="text-xs flex items-center gap-1" style={{ color: "#f87171" }}>
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

interface MethodButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const MethodButton: React.FC<MethodButtonProps> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      selected
        ? "text-[var(--color-text-dark)]"
        : "text-white/60 hover:text-white/90"
    }`}
    style={{
      background: selected ? "var(--color-accent)" : "rgba(255,255,255,0.06)",
      border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
    }}
  >
    {label}
  </button>
);

interface CompareRowProps {
  label: string;
  ux: React.ReactNode;
  traditional: React.ReactNode;
  highlight?: boolean;
}

const CompareRow: React.FC<CompareRowProps> = ({ label, ux, traditional, highlight }) => (
  <div
    className={`grid grid-cols-3 gap-2 py-3 px-3 rounded-xl transition-colors ${
      highlight ? "ring-1 ring-[var(--color-accent)]/30" : ""
    }`}
    style={{
      background: highlight
        ? "rgba(77,240,172,0.07)"
        : "rgba(255,255,255,0.03)",
    }}
  >
    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
      {label}
    </span>
    <span
      className="text-xs font-semibold text-center"
      style={{ color: "var(--color-accent)" }}
    >
      {ux}
    </span>
    <span
      className="text-xs font-medium text-center"
      style={{ color: "rgba(255,255,255,0.5)" }}
    >
      {traditional}
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
interface MerchantSimulatorProps {
  onOpenBeta?: () => void;
}

const MerchantSimulator: React.FC<MerchantSimulatorProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const tx = t[language];

  // Mode
  const [mode, setMode] = useState<SimMode>("estimated");

  // Inputs
  const [volumeStr, setVolumeStr] = useState("");
  const [ticketStr, setTicketStr] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("debit");
  const [debitPct, setDebitPct] = useState(70);
  const [qrPct, setQrPct] = useState(30);

  // Validation
  const [errors, setErrors] = useState<{ volume?: string; ticket?: string; combined?: string }>({});

  // Result
  const [result, setResult] = useState<CalcResult | null>(null);

  // Methodology accordion
  const [showMethodology, setShowMethodology] = useState(false);

  const handleDebitPctChange = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    setDebitPct(clamped);
    setQrPct(100 - clamped);
  }, []);

  const handleQrPctChange = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    setQrPct(clamped);
    setDebitPct(100 - clamped);
  }, []);

  const handleCalc = useCallback(() => {
    const volume = parseNum(volumeStr);
    const ticket = parseNum(ticketStr);
    const newErrors: typeof errors = {};

    if (!volume || volume <= 0) newErrors.volume = tx.errVolume;
    if (!ticket || ticket <= 0) newErrors.ticket = tx.errTicket;
    if (ticket > volume) newErrors.ticket = tx.errExceedsVolume;
    if (method === "combined" && debitPct + qrPct !== 100)
      newErrors.combined = tx.combinedError;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setResult(
      calculate({
        volume,
        ticket,
        method,
        debitPct: method === "combined" ? debitPct : method === "debit" ? 100 : 0,
        qrPct: method === "combined" ? qrPct : method === "qr" ? 100 : 0,
      })
    );

    // Scroll to results on mobile
    setTimeout(() => {
      document.getElementById("merchant-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [volumeStr, ticketStr, method, debitPct, qrPct, tx]);

  const handleReset = useCallback(() => {
    setResult(null);
    setErrors({});
  }, []);

  // Settlement display
  const settlementTraditionalLabel = () => {
    if (method === "debit") return tx.settlementDebitTrad;
    if (method === "qr") return tx.settlementQrTrad;
    if (result) {
      return tx.settlementCombinedTrad(result.traditionalSettlementDays.toFixed(1));
    }
    return "—";
  };

  // Savings percentage
  const savingsPct = result && result.traditionalCost > 0
    ? ((result.monthlySavings / result.traditionalCost) * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-dark-2)" }}>
      <Navigation onOpenBeta={onOpenBeta} />

      {/* ──────────────────────────────────────── HERO ── */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0E2240 0%, #1A3560 60%, #0E2240 100%)" }}
      >
        {/* decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(77,240,172,0.08) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(77,240,172,0.05) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="container mx-auto px-5 relative z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
                style={{
                  background: "rgba(77,240,172,0.12)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(77,240,172,0.25)",
                }}
              >
                {tx.heroTag}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-white">
              {tx.heroTitle}
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              {tx.heroSubtitle}
            </p>

            <a
              href="#merchant-simulator"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
            >
              {tx.heroStart}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────── SIMULATOR ── */}
      <section id="merchant-simulator" className="py-14 md:py-20">
        <div className="container mx-auto px-5">

          {/* Mode tabs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-lg">
            {(["estimated", "real"] as SimMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setResult(null); setErrors({}); }}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 px-4 rounded-2xl border text-sm font-medium transition-all duration-200`}
                style={{
                  background: mode === m ? "rgba(77,240,172,0.1)" : "rgba(255,255,255,0.04)",
                  borderColor: mode === m ? "var(--color-accent)" : "rgba(255,255,255,0.1)",
                  color: mode === m ? "var(--color-accent)" : "rgba(255,255,255,0.55)",
                }}
              >
                <span className="font-semibold">
                  {m === "estimated" ? tx.modeEstimated : tx.modeReal}
                </span>
                <span className="text-xs opacity-70">
                  {m === "estimated" ? tx.modeEstimatedHint : tx.modeRealHint}
                </span>
              </button>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── LEFT: Inputs ── */}
            <div
              className="p-6 md:p-8 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={20} style={{ color: "var(--color-accent)" }} />
                <h2 className="text-lg font-bold text-white">{tx.inputsTitle}</h2>
              </div>

              <div className="flex flex-col gap-5">
                {/* Volume */}
                <NumericInput
                  label={tx.labelVolume}
                  hint={tx.hintVolume}
                  value={volumeStr}
                  onChange={setVolumeStr}
                  error={errors.volume}
                />

                {/* Ticket */}
                <NumericInput
                  label={tx.labelTicket}
                  hint={tx.hintTicket}
                  value={ticketStr}
                  onChange={setTicketStr}
                  error={errors.ticket}
                />

                {/* Payment method */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {tx.labelMethod}
                  </label>
                  <div className="flex gap-2">
                    <MethodButton
                      label={tx.methodDebit}
                      selected={method === "debit"}
                      onClick={() => setMethod("debit")}
                    />
                    <MethodButton
                      label={tx.methodQr}
                      selected={method === "qr"}
                      onClick={() => setMethod("qr")}
                    />
                    <MethodButton
                      label={tx.methodCombined}
                      selected={method === "combined"}
                      onClick={() => setMethod("combined")}
                    />
                  </div>
                </div>

                {/* Combined split */}
                {method === "combined" && (
                  <div
                    className="p-4 rounded-2xl flex flex-col gap-4"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {tx.combinedHint}
                    </p>

                    {/* Debit % */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                          {tx.labelDebitPct}
                        </label>
                        <span className="text-sm font-bold" style={{ color: "var(--color-accent)" }}>
                          {debitPct}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={debitPct}
                        onChange={(e) => handleDebitPctChange(Number(e.target.value))}
                        className="w-full accent-[var(--color-accent)] h-1.5"
                      />
                    </div>

                    {/* QR % */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                          {tx.labelQrPct}
                        </label>
                        <span className="text-sm font-bold" style={{ color: "var(--color-accent)" }}>
                          {qrPct}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={qrPct}
                        onChange={(e) => handleQrPctChange(Number(e.target.value))}
                        className="w-full accent-[var(--color-accent)] h-1.5"
                      />
                    </div>

                    {errors.combined && (
                      <p className="text-xs flex items-center gap-1" style={{ color: "#f87171" }}>
                        <AlertCircle size={12} /> {errors.combined}
                      </p>
                    )}
                  </div>
                )}

                {/* CTA */}
                {!result ? (
                  <button
                    type="button"
                    onClick={handleCalc}
                    className="mt-2 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] flex items-center justify-center gap-2"
                    style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
                  >
                    <CircleDollarSign size={16} />
                    {tx.calcBtn}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {tx.resetBtn}
                  </button>
                )}
              </div>
            </div>

            {/* ── RIGHT: Results ── */}
            <div id="merchant-results" className="flex flex-col gap-5">
              {!result ? (
                /* Placeholder before calculation */
                <div
                  className="p-8 rounded-3xl flex flex-col items-center justify-center gap-4 text-center min-h-[260px]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px dashed rgba(255,255,255,0.1)",
                  }}
                >
                  <TrendingDown size={40} style={{ color: "rgba(255,255,255,0.15)" }} />
                  <p style={{ color: "rgba(255,255,255,0.35)" }} className="text-sm">
                    {tx.calcBtn}
                  </p>
                </div>
              ) : (
                <>
                  {/* ── Savings highlight card ── */}
                  <div
                    className="p-6 md:p-8 rounded-3xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(77,240,172,0.12) 0%, rgba(77,240,172,0.04) 100%)",
                      border: "1px solid rgba(77,240,172,0.25)",
                    }}
                  >
                    {/* Decorative glow */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(77,240,172,0.15) 0%, transparent 70%)",
                        transform: "translate(20%, -20%)",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} style={{ color: "var(--color-accent)" }} />
                        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                          {tx.resultTitle}
                        </span>
                      </div>
                      <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {tx.resultSubtitle}
                      </p>

                      {/* Main KPI */}
                      <div className="flex flex-col sm:flex-row gap-5 mb-5">
                        <div>
                          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {tx.savingsMonthly}
                          </p>
                          <p className="text-4xl font-bold text-white">
                            {formatARS(result.monthlySavings)}
                          </p>
                          {savingsPct && (
                            <p className="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
                              {savingsPct}% {tx.savingsTagline}
                            </p>
                          )}
                        </div>

                        <div className="sm:border-l sm:pl-5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {tx.savingsAnnual}
                          </p>
                          <p className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
                            {formatARS(result.annualSavings)}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {tx.transactionsEst}: <span className="text-white font-semibold">{result.transactions.toLocaleString("es-AR")}</span>
                      </p>
                    </div>
                  </div>

                  {/* ── Detailed comparison ── */}
                  <div
                    className="p-6 rounded-3xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="text-sm font-bold text-white mb-4">{tx.compareTitle}</h3>

                    {/* Column headers */}
                    <div className="grid grid-cols-3 gap-2 mb-2 px-3">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }} />
                      <span className="text-xs font-semibold text-center" style={{ color: "var(--color-accent)" }}>
                        {tx.colUx}
                      </span>
                      <span className="text-xs font-semibold text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {tx.colTraditional}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {/* Commission debit — only if debit involved */}
                      {(method === "debit" || method === "combined") && (
                        <CompareRow
                          label={`${tx.rowCommissionDebit} (${formatPct(UX_RATES.debit)} vs ${formatPct(TRADITIONAL_RATES.debit)})`}
                          ux={formatARS(result.debitVolume * UX_RATES.debit)}
                          traditional={formatARS(result.debitVolume * TRADITIONAL_RATES.debit)}
                        />
                      )}

                      {/* Commission QR — only if QR involved */}
                      {(method === "qr" || method === "combined") && (
                        <CompareRow
                          label={`${tx.rowCommissionQr} (${formatPct(UX_RATES.qr)} vs ${formatPct(TRADITIONAL_RATES.qr)})`}
                          ux={formatARS(result.qrVolume * UX_RATES.qr)}
                          traditional={formatARS(result.qrVolume * TRADITIONAL_RATES.qr)}
                        />
                      )}

                      <CompareRow
                        label={tx.rowTotalCost}
                        ux={formatARS(result.uxCost)}
                        traditional={formatARS(result.traditionalCost)}
                        highlight
                      />

                      <CompareRow
                        label={tx.rowNetIncome}
                        ux={formatARS(result.uxNet)}
                        traditional={formatARS(result.traditionalNet)}
                      />

                      {/* Settlement */}
                      <div
                        className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                          {tx.rowSettlement}
                        </span>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-xs font-semibold text-center" style={{ color: "var(--color-accent)" }}>
                            {tx.settlementUx}
                          </span>
                          <span className="text-[10px] text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                            (~{SETTLEMENT.ux}d prom.)
                          </span>
                        </div>
                        <span className="text-xs font-medium text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {settlementTraditionalLabel()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Immediate settlement flag ── */}
                  <div
                    className="p-4 rounded-2xl flex items-start gap-3"
                    style={{
                      background: "rgba(251,191,36,0.07)",
                      border: "1px solid rgba(251,191,36,0.2)",
                    }}
                  >
                    <CalendarClock size={18} className="shrink-0 mt-0.5" style={{ color: "#fbbf24" }} />
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: "#fbbf24" }}>
                        {tx.immediateTitle}
                      </p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {tx.immediateBody}
                      </p>
                    </div>
                  </div>

                  {/* ── Methodology accordion ── */}
                  <button
                    type="button"
                    onClick={() => setShowMethodology((v) => !v)}
                    className="flex items-center gap-2 text-xs transition-colors duration-150 self-start"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {showMethodology ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {tx.methodologyBtn}
                  </button>

                  {showMethodology && (
                    <div
                      className="p-5 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs font-semibold mb-3 text-white">{tx.methodologyTitle}</p>
                      <ul className="flex flex-col gap-2">
                        {tx.methodologyItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                            <span style={{ color: "var(--color-accent)" }}>·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────── CTA ── */}
      <section
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(160deg, #0E2240 0%, #1A3560 100%)",
        }}
      >
        <div className="container mx-auto px-5 text-center max-w-xl">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{ background: "rgba(77,240,172,0.1)", border: "1px solid rgba(77,240,172,0.2)" }}
          >
            <ArrowRight size={24} style={{ color: "var(--color-accent)" }} />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{tx.ctaTitle}</h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            {tx.ctaBody}
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
            style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
          >
            {tx.ctaBtn}
            <ArrowRight size={18} />
          </a>

          <p className="text-xs mt-5" style={{ color: "rgba(255,255,255,0.3)" }}>
            {tx.ctaDisclaimer}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MerchantSimulator;
