import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CARDS = {
  es: [
    {
      icon: "⚡",
      title: "Tu saldo siempre rinde",
      text: "Cada peso que depositás se invierte automáticamente en un FCI de liquidez inmediata. Sin que hagas nada.",
    },
    {
      icon: "🔗",
      title: "Gastás sin perder rendimiento",
      text: "Cuando pagás con QR o tarjeta, solo desinvertimos lo exactamente necesario. El resto sigue generando.",
    },
    {
      icon: "🛡️",
      title: "Regulado y transparente",
      text: "Fondo regulado por la CNV. Tu dinero siempre visible, siempre disponible, con rendimiento diario.",
    },
  ],
  en: [
    {
      icon: "⚡",
      title: "Your balance always earns",
      text: "Every peso you deposit is automatically invested in an instant-liquidity fund. Without lifting a finger.",
    },
    {
      icon: "🔗",
      title: "Spend without losing returns",
      text: "When you pay with QR or card, we only divest exactly what's needed. The rest keeps generating.",
    },
    {
      icon: "🛡️",
      title: "Regulated and transparent",
      text: "Fund regulated by the CNV. Your money always visible, always available, with daily returns.",
    },
  ],
};

const TITLE = {
  es: "¿Por qué UX Dual?",
  en: "Why UX Dual?",
};

export const WhyUxDual = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cards = CARDS[language];

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{ background: "var(--color-bg-light)" }}
    >
      <div className="container mx-auto px-5">
        {/* Título */}
        <div
          className={`text-center mb-12 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {TITLE[language]}
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`group flex flex-col gap-5 p-7 rounded-2xl border transition-all duration-300 cursor-default
                hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{
                borderColor: "#E5E5E5",
                background: "#fff",
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E5E5")}
            >
              {/* Ícono */}
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl"
                style={{ background: "rgba(77,240,172,0.10)" }}
              >
                {card.icon}
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
