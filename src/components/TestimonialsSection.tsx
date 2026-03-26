import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    initials: "MG",
    name: "María G.",
    role: "Estudiante universitaria",
    quote: "No sabía nada de inversiones. Con UX Dual empecé a ganar plata sin hacer nada diferente. Sigo pagando todo con QR y el saldo crece solo.",
  },
  {
    initials: "LR",
    name: "Lucas R.",
    role: "Freelancer de diseño",
    quote: "Tenía la plata parada entre proyecto y proyecto. Ahora todo lo que entra al CVU ya está trabajando. Es ridículo lo fácil que es.",
  },
  {
    initials: "CQ",
    name: "Carolina Q.",
    role: "Dueña de local gastronómico",
    quote: "Cada venta que cae en mi cuenta empieza a rendir al instante. Nunca pensé que iba a poder invertir sin separarme de la plata.",
  },
];

const TestimonialsSection = () => {
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
      className="py-20"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="container mx-auto px-5">
        {/* Título */}
        <div
          className={`text-center mb-12 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Lo que dicen nuestros usuarios
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`flex flex-col gap-4 p-6 rounded-2xl transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.10)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Estrellas */}
              <div className="flex gap-0.5 text-base" style={{ color: "var(--color-accent)" }}>
                {"★★★★★"}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.85)" }}>
                "{t.quote}"
              </p>

              {/* Avatar + nombre */}
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                  style={{
                    background: "rgba(77,240,172,0.15)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(77,240,172,0.25)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
