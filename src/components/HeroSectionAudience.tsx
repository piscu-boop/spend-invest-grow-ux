import { useEffect, useRef, useState } from "react";
import { useRates } from "@/hooks/useRates";

interface HeroSectionAudienceProps {
  onOpenBeta: () => void;
}

// Contador animado desde 0 a `target`
function useCounter(target: number, duration = 1400, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(2)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

const HeroSectionAudience: React.FC<HeroSectionAudienceProps> = ({ onOpenBeta }) => {
  const { rates } = useRates();
  const tnaPct = Math.round(rates.uxTna * 100);

  // Intersection observer para activar animaciones al entrar en viewport
  const heroRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Simulamos un rendimiento acumulado: tnaPct / 12 (mensual aprox)
  const monthlyYield = parseFloat(((rates.uxTna / 12) * 100).toFixed(2));
  const counterVal = useCounter(monthlyYield, 1400, visible);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-bg-dark)" }}
    >
      {/* Gradiente radial decorativo — esquina sup derecha */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(77,240,172,0.13) 0%, transparent 70%)",
        }}
      />
      {/* Gradiente sutil abajo izquierda */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 20% 80%, rgba(77,240,172,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-5 pt-24 pb-16 relative z-10">
        <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-8">

          {/* Badge TNA */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              background: "rgba(77,240,172,0.10)",
              borderColor: "rgba(77,240,172,0.30)",
              color: "#fff",
              transitionDelay: "0ms",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" />
            TNA hasta <strong style={{ color: "var(--color-accent)" }}>{tnaPct}%</strong>
            &nbsp;— FCI regulado por CNV
          </div>

          {/* H1 */}
          <h1
            className={`font-semibold leading-tight text-white transition-all duration-500 text-[clamp(2rem,5vw,3.25rem)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            Tu plata rinde mientras la gastás
          </h1>

          {/* Subtítulo */}
          <p
            className={`text-lg leading-relaxed max-w-[540px] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ color: "var(--color-text-muted)", transitionDelay: "200ms" }}
          >
            Invertimos tu saldo en FCI automáticamente. Cada peso que no usás, genera retorno.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <a
              href="https://apps.apple.com/us/app/ux-dual/id6673919572?l=es-MX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-[24px] font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-dark)",
              }}
            >
              Quiero UX Dual
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-[24px] font-semibold text-base border transition-all duration-200 hover:bg-white/8"
              style={{
                borderColor: "rgba(255,255,255,0.35)",
                color: "#fff",
              }}
            >
              Ver cómo funciona
            </a>
          </div>

          {/* Glassmorphism card */}
          <div
            className={`w-full max-w-[320px] rounded-2xl p-5 text-left transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              transitionDelay: "400ms",
            }}
          >
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-text-muted)" }}>
              Rendimiento acumulado este mes
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">
                {counterVal.toFixed(2)}%
              </span>
              <span
                className="mb-1 text-sm font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                +0,18% hoy ↑
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSectionAudience;
