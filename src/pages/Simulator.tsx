import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  calcSimulation,
  validateInput,
  formatARS,
  formatTNA,
  type SimulatorInput,
  type SimulatorResult,
} from "@/lib/simulatorEngine";
import { UX_DUAL_CONFIG, WALLET_LOGOS, type SpendMoment } from "@/data/simulatorRates";
import { useRates } from "@/hooks/useRates";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Info,
  ArrowDown,
} from "lucide-react";

// -------------------------------------------------------
// Traducciones
// -------------------------------------------------------
const translations = {
  es: {
    // Hero
    heroBadge: "Simulador UX Dual",
    heroTitle1: "Simulá el rendimiento que ",
    heroTitle2: " te da en un mes",
    heroSubtitle: "Compará tu rendimiento mensual con UX Dual frente a las billeteras tradicionales de Argentina.",
    heroStart: "Empezar simulación",

    // Inputs
    inputTitle: "Ingresá tus datos",
    inputSubtitle: "Solo necesitás 3 datos para ver el resultado.",
    labelInitial: "Dinero disponible al inicio del mes",
    hintInitial: "¿Cuánto tenés en tu billetera al comenzar el mes?",
    labelSpent: "Pago total estimado del mes",
    hintSpent: "¿Cuánto pagás aproximadamente en el mes?",
    labelSpendMoment: "¿Cuándo pagás más?",
    hintSpendMoment: "Momento promedio en que se concentran tus pagos mensuales",
    spendOptions: [
      { key: "principio" as SpendMoment, label: "Principio", sub: "~día 5" },
      { key: "mitad" as SpendMoment,     label: "Mitad",     sub: "~día 15" },
      { key: "fin" as SpendMoment,       label: "Fin",       sub: "~día 25" },
    ],
    submitBtn: "Ver mi rendimiento estimado",

    // Validation errors
    errInitial: "Ingresá un monto inicial mayor a cero.",
    errNegative: "El pago no puede ser negativo.",
    errExceeds: "El pago no puede superar el dinero disponible.",
    errGeneric: "Error en los datos.",

    // Results
    resultBadge: "Resultado de la simulación",
    resultTitle1: "Este mes, UX Dual te dejaría ",
    resultTitle2: " más",
    resultSubtitle: "que el promedio de billeteras tradicionales",
    resultMicrocopy: "Con UX Dual, incluso parte de la plata que ya pagaste sigue generándote rendimiento hasta fin de mes.",
    cardUxTitle: "Con UX Dual",
    cardUxSubtitle: (tna: string) => `${tna} · dinero pagado sigue rindiendo`,
    cardUxTag: "Tu mejor opción",
    cardTradTitle: "Promedio billeteras tradicionales",
    cardTradSubtitle: "El dinero pagado deja de rendir",
    compareBarUx: "UX Dual",
    compareBarTrad: "Promedio tradicional",
    projectionLabel: "Proyección anual",
    projectionDesc: "más que una billetera tradicional en 12 meses",
    projectionDisclaimer: "Asumiendo comportamiento mensual similar",
    summaryInitial: "Saldo inicial:",
    summarySpent: "Pagos:",
    summarySpendAt: "Pagos al",
    resetBtn: "Volver a simular con otros datos",
    spentDayLabels: {
      principio: "principio de mes (día 5)",
      mitad:     "mitad de mes (día 15)",
      fin:       "fin de mes (día 25)",
    } as Record<SpendMoment, string>,

    // Wallet comparison
    walletCompareTitle: "Comparar billetera por billetera",

    // Educational
    eduTitle: "¿Cómo funciona UX Dual?",
    eduSteps: [
      { emoji: "💸", title: "Pagás normalmente", desc: "Usás tu plata como siempre, en cualquier comercio adherido." },
      { emoji: "❄️", title: "Tu pago queda congelado", desc: "Ese dinero no desaparece: queda invertido hasta fin de mes." },
      { emoji: "📈", title: "Seguís ganando", desc: "Recibís intereses diarios por tus compras." },
    ],

    // Methodology
    methodologyBtn: "Metodología y supuestos",
    methodologyTitle: "Esta es una simulación estimativa.",
    methodologyItems: (uxTna: string) => [
      `Mes de <strong>30 días</strong> calendarios.`,
      `Tasa UX Dual: <strong>${uxTna}</strong> — valor de referencia configurable.`,
      `<strong>Tasas de billeteras tradicionales:</strong> datos obtenidos automáticamente de un tercero conectado a CAFCI (Cámara Argentina de Fondos Comunes de Inversión).`,
      `<strong>El promedio de tasas de billeteras tradicionales:</strong> se calcula como el promedio simple de las tasas de los FCI money market más populares, actualizadas diariamente.`,
      `<strong>Interés compuesto:</strong> la conversión de TNA a rendimiento mensual usa la fórmula (1 + TNA)^(días/365) − 1, consistente con la capitalización diaria de los FCI money market.`,
      `<strong>Pagos distribuidos:</strong> los pagos mensuales se distribuyen uniformemente día a día desde el día 1 hasta el día seleccionado (principio=5, mitad=15, fin=25). Desde ese día en adelante no se agrega nuevo pago.`,
      `En UX Dual, el dinero pagado queda invertido hasta el día 30.`,
      `No se contemplan comisiones, impuestos ni inflación.`,
      `El usuario no puede pagar más de lo disponible.`,
    ],
    methodologyDisclaimer: "Los resultados son estimaciones educativas y no constituyen asesoramiento financiero. Las tasas pueden variar. Consultá las condiciones vigentes de cada producto antes de tomar decisiones.",

    // CTA
    ctaTitle: "¿Listo para empezar a ganar más?",
    ctaDesc: "Unite a la lista de espera de UX Dual y sé de los primeros en acceder cuando abramos el acceso.",
    ctaBtn: "Quiero acceso anticipado",

  },
  en: {
    heroBadge: "UX Dual Simulator",
    heroTitle1: "Simulate the returns that ",
    heroTitle2: " gives you in one month",
    heroSubtitle: "Compare your monthly returns with UX Dual vs traditional Argentine wallets.",
    heroStart: "Start simulation",

    inputTitle: "Enter your data",
    inputSubtitle: "You only need 3 inputs to see the result.",
    labelInitial: "Available money at the start of the month",
    hintInitial: "How much do you have in your wallet at the beginning of the month?",
    labelSpent: "Estimated total monthly payments",
    hintSpent: "How much do you approximately pay per month?",
    labelSpendMoment: "When do you pay the most?",
    hintSpendMoment: "Average time when your monthly payments are concentrated",
    spendOptions: [
      { key: "principio" as SpendMoment, label: "Early",   sub: "~day 5" },
      { key: "mitad" as SpendMoment,     label: "Mid",     sub: "~day 15" },
      { key: "fin" as SpendMoment,       label: "Late",    sub: "~day 25" },
    ],
    submitBtn: "See my estimated returns",

    errInitial: "Enter an initial amount greater than zero.",
    errNegative: "Payments cannot be negative.",
    errExceeds: "Payments cannot exceed available money.",
    errGeneric: "Invalid data.",

    resultBadge: "Simulation result",
    resultTitle1: "This month, UX Dual would give you ",
    resultTitle2: " more",
    resultSubtitle: "than the average traditional wallet",
    resultMicrocopy: "With UX Dual, even the money you already paid keeps generating returns until the end of the month.",
    cardUxTitle: "With UX Dual",
    cardUxSubtitle: (tna: string) => `${tna} · paid money keeps earning`,
    cardUxTag: "Your best option",
    cardTradTitle: "Traditional wallet average",
    cardTradSubtitle: "Paid money stops earning",
    compareBarUx: "UX Dual",
    compareBarTrad: "Traditional average",
    projectionLabel: "Annual projection",
    projectionDesc: "more than a traditional wallet in 12 months",
    projectionDisclaimer: "Assuming similar monthly behavior",
    summaryInitial: "Initial balance:",
    summarySpent: "Payments:",
    summarySpendAt: "Paid by",
    resetBtn: "Simulate again with different data",
    spentDayLabels: {
      principio: "early in the month (day 5)",
      mitad:     "mid-month (day 15)",
      fin:       "end of the month (day 25)",
    } as Record<SpendMoment, string>,

    walletCompareTitle: "Compare wallet by wallet",

    eduTitle: "How does UX Dual work?",
    eduSteps: [
      { emoji: "💸", title: "Pay normally", desc: "Use your money as usual, at any participating merchant." },
      { emoji: "❄️", title: "Your payment stays frozen", desc: "That money doesn't disappear: it stays invested until the end of the month." },
      { emoji: "📈", title: "Keep earning", desc: "You receive daily interest on your purchases." },
    ],

    methodologyBtn: "Methodology & assumptions",
    methodologyTitle: "This is an estimated simulation.",
    methodologyItems: (uxTna: string) => [
      `<strong>30-day</strong> calendar month.`,
      `UX Dual rate: <strong>${uxTna}</strong> — configurable reference value.`,
      `<strong>Traditional wallet rates:</strong> data automatically sourced from a third party connected to CAFCI (Argentine Chamber of Mutual Funds).`,
      `<strong>The average rate for traditional wallets:</strong> is calculated as the simple average of the rates of the most popular money market funds, updated daily.`,
      `<strong>Compound interest:</strong> TNA to monthly return conversion uses the formula (1 + TNA)^(days/365) − 1, consistent with daily compounding of money market funds.`,
      `<strong>Distributed payments:</strong> monthly payments are spread uniformly day by day from day 1 to the selected day (early=5, mid=15, late=25). No new payments are added after that day.`,
      `In UX Dual, paid money remains invested until day 30.`,
      `Does not account for fees, taxes, or inflation.`,
      `The user cannot pay more than available.`,
    ],
    methodologyDisclaimer: "Results are educational estimates and do not constitute financial advice. Rates may vary. Check the current terms of each product before making decisions.",

    ctaTitle: "Ready to start earning more?",
    ctaDesc: "Join the UX Dual waitlist and be among the first to access when we open enrollment.",
    ctaBtn: "I want early access",

  },
};

