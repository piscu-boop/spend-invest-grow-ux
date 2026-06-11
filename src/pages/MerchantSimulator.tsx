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
// Combined traditional benchmark: (1.68% debit + 0.80% QR) / 2 = 1.24%
const TRADITIONAL_RATE = 0.0124;
// UX Dual rate: max(50% of traditional average, 0.5% floor) = max(0.0062, 0.005) = 0.0062
const UX_RATE = Math.max(TRADITIONAL_RATE * 0.5, 0.005); // → 0.0062

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------
const t = {
  es: {
    // Hero
    heroTag: "Para comercios y negocios",
    heroTitle: "¿Cuánto te cobran de más por cada venta?",
    heroSubtitle:
      "Calculá cuánto podrías ahorrar cobrando con UX Dual versus los procesadores de pago tradicionales. Sin compromisos, sin datos sensibles.",
    heroStart: "Calcular mi ahorro",

    // Inputs
    inputsTitle: "Datos de tu negocio",
    labelVolume: "Volumen mensual de ventas",
    hintVolume: "Total que facturás por mes con medios de pago digitales",
    calcBtn: "Ver mi ahorro estimado",
    resetBtn: "Calcular de nuevo",

    // Validation
    errVolume: "Ingresá un volumen mayor a cero.",

    // Results
    resultTitle: "Tu ahorro estimado con UX Dual",
    resultSubtitle: "Comparando con valores de referencia del mercado",
    savingsMonthly: "Ahorro mensual",
    savingsAnnual: "Proyección anual",
    savingsTagline: "menos en costos de cobro",

    // Comparison table
    compareTitle: "Comparativa detallada",
    colUx: "UX Dual",
    colTraditional: "Tradicional",
    rowTotalCost: "Costo estimado por cobros",
    rowNetIncome: "Ingreso neto mensual",

    // Settlement info banner
    settlementInfoTitle: "Dos modalidades de acreditación",
    settlementInfoBody:
      "Contamos con acreditación instantánea o acreditación estándar con un promedio de 17 días corridos. La mejor alternativa para tu negocio la definimos juntos en una reunión con nuestro equipo.",

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
      "La comparativa utiliza valores de referencia de soluciones de cobro digital tradicionales disponibles en el mercado.",
      "UX Dual aplica una condición comercial equivalente al 50% del promedio tradicional del mercado, con un piso mínimo del 0,5%.",
      "El cálculo no incluye impuestos, percepciones ni otros cargos adicionales.",
      "Los valores son estimativos. La propuesta final puede variar según el perfil y volumen del comercio.",
    ],
  },
  en: {
    heroTag: "For businesses & merchants",
    heroTitle: "How much are you overpaying per sale?",
    heroSubtitle:
      "Calculate how much you could save by accepting payments with UX Dual vs. traditional payment processors. No commitment, no sensitive data required.",
    heroStart: "Calculate my savings",

    inputsTitle: "Your business data",
    labelVolume: "Monthly sales volume",
    hintVolume: "Total you invoice per month via digital payment methods",
    calcBtn: "See my estimated savings",
    resetBtn: "Recalculate",

    errVolume: "Enter a volume greater than zero.",

    resultTitle: "Your estimated savings with UX Dual",
    resultSubtitle: "Compared to market benchmark rates",
    savingsMonthly: "Monthly savings",
    savingsAnnual: "Annual projection",
    savingsTagline: "less in payment processing costs",

    compareTitle: "Detailed comparison",
    colUx: "UX Dual",
    colTraditional: "Traditional",
    rowTotalCost: "Estimated processing cost",
    rowNetIncome: "Monthly net income",

    settlementInfoTitle: "Two settlement options",
    settlementInfoBody:
      "We offer instant settlement or standard settlement averaging 17 calendar days. The best option for your business is something we'll work out together during your call with our team.",

    ctaTitle: "Let's talk about your business",
    ctaBody:
      "Book a free call with our commercial team and receive a tailored proposal.",
    ctaBtn: "Book a call",
    ctaDisclaimer:
      "No commitment. The call is 20 minutes and completely free.",

    methodologyBtn: "View calculation assumptions",
    methodologyTitle: "Calculation assumptions",
    methodologyItems: [
      "The comparison uses benchmark reference values from traditional digital payment solutions available in the market.",
      "UX Dual applies a commercial condition equivalent to 50% of the traditional market average, with a 0.5% minimum floor.",
      "Calculation excludes taxes, withholdings, and other additional charges.",
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

function parseNum(raw: string): number {
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
}

interface CalcResult {
  traditionalCost: number;
  uxCost: number;
  monthlySavings: number;
  annualSavings: number;
  traditionalNet: number;
  uxNet: number;
}

function calculate(input: CalcInput): CalcResult {
  const { volume } = input;

  const traditionalCost = volume * TRADITIONAL_RATE;
  const uxCost = volume * UX_RATE;
  const monthlySavings = traditionalCost - uxCost;
  const annualSavings = monthlySavings * 12;
  const traditionalNet = volume - traditionalCost;
  const uxNet = volume - uxCost;

  return {
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

    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;
    const digitsOnly = raw.replace(/\D/g, "");

    if (!digitsOnly) {
      onChange("");
      return;
    }

    const formatted = applyThousandSeparators(digitsOnly);
    onChange(formatted);

    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      let digitCount = 0;
      let newPos = formatted.length;
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

  const [volumeStr, setVolumeStr] = useState("");
  const [errors, setErrors] = useState<{ volume?: string }>({});
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);

  const handleCalc = useCallback(() => {
    const volume = parseNum(volumeStr);
    const newErrors: typeof errors = {};

    if (!volume || volume <= 0) newErrors.volume = tx.errVolume;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setResult(calculate({ volume }));

    setTimeout(() => {
      document.getElementById("merchant-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [volumeStr, tx]);

  const handleReset = useCallback(() => {
    setResult(null);
    setErrors({});
  }, []);

  const savingsPct =
    result && result.traditionalCost > 0
      ? ((result.monthlySavings / result.traditionalCost) * 100).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-palette-a">
      <Navigation onOpenBeta={onOpenBeta} />

      {/* ──────────────────────────────────────── HERO ── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-24 right-10 w-80 h-80 bg-ux-green/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
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

          <h1 className="font-display text-4xl md:text-5xl leading-tight text-white">
            {tx.heroTitle}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
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
                <NumericInput
                  label={tx.labelVolume}
                  hint={tx.hintVolume}
                  value={volumeStr}
                  onChange={setVolumeStr}
                  error={errors.volume}
                />

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
                            <p className="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
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
