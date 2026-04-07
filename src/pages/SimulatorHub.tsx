import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wallet, Store, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------
const t = {
  es: {
    badge: "Herramientas UX Capital",
    title: "¿Qué querés simular?",
    subtitle:
      "Elegí la herramienta que mejor se adapta a tu situación y descubrí cómo UX Capital puede ayudarte.",

    consumerTag: "Para personas",
    consumerTitle: "Simulador personal",
    consumerDesc:
      "Descubrí cómo tu dinero puede seguir rindiendo mientras lo usás en el día a día.",
    consumerCta: "Ir al simulador",

    merchantTag: "Para comercios",
    merchantTitle: "Simulador de negocios",
    merchantDesc:
      "Calculá cuánto podrías ahorrar en comisiones cobrando con UX Capital.",
    merchantCta: "Ir al simulador",
  },
  en: {
    badge: "UX Capital Tools",
    title: "What do you want to simulate?",
    subtitle:
      "Choose the tool that best fits your situation and discover how UX Capital can help you.",

    consumerTag: "For individuals",
    consumerTitle: "Personal simulator",
    consumerDesc:
      "Discover how your money can keep earning returns while you use it every day.",
    consumerCta: "Go to simulator",

    merchantTag: "For businesses",
    merchantTitle: "Business simulator",
    merchantDesc:
      "Calculate how much you could save on processing fees by accepting payments with UX Capital.",
    merchantCta: "Go to simulator",
  },
};

// ---------------------------------------------------------------------------
// SimulatorCard
// ---------------------------------------------------------------------------
interface SimulatorCardProps {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({
  tag,
  title,
  desc,
  cta,
  href,
  icon,
}) => (
  <Link
    to={href}
    className="group relative flex flex-col p-8 md:p-10 rounded-3xl transition-all duration-300 hover:scale-[1.02]"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.border =
        "1px solid rgba(77,240,172,0.35)";
      (e.currentTarget as HTMLElement).style.background =
        "rgba(77,240,172,0.05)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.border =
        "1px solid rgba(255,255,255,0.08)";
      (e.currentTarget as HTMLElement).style.background =
        "rgba(255,255,255,0.04)";
    }}
  >
    {/* Icon */}
    <div
      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-colors duration-300"
      style={{
        background: "rgba(77,240,172,0.1)",
        border: "1px solid rgba(77,240,172,0.2)",
      }}
    >
      {icon}
    </div>

    {/* Tag */}
    <span
      className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: "var(--color-accent)" }}
    >
      {tag}
    </span>

    {/* Title */}
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
      {title}
    </h2>

    {/* Description */}
    <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
      {desc}
    </p>

    {/* CTA row — pushed to bottom */}
    <div className="mt-auto flex items-center gap-2 font-semibold text-sm transition-colors duration-200 group-hover:gap-3"
      style={{ color: "var(--color-accent)" }}
    >
      {cta}
      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
    </div>
  </Link>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
interface SimulatorHubProps {
  onOpenBeta?: () => void;
}

const SimulatorHub: React.FC<SimulatorHubProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const tx = t[language];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-dark)" }}>
      <Navigation onOpenBeta={onOpenBeta} />

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-32 pb-14 overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-24 right-10 w-80 h-80 bg-ux-green/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
            style={{ color: "var(--color-accent)", background: "rgba(77,240,172,0.12)" }}
          >
            {tx.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {tx.title}
          </h1>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Consumer */}
          <SimulatorCard
            href="/simulador"
            tag={tx.consumerTag}
            title={tx.consumerTitle}
            desc={tx.consumerDesc}
            cta={tx.consumerCta}
            icon={<Wallet size={26} style={{ color: "var(--color-accent)" }} />}
          />

          {/* Merchant */}
          <SimulatorCard
            href="/comercios"
            tag={tx.merchantTag}
            title={tx.merchantTitle}
            desc={tx.merchantDesc}
            cta={tx.merchantCta}
            icon={<Store size={26} style={{ color: "var(--color-accent)" }} />}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SimulatorHub;