// -------------------------------------------------------
// Props
// -------------------------------------------------------
interface SimulatorProps {
  onOpenBeta?: () => void;
}

// -------------------------------------------------------
// Helpers de UI
// -------------------------------------------------------
function formatInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("es-AR");
}

function parseInput(formatted: string): number {
  return Number(formatted.replace(/\./g, "").replace(",", ".")) || 0;
}

// -------------------------------------------------------
// Sub-componentes
// -------------------------------------------------------

/** Input de monto con formato de moneda ARS en tiempo real */
function AmountInput({
  label,
  hint,
  value,
  onChange,
  error,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
        {label}
      </label>
      {hint && <p className="text-xs text-white/80">{hint}</p>}
      <div
        className={`flex items-center gap-2 rounded-xl bg-white/5 border overflow-hidden ${
          error ? "border-red-400/70" : "border-white/10"
        } px-4 py-3 focus-within:border-ux-green/60 transition-colors`}
      >
        <span className="text-ux-green font-semibold text-lg shrink-0">$</span>
        <input
          inputMode="numeric"
          className="flex-1 min-w-0 bg-transparent text-white text-xl font-semibold outline-none placeholder:text-gray-600"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(formatInput(e.target.value))}
        />
        <span className="text-white/60 text-sm shrink-0">ARS</span>
      </div>
    </div>
  );
}

