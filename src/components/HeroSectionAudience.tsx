import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionAudienceProps {
  onOpenBeta: () => void;
}

const content = {
  en: {
    eyebrow: "PAYMENTS WITH INVESTMENT",
    title: "Turning every payment into an investment",
    subtitle: "Investment-powered payment infrastructure for your Bank and your Gateway.",
    bank: "I'm a Bank or Acquirer",
    dual: "I'm a user or merchant",
  },
  es: {
    eyebrow: "PAGOS CON INVERSIÓN",
    title: "Transformando cada pago en inversión",
    subtitle: "Infraestructura de Pagos con Inversión para tu Banco y tu Gateway.",
    bank: "Soy Banco o Adquirente",
    dual: "Soy usuario o comercio",
  },
};

const HeroSectionAudience: React.FC<HeroSectionAudienceProps> = () => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section
      id="hero"
      className="bg-palette-b relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Animated mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-teal left-[10%] top-[20%] h-[420px] w-[420px]" />
        <div className="orb-blue right-[8%] top-[10%] h-[480px] w-[480px]" />
        <div className="orb-teal bottom-[5%] left-[40%] h-[360px] w-[360px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#001a1a]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-teal"
        >
          {c.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem]"
        >
          <span className="bg-gradient-to-r from-teal via-teal to-blue bg-clip-text text-transparent">
            {c.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-8 max-w-xl text-balance text-base text-uxc-muted-foreground sm:text-lg md:text-[1.125rem] md:leading-[1.7]"
        >
          {c.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          <a
            href="#nodo-bank"
            className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_10px_40px_-10px_rgba(0,200,150,0.6)] transition hover:opacity-90"
          >
            {c.bank}
          </a>
          <a
            href="#ux-dual"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3.5 text-sm font-semibold transition hover:bg-white/5"
          >
            {c.dual}
          </a>
        </motion.div>
      </div>

      <a
        href="#problema"
        aria-label="Scroll"
        className="animate-bounce-soft absolute bottom-8 left-1/2 -translate-x-1/2 text-uxc-muted-foreground"
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
};

export default HeroSectionAudience;
