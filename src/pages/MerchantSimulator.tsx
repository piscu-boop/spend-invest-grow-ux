import { useState, useCallback, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingDown,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  CircleDollarSign,
  BarChart3,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Configuration — easy to update
// ---------------------------------------------------------------------------
const CALENDLY_URL = "https://calendly.com/uxcapital"; // ← Replace with final Calendly URL

// Business rules (internal only — not exposed in UI)
const TRADITIONAL_RATES = {
  debit: 0.0168,
  qr: 0.008,
};
const UX_RATES = {
  debit: Math.max(0.005, TRADITIONAL_RATES.debit * 0.5), // → 0.0084
  qr: Math.max(0.005, TRADITIONAL_RATES.qr * 0.5),       // → 0.005
};

type PaymentMethod = "debit" | "qr" | "combined";

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------
const t = {
  es: {
    // Hero
    heroTag: "Para comercios y negocios",
    heroTitle: "¿Cuánto te cobran de más por cada venta?",
    heroSubtitle:
      "Calculá cuánto podrías ahorrar cobrando con UX Capital versus los procesadores de pago tradicionales. Sin compromisos, sin datos sensibles.",
    heroStart: "Calcular mi ahorro",

    // Inputs
    inputsTitle: "Datos de tu negocio",
    labelVolume: "Volumen mensual de ventas",
    hintVolume: "Total que facturás por mes con tarjetas y QR",
    labelTicket: "Ticket promedio",
    hintTicket: "Valor promedio de cada transacción",
    labelMethod: "Método de cobro principal",
    methodDebit: "Débito",
    methodQr: "QR",
    methodCombined: "Combinación",
    labelDebitPct: "% Débito",
    labelQrPct: "% QR",
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
    resultSubtitle: "Comparando con valores de referencia del mercado",
    savingsMonthly: "Ahorro mensual",
    savingsAnnual: "Proyección anual",
    savingsTagline: "menos en costos de cobro",
    transactionsEst: "Transacciones estimadas / mes",

    // Comparison table
    compareTitle: "Comparativa detallada",
    colUx: "UX Capital",
    colTraditional: "Tradicional",
    rowCommissionDebit: "Costo por cobro débito",
    rowCommissionQr: "Costo por cobro QR",
    rowTotalCost: "Costo mensual total",
    rowNetIncome: "Ingreso neto mensual",

    // Settlement info banner (below results, not a comparison row)
    settlementInfoTitle: "Dos modalidades de acreditación",
    settlementInfoBody:
      "Contamos con acreditación instantánea vía e-check o acreditación estándar con un promedio de 17 días corridos. La mejor alternativa para tu negocio la definimos juntos en una reunión con nuestro equipo.",

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
      "Las condiciones comparadas responden a valores de referencia de mercado y a la propuesta comercial de UX Capital.",
      "El cálculo no incluye impuestos, percepciones ni otros cargos adicionales.",
      "Los valores son estimativos. La propuesta final puede variar según el perfil y volumen del comercio.",
      "Las modalidades de acreditación disponibles se definen en la propuesta comercial.",
    ],
  },
  en: {
    heroTag: "For businesses & merchants",
    heroTitle: "How much are you overpaying per sale?",
    heroSubtitle:
      "Calculate how much you could save by accepting payments with UX Capital vs. traditional payment processors. No commitment, no sensitive data required.",
    heroStart: "Calculate my savings",

    inputsTitle: "Your business data",
    labelVolume: "Monthly sales volume",
    hintVolume: "Total you invoice per month via cards and QR",
    labelTicket: "Average ticket",
    hintTicket: "Average value per transaction",
    labelMethod: "Main payment method",
    methodDebit: "Debit",
    methodQr: "QR",
    methodCombined: "Combination",
    labelDebitPct: "% Debit",
    labelQrPct: "% QR",
    combinedHint: "Must add up to 100%",
    combinedError: "Debit and QR percentages must add up to exactly 100%",
    calcBtn: "See my estimated savings",
    resetBtn: "Recalculate",

    errVolume: "Enter a volume greater than zero.",
    errTicket: "Enter an average ticket greater than zero.",
    errExceedsVolume: "Average ticket cannot exceed monthly volume.",

    resultTitle: "Your estimated savings with UX Capital",
    resultSubtitle: "Compared to market benchmark rates",
    savingsMonthly: "Monthly savings",
    savingsAnnual: "Annual projection",
    savingsTagline: "less in payment processing costs",
    transactionsEst: "Estimated transactions / month",

    compareTitle: "Detailed comparison",
    colUx: "UX Capital",
    colTraditional: "Traditional",
    rowCommissionDebit: "Debit processing cost",
    rowCommissionQr: "QR processing cost",
    rowTotalCost: "Total monthly cost",
    rowNetIncome: "Monthly net income",

    settlementInfoTitle: "Two settlement options",
    settlementInfoBody:
      "We offer instant settlement via e-check or standard settlement averaging 17 calendar days. The best option for your business is something we'll work out together during your call with our team.",

    ctaTitle: "Let's talk about your business",
    ctaBody:
      "Book a free call with our commercial team and receive a tailored proposal.",
    ctaBtn: "Book a call",
    ctaDisclaimer:
      "No commitment. The call is 20 minutes and completely free.",

    methodologyBtn: "View calculation assumptions",
    methodologyTitle: "Calculation assumptions",
    methodologyItems: [
      "Figures are based on market reference rates and UX Capital's commercial offering.",
      "Calculation excludes taxes, withholdings, and other additional charges.",
      "Values are estimates. The final proposal may vary based on merchant profile and volume.",
      "Available settlement options are defined in the commercial proposal.",
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

function parseNum(raw: string): number {
  // Strip thousand separators (dots in es-AR) then parse
  const cleaned = raw.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

function applyThousandSeparators(digits: string): string {
  const num = parseInt(digits, 10);
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(num);
}

// ---------------------------------------------------------------------------
// Calculation
// ---------------------------------------------------------------------------
interface CalcInput {
  volume: number;
  ticket: number;
  method: PaymentMethod;
  debitPct: number;
  qrPct: number;
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
  };
}

// ---------------------------------------------------------------------------
// NumericInput — with live thousand-separator formatting
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
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cursorPos = e.target.selectionStart ?? raw.length;

    // Count how many digit characters appear before the cursor in the old string
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;

    // Strip everything except digits
    const digitsOnly = raw.replace(/\D/g, "");

    if (!digitsOnly) {
      onChange("");
      return;
    }

    const formatted = applyThousandSeparators(digitsOnly);
    onChange(formatted);

    // Restore cursor position after React re-renders
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      let digitCount = 0;
      let newPos = formatted.length; // default: end of string
      if (digitsBeforeCursor === 0) {
        newPos = 0;
      } else {
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) digitCount++;
          if (digitCount === digitsBeforeCursor) {
            newPos = i + 1;
            break;
          }
        }
      }
      el.setSelectionRange(newPos, newPos);
    });
  };

  return (
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
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
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
};