/** Selector de 3 opciones para el momento de gasto */
function SpendMomentSelector({
  value,
  onChange,
  options,
  label,
  hint,
}: {
  value: SpendMoment;
  onChange: (v: SpendMoment) => void;
  options: { key: SpendMoment; label: string; sub: string }[];
  label: string;
  hint: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
        {label}
      </label>
      <p className="text-xs text-white/80">{hint}</p>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`rounded-xl py-3 px-2 text-center transition-all duration-200 border ${
              value === opt.key
                ? "bg-ux-green/20 border-ux-green text-white shadow-sm shadow-ux-green/20"
                : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
            }`}
          >
            <div className="font-semibold text-sm">{opt.label}</div>
            <div className="text-xs opacity-80 mt-0.5">{opt.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Barra de progreso comparativa entre dos valores */
function CompareBar({
  uxValue,
  tradValue,
  uxLabel,
  tradLabel,
}: {
  uxValue: number;
  tradValue: number;
  uxLabel: string;
  tradLabel: string;
}) {
  const max    = Math.max(uxValue, tradValue, 1);
  const uxPct  = Math.round((uxValue  / max) * 100);
  const tradPct= Math.round((tradValue / max) * 100);

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-ux-green font-semibold">{uxLabel}</span>
          <span className="text-ux-green font-bold">{formatARS(uxValue)}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-ux-green to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${uxPct}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/60 font-semibold">{tradLabel}</span>
          <span className="text-white/60 font-bold">{formatARS(tradValue)}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/30 rounded-full transition-all duration-700"
            style={{ width: `${tradPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/** Card de resultado principal */
function ResultCard({
  title,
  value,
  subtitle,
  featured,
  tag,
}: {
  title: string;
  value: string;
  subtitle?: string;
  featured?: boolean;
  tag?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
        featured
          ? "bg-gradient-to-br from-[#0d2e1a] to-[#0a2520] border-2 border-ux-green/50 shadow-lg shadow-ux-green/10"
          : "bg-[#0E1B38] border border-white/10"
      }`}
    >
      {featured && (
        <div className="absolute top-3 right-3 bg-ux-green text-[#0a1f0f] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
          {tag ?? "Destacado"}
        </div>
      )}
      <p
        className={`text-sm font-semibold uppercase tracking-wide mb-1 ${
          featured ? "text-ux-green" : "text-white/80"
        }`}
      >
        {title}
      </p>
      <p
        className={`text-3xl font-bold leading-tight ${
          featured ? "text-white" : "text-white/80"
        }`}
      >
        {value}
      </p>
      {subtitle && (
        <p
          className={`text-xs mt-1 ${
            featured ? "text-white/80" : "text-white/60"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Logo de billetera con fallback a círculo de color */
function WalletLogo({ id, color, size = 28 }: { id: string; color: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = WALLET_LOGOS[id];

  if (!logoUrl || failed) {
    return (
      <div
        className="rounded-full shrink-0"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    );
  }

  return (
    <img
      src={logoUrl}
      alt=""
      width={size}
      height={size}
      className="rounded-lg shrink-0 bg-white object-contain"
      onError={() => setFailed(true)}
    />
  );
}

// -------------------------------------------------------
// Página principal
// -------------------------------------------------------
const Simulator: React.FC<SimulatorProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // --- Tasas dinámicas ---
  const { rates } = useRates();

  // --- Estado de inputs ---
  const [initialAmountStr, setInitialAmountStr] = useState("");
  const [spentAmountStr, setSpentAmountStr]     = useState("");
  const [spendMoment, setSpendMoment]           = useState<SpendMoment>("mitad");

  // --- Estado de resultados ---
  const [result, setResult]                     = useState<SimulatorResult | null>(null);
  const [validationError, setValidationError]   = useState<string | null>(null);
  const [walletsExpanded, setWalletsExpanded]   = useState(false);
  const [methodologyExpanded, setMethodologyExpanded] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Calcular ---
  function handleCalc() {
    const input: SimulatorInput = {
      initialAmount: parseInput(initialAmountStr),
      spentAmount:   parseInput(spentAmountStr),
      spendMoment,
    };
    const validation = validateInput(input);
    if (!validation.valid) {
      // Map engine error to localized message
      const errMap: Record<string, string> = {
        "Ingresá un monto inicial mayor a cero.": t.errInitial,
        "El pago no puede ser negativo.": t.errNegative,
        "El pago no puede superar el dinero disponible.": t.errExceeds,
      };
      setValidationError(errMap[validation.error ?? ""] ?? t.errGeneric);
      setResult(null);
      return;
    }
    setValidationError(null);

    const res = calcSimulation(input, {
      uxTna:                rates.uxTna,
      traditionalAverageTna: rates.traditionalAverageTna,
      wallets:              rates.wallets,
    });
    setResult(res);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  // --- Resetear ---
  function handleReset() {
    setInitialAmountStr("");
    setSpentAmountStr("");
    setSpendMoment("mitad");
    setResult(null);
    setValidationError(null);
  }

  const uxTnaDisplay = formatTNA(rates.uxTna);
  const spentDayLabel = t.spentDayLabels[spendMoment];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-dark)" }}>
      <Navigation onOpenBeta={onOpenBeta} />

      {/* ================================================== */}
      {/* HERO                                               */}
      {/* ================================================== */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-24 right-10 w-80 h-80 bg-ux-green/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-ux-green bg-ux-green/10 px-3 py-1 rounded-full">
            {t.heroBadge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {t.heroTitle1}
            <span className="gradient-text whitespace-nowrap">UX Dual</span>{t.heroTitle2}
          </h1>
          <p className="text-lg text-white leading-relaxed">
            {t.heroSubtitle}
          </p>
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 mt-2 text-ux-green font-semibold hover:text-white transition-colors"
          >
            {t.heroStart}
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ================================================== */}
      {/* SIMULADOR — INPUTS                                 */}
      {/* ================================================== */}
      <section id="simulador" className="scroll-mt-20 px-4 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#0E2240] rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">{t.inputTitle}</h2>
              <p className="text-sm text-white/80 mt-1">{t.inputSubtitle}</p>
            </div>

            <AmountInput
              label={t.labelInitial}
              hint={t.hintInitial}
              value={initialAmountStr}
              onChange={setInitialAmountStr}
              error={!!validationError && parseInput(initialAmountStr) <= 0}
            />

            <AmountInput
              label={t.labelSpent}
              hint={t.hintSpent}
              value={spentAmountStr}
              onChange={setSpentAmountStr}
              error={
                !!validationError &&
                parseInput(spentAmountStr) > parseInput(initialAmountStr)
              }
            />

            <SpendMomentSelector
              value={spendMoment}
              onChange={setSpendMoment}
              options={t.spendOptions}
              label={t.labelSpendMoment}
              hint={t.hintSpendMoment}
            />

            {validationError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                <Info className="w-4 h-4 shrink-0" />
                {validationError}
              </div>
            )}

            <button
              type="button"
              onClick={handleCalc}
              className="w-full bg-ux-green hover:bg-emerald-400 text-[#0a1f0f] font-bold text-base rounded-xl py-4 transition-colors duration-200 shadow-lg shadow-ux-green/20"
            >
              {t.submitBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* RESULTADOS                                         */}
      {/* ================================================== */}
      {result && (
        <div ref={resultsRef} className="scroll-mt-20">
          <section className="px-4 pb-10">
            <div className="max-w-lg mx-auto space-y-6">

              {/* Encabezado */}
              <div className="text-center space-y-1 pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ux-green">
                  {t.resultBadge}
                </p>
                <h2 className="text-2xl font-bold text-white">
                  {t.resultTitle1}
                  <span className="text-ux-green">
                    {formatARS(result.uxAdvantageMonthly)}{t.resultTitle2}
                  </span>
                </h2>
                <p className="text-sm text-white">
                  {t.resultSubtitle}
                </p>
                <p className="text-xs text-white pt-1 max-w-sm mx-auto leading-relaxed">
                  {t.resultMicrocopy}
                </p>
              </div>

              {/* Cards principales */}
              <div className="grid grid-cols-1 gap-3">
                <ResultCard
                  title={t.cardUxTitle}
                  value={formatARS(result.uxMonthlyReturn)}
                  subtitle={t.cardUxSubtitle(uxTnaDisplay)}
                  featured
                  tag={t.cardUxTag}
                />
                <ResultCard
                  title={t.cardTradTitle}
                  value={formatARS(result.traditionalAverageMonthlyReturn)}
                  subtitle={t.cardTradSubtitle}
                />
              </div>

              {/* Barra comparativa */}
              <div className="bg-[#0E1B38] rounded-2xl p-5 border border-white/10">
                <CompareBar
                  uxValue={result.uxMonthlyReturn}
                  tradValue={result.traditionalAverageMonthlyReturn}
                  uxLabel={t.compareBarUx}
                  tradLabel={t.compareBarTrad}
                />
              </div>

              {/* Ventaja anual */}
              <div className="bg-white rounded-2xl p-5 text-center shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-2">
                  {t.projectionLabel}
                </p>
                <p className="text-5xl font-bold text-[#1C304F] leading-none">
                  {formatARS(result.uxAdvantageYearly)}
                </p>
                <p className="text-sm text-gray-600 mt-3 font-medium">
                  {t.projectionDesc}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {t.projectionDisclaimer}
                </p>
              </div>

              {/* Resumen de inputs */}
              <div className="text-xs text-white text-center space-y-0.5">
                <p>
                  {t.summaryInitial}{" "}
                  <span className="text-white font-semibold">
                    {formatARS(result.input.initialAmount)}
                  </span>{" "}
                  · {t.summarySpent}{" "}
                  <span className="text-white font-semibold">
                    {formatARS(result.input.spentAmount)}
                  </span>{" "}
                  · {t.summarySpendAt} {spentDayLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full text-sm text-white hover:text-ux-green py-2 transition-colors"
              >
                {t.resetBtn}
              </button>
            </div>
          </section>

          {/* ================================================ */}
          {/* COMPARATIVA EXPANDIBLE POR BILLETERA             */}
          {/* ================================================ */}
          <section className="px-4 pb-10">
            <div className="max-w-lg mx-auto">
              <button
                type="button"
                onClick={() => setWalletsExpanded((e) => !e)}
                className="w-full flex items-center justify-between bg-[#0E1B38] hover:bg-[#0c1830] border border-white/10 rounded-2xl px-5 py-4 text-left transition-colors"
              >
                <div>
                  <p className="font-semibold text-white text-sm">
                    {t.walletCompareTitle}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    {rates.wallets.map((w) => w.name).join(", ")}
                  </p>
                </div>
                {walletsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white/60 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60 shrink-0" />
                )}
              </button>

              {walletsExpanded && (
                <div className="mt-3 space-y-2">
                  {/* UX Dual como referencia */}
                  <div className="flex items-center justify-between bg-ux-green/10 border border-ux-green/30 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="/favicon.png"
                        alt="UX Dual"
                        className="w-7 h-7 rounded-lg shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white text-sm">UX Dual</span>
                        <span className="text-xs text-white/80 ml-1.5">{uxTnaDisplay}</span>
                      </div>
                    </div>
                    <span className="font-bold text-ux-green text-sm">
                      {formatARS(result.uxMonthlyReturn)}
                    </span>
                  </div>

                  {/* Cada billetera ordenada de mayor a menor rendimiento */}
                  {result.walletResults
                    .slice()
                    .sort((a, b) => b.monthlyReturn - a.monthlyReturn)
                    .map((w) => (
                        <div
                          key={w.id}
                          className="flex items-center justify-between bg-[#0E1B38] border border-white/10 rounded-xl px-4 py-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <WalletLogo id={w.id} color={w.color} size={28} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-white text-sm font-medium truncate">
                                  {w.name}
                                </span>
                                <span className="text-xs text-white/80 shrink-0">
                                  {formatTNA(w.tna)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0 pl-2">
                            <div className="text-white text-sm font-semibold">
                              {formatARS(w.monthlyReturn)}
                            </div>
                          </div>
                        </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ================================================== */}
      {/* SECCIÓN EDUCATIVA (siempre visible)               */}
      {/* ================================================== */}
      <section className="px-4 pb-16">
        <div className="max-w-lg mx-auto space-y-4">
          <h3 className="text-center text-lg font-bold text-white">
            {t.eduTitle}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {t.eduSteps.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-[#0E1B38] rounded-2xl p-4 border border-white/10"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* METODOLOGÍA / DISCLAIMER                           */}
      {/* ================================================== */}
      <section className="px-4 pb-16">
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setMethodologyExpanded((e) => !e)}
            className="w-full flex items-center justify-between text-white/60 hover:text-white transition-colors py-2 gap-2"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {t.methodologyBtn}
              </span>
            </div>
            {methodologyExpanded ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </button>

          {methodologyExpanded && (
            <div className="mt-3 bg-white/3 border border-white/8 rounded-2xl p-5 text-xs text-white/80 space-y-3">
              <p className="font-semibold text-white text-sm">
                {t.methodologyTitle}
              </p>
              <ul className="space-y-2 list-disc list-inside">
                {t.methodologyItems(uxTnaDisplay).map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
              <p className="text-white/60 italic">
                {t.methodologyDisclaimer}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================== */}
      {/* CTA FINAL                                          */}
      {/* ================================================== */}
      <section className="px-4 pb-20">
        <div className="max-w-lg mx-auto bg-gradient-to-br from-[#0d2e1a] to-[#0a2520] rounded-3xl border border-ux-green/20 p-8 text-center space-y-4">
          <TrendingUp className="w-10 h-10 text-ux-green mx-auto" />
          <h3 className="text-2xl font-bold text-white">
            {t.ctaTitle}
          </h3>
          <p className="text-white text-sm leading-relaxed">
            {t.ctaDesc}
          </p>
          {onOpenBeta && (
            <button
              type="button"
              onClick={onOpenBeta}
              className="bg-ux-green hover:bg-emerald-400 text-[#0a1f0f] font-bold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              {t.ctaBtn}
            </button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Simulator;
