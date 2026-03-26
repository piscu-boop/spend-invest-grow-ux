import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: 1,
    title: "Depositás tu plata",
    desc: "Transferís a tu CVU como siempre lo hacés. CVU propio, sin intermediarios.",
  },
  {
    n: 2,
    title: "UX invierte automáticamente",
    desc: "Tu saldo entra al FCI al instante. Desde el primer peso, cada día.",
  },
  {
    n: 3,
    title: "Gastás cuando querés",
    desc: "QR, tarjeta o transferencia. Solo se desinvierte lo que necesitás.",
  },
];

const HowItWorksSection = () => {
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
      id="como-funciona"
      ref={sectionRef}
      className="py-20"
      style={{ background: "var(--color-bg-gray)" }}
    >
      <div className="container mx-auto px-5">
        {/* Título */}
        <div
          className={`text-center mb-14 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Tres pasos. Así de simple.
          </h2>
        </div>

        {/* Layout desktop: pasos izquierda + mockup derecha */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Pasos */}
          <div className="flex-1 flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`flex gap-5 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Número + línea conectora */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-sm z-10"
                    style={{
                      background: "var(--color-accent)",
                      color: "var(--color-text-dark)",
                    }}
                  >
                    {step.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: "rgba(77,240,172,0.3)", minHeight: "40px" }} />
                  )}
                </div>

                {/* Contenido */}
                <div className="pb-8">
                  <h3
                    className="font-semibold text-lg mb-1"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mockup sticky */}
          <div
            className={`flex-1 flex justify-center lg:sticky lg:top-24 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div
              className="w-full max-w-[320px] rounded-[var(--radius-lg)] overflow-hidden flex items-center justify-center"
              style={{
                background: "var(--color-bg-dark)",
                aspectRatio: "9/16",
                minHeight: "360px",
              }}
            >
              <img
                src="lovable-uploads/200931e1-23f7-4c91-8aa2-73df09bab162.png"
                alt="UX Dual App"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
