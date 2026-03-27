import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FinalCTASectionProps {
  onOpenBeta?: () => void;
}

const content = {
  es: {
    title: "Empezá a generar rendimientos en tus compras hoy",
    subtitle: "Unite a nuestra lista de espera y no te pierdas de nuestro lanzamiento.",
    cta: "Únete",
  },
  en: {
    title: "Start generating returns on your purchases today",
    subtitle: "Join our waitlist and don't miss our launch.",
    cta: "Join",
  },
};

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const c = content[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24"
      style={{ background: `linear-gradient(160deg, var(--color-bg-dark) 0%, var(--color-bg-dark-2) 100%)` }}
    >
      <div className="container mx-auto px-5 text-center">
        <div
          className={`max-w-2xl mx-auto flex flex-col items-center gap-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            {c.title}
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            {c.subtitle}
          </p>
          <button
            onClick={onOpenBeta}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95 mt-2"
            style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
          >
            {c.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
