import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface HeroSectionAudienceProps {
  onOpenBeta: () => void;
}

const content = {
  en: {
    mainTitle: "Turning Every Purchase into an Investment",
    consumer: "I'm a Consumer",
    merchant: "I'm a Merchant",
    manufacturer: "I'm a Manufacturer",
    cta: "Join"
  },
  es: {
    mainTitle: "Transformando cada Compra en Inversión",
    consumer: "Soy Consumidor",
    merchant: "Soy Comercio",
    manufacturer: "Soy Fabricante",
    cta: "Unite"
  },
};

const HeroSectionAudience: React.FC<HeroSectionAudienceProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const c = content[language];

  const heroRef = useRef<HTMLElement>(null);
  // Hero siempre está above-the-fold — animar desde el primer render
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pequeño delay para que las transiciones CSS sean visibles
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const currentContent = content[language];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-bg-dark)" }}
    >
      {/* Gradiente decorativo */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(77,240,172,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, rgba(77,240,172,0.05) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-5 pt-24 pb-16 relative z-10">
        <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-8">

          {/* H1 */}
          <h1
            className={`font-semibold leading-tight text-white transition-all duration-500 text-[clamp(2rem,5vw,3.25rem)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0ms" }}
          >
            {c.mainTitle}
          </h1>

          {/* Botones de audiencia */}
          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center flex-wrap transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <button
              type="button"
              onClick={() => navigate("/consumer#hero")}
              className="px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "var(--color-bg-dark-2)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              {c.consumer}
            </button>
            <button
              type="button"
              onClick={() => navigate("/merchant#hero")}
              className="px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "var(--color-bg-dark-2)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              {c.merchant}
            </button>
            <button
              type="button"
              onClick={() => navigate("/manufacturer#hero")}
              className="px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "var(--color-bg-dark-2)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              {c.manufacturer}
            </button>
            
              <button
                onClick={onOpenBeta}
                className="px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
              >
                {c.cta}
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionAudience;