// ---------------------------------------------------------------------------
// MethodButton
// ---------------------------------------------------------------------------
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
      selected ? "text-[var(--color-text-dark)]" : "text-white/60 hover:text-white/90"
    }`}
    style={{
      background: selected ? "var(--color-accent)" : "rgba(255,255,255,0.06)",
      border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
    }}
  >
    {label}
  </button>
);

// ---------------------------------------------------------------------------
// CompareRow
// ---------------------------------------------------------------------------
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
      background: highlight ? "rgba(77,240,172,0.07)" : "rgba(255,255,255,0.03)",
    }}
  >
    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
      {label}
    </span>
    <span className="text-xs font-semibold text-center" style={{ color: "var(--color-accent)" }}>
      {ux}
    </span>
    <span className="text-xs font-medium text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
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

  // Inputs
  const [volumeStr, setVolumeStr] = useState("");
  const [ticketStr, setTicketStr] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("debit");
  const [debitPct, setDebitPct] = useState(70);
  const [qrPct, setQrPct] = useState(30);

  // Validation errors
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

    setTimeout(() => {
      document.getElementById("merchant-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [volumeStr, ticketStr, method, debitPct, qrPct, tx]);

  const handleReset = useCallback(() => {
    setResult(null);
    setErrors({});
  }, []);

  // Savings percentage vs traditional cost
  const savingsPct =
    result && result.traditionalCost > 0
      ? ((result.monthlySavings / result.traditionalCost) * 100).toFixed(1)
      : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-dark)" }}>
      <Navigation onOpenBeta={onOpenBeta} />

      {/* ──────────────────────────────────────── HERO ── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Decorative blobs — same diffuse treatment as consumer simulator */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-24 right-10 w-80 h-80 bg-ux-green/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          {/* Badge */}
          <span
            className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
            style={{
              background: "rgba(77,240,172,0.12)",
              color: "var(--color-accent)",
              border: "1px solid rgba(77,240,172,0.25)",
            }}
          >
            {tx.heroTag}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            {tx.heroTitle}
          </h1>
          <p
            className="text-lg text-white/70 leading-relaxed"
          >
            {tx.heroSubtitle}
          </p>

          <a
            href="#merchant-simulator"
            className="inline-flex items-center gap-2 mt-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
          >
            {tx.heroStart}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ──────────────────────────────────────── SIMULATOR ── */}
      <section id="merchant-simulator" className="py-14 md:py-20">
        <div className="container mx-auto px-5">

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
                  <label
                    className="text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
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

                {/* Combined split sliders */}
                {method === "combined" && (
                  <div
                    className="p-4 rounded-2xl flex flex-col gap-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {tx.combinedHint}
                    </p>

                    {/* Debit % */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label
                          className="text-sm font-medium"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {tx.labelDebitPct}
                        </label>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--color-accent)" }}
                        >
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
                        <label
                          className="text-sm font-medium"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {tx.labelQrPct}
                        </label>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--color-accent)" }}
                        >
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
                      <p
                        className="text-xs flex items-center gap-1"
                        style={{ color: "#f87171" }}
                      >
                        <AlertCircle size={12} /> {errors.combined}
                      </p>
                    )}
                  </div>
                )}

                {/* Calculate / Reset button */}
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
                  className="p-8 rounded-3xl flex flex-col items-center justify-center gap-4 text-center min-h-[280px]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px dashed rgba(255,255,255,0.1)",
                  }}
                >
                  <TrendingDown size={40} style={{ color: "rgba(255,255,255,0.12)" }} />
                  <p style={{ color: "rgba(255,255,255,0.3)" }} className="text-sm">
                    {tx.calcBtn}
                  </p>
                </div>
              ) : (
                <>
                  {/* ── Savings highlight card ── */}
                  <div
                    className="p-6 md:p-8 rounded-3xl relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(77,240,172,0.12) 0%, rgba(77,240,172,0.04) 100%)",
                      border: "1px solid rgba(77,240,172,0.25)",
                    }}
                  >
                    {/* Decorative glow */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(77,240,172,0.15) 0%, transparent 70%)",
                        transform: "translate(20%, -20%)",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} style={{ color: "var(--color-accent)" }} />
                        <span
                          className="text-xs font-semibold uppercase tracking-widest"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {tx.resultTitle}
                        </span>
                      </div>
                      <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {tx.resultSubtitle}
                      </p>

                      {/* Main KPIs */}
                      <div className="flex flex-col sm:flex-row gap-5 mb-5">
                        <div>
                          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {tx.savingsMonthly}
                          </p>
                          <p className="text-4xl font-bold text-white">
                            {formatARS(result.monthlySavings)}
                          </p>
                          {savingsPct && (
                            <p
                              className="text-xs mt-1"
                              style={{ color: "var(--color-accent)" }}
                            >
                              {savingsPct}% {tx.savingsTagline}
                            </p>
                          )}
                        </div>

                        <div
                          className="sm:border-l sm:pl-5"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}
                        >
                          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {tx.savingsAnnual}
                          </p>
                          <p
                            className="text-2xl font-bold"
                            style={{ color: "var(--color-accent)" }}
                          >
                            {formatARS(result.annualSavings)}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {tx.transactionsEst}:{" "}
                        <span className="text-white font-semibold">
                          {result.transactions.toLocaleString("es-AR")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* ── Detailed comparison table ── */}
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
                      <span style={{ color: "rgba(255,255,255,0.35)" }} />
                      <span
                        className="text-xs font-semibold text-center"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {tx.colUx}
                      </span>
                      <span
                        className="text-xs font-semibold text-center"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {tx.colTraditional}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {/* Debit cost — only if debit involved */}
                      {(method === "debit" || method === "combined") && (
                        <CompareRow
                          label={tx.rowCommissionDebit}
                          ux={formatARS(result.debitVolume * UX_RATES.debit)}
                          traditional={formatARS(result.debitVolume * TRADITIONAL_RATES.debit)}
                        />
                      )}

                      {/* QR cost — only if QR involved */}
                      {(method === "qr" || method === "combined") && (
                        <CompareRow
                          label={tx.rowCommissionQr}
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
                    </div>
                  </div>

                  {/* ── Settlement info banner ── */}
                  <div
                    className="p-4 md:p-5 rounded-2xl flex items-start gap-3"
                    style={{
                      background: "rgba(77,240,172,0.05)",
                      border: "1px solid rgba(77,240,172,0.15)",
                    }}
                  >
                    <Info
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--color-accent)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {tx.settlementInfoTitle}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {tx.settlementInfoBody}
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
                      <p className="text-xs font-semibold mb-3 text-white">
                        {tx.methodologyTitle}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {tx.methodologyItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 text-center max-w-xl">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{
              background: "rgba(77,240,172,0.1)",
              border: "1px solid rgba(77,240,172,0.2)",
            }}
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
