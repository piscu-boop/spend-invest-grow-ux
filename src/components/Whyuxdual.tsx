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
      text: "Cuando pagás con QR UX, el dinero de tu compra sigue generando rendimientos diarios hasta fin de mes.",
    },
    {
      icon: "🛡️",
      title: "Regulado y transparente",
      text: "Tu dinero siempre visible, siempre disponible, con rendimiento diario.",
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
      text: "When you pay with QR UX, the money from your purchase continues generating daily returns until the end of the month.",
    },
    {
      icon: "🛡️",
      title: "Regulated and transparent",
      text: "Your money always visible, always available, with daily returns.",
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
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="container mx-auto px-5">
        {/* Título */}
        <div
          className={`text-center mb-12 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {TITLE[language]}
          </h2>
        </div>

        {/* Layout 2 columnas desktop / columna única mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Columna izquierda — teléfono mockup */}
          <div
            className={`flex-shrink-0 flex justify-center transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "80ms" }}
          >
            <div className="relative">
              {/* Glow de fondo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  width: "340px",
                  height: "340px",
                  background: "radial-gradient(circle, rgba(77,240,172,0.18) 0%, rgba(77,240,172,0.05) 70%, transparent 100%)",
                  transform: "translate(-10%, -5%)",
                }}
              />
              <img
                src="/lovable-uploads/200931e1-23f7-4c91-8aa2-73df09bab162.png"
                alt="UX Dual App"
                className="relative z-10 drop-shadow-2xl"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          </div>

          {/* Columna derecha — cards apiladas */}
          <div className="flex flex-col gap-5 flex-1">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 cursor-default
                  hover:-translate-y-1
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
                style={{
                  borderColor: "rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.06)",
                  transitionDelay: `${(i + 1) * 100}ms`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              >
                <div className="flex items-center gap-4">
                  {/* Ícono */}
                  <div
                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl text-xl"
                    style={{ background: "rgba(77,240,172,0.10)" }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
