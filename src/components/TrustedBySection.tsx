import { useEffect, useRef, useState } from "react";

// ─── Métricas ───────────────────────────────────────────────
const METRICS = [
  { value: 5200,  suffix: "+", label: "usuarios activos",  prefix: "" },
  { value: 120,   suffix: "M+", label: "en FCI invertido", prefix: "$" },
  { value: null,  suffix: "",   label: "CNV regulado",     prefix: "" },
  { value: 0,     suffix: "",   label: "costo mensual",    prefix: "$" },
];

function useCounterVisible(target: number | null, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || target === null || target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// Wrapper per métrica para invocar el hook sin condicional
function MetricCard({ value, suffix, label, prefix, active, index }: {
  value: number | null; suffix: string; label: string; prefix: string;
  active: boolean; index: number;
}) {
  const counted = useCounterVisible(value, 1600, active);

  const display =
    value === null
      ? "✓"
      : value === 0
        ? `${prefix}0`
        : `${prefix}${counted.toLocaleString("es-AR")}${suffix}`;

  return (
    <div
      className={`flex flex-col items-center gap-1 px-6 py-6 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="text-[2rem] font-bold leading-none" style={{ color: "var(--color-text-dark)" }}>
        {display}
      </span>
      <span className="text-sm text-center" style={{ color: "#6B7280" }}>{label}</span>
    </div>
  );
}

const trustedLogos = [
  { name: "BCRA",           src: "lovable-uploads/logo-bcra.png",     alt: "BCRA" },
  { name: "DraperHouseAm.", src: "lovable-uploads/logo-draperHA.png", alt: "Draper House America" },
  { name: "Delta",          src: "lovable-uploads/logo-delta.png",    alt: "Delta" },
  { name: "Bizland",        src: "lovable-uploads/logo-bizland.png",  alt: "Bizland" },
  { name: "DraperHouse",    src: "lovable-uploads/logo-draperHo.png", alt: "Draper House" },
  { name: "TrustCapital",   src: "lovable-uploads/logo-tcp.png",      alt: "Trust Capital" },
  { name: "DraperUniv.",    src: "lovable-uploads/logo-draperU.png",  alt: "Draper University" },
];

const TrustedBySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--color-bg-light)" }}>
      {/* Métricas */}
      <div className="container mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} {...m} active={visible} index={i} />
          ))}
        </div>
      </div>

      {/* Logo scroll */}
      <div className="border-t border-gray-100 py-10 overflow-hidden">
        <p
          className={`text-center text-sm font-medium mb-7 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ color: "#9CA3AF" }}
        >
          Confían en nosotros
        </p>
        <div className="overflow-hidden">
          <div className="flex items-center gap-16 animate-scroll-logos min-w-[200%]">
            {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((l, i) => (
              <div key={l.name + i} className="flex items-center justify-center h-12 min-w-[120px]">
                <img src={l.src} alt={l.alt} className="object-contain max-h-10 opacity-60 hover:opacity-100 transition-opacity" width={110} height={40} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .animate-scroll-logos { animation: scroll-logos 28s linear infinite; }
        @keyframes scroll-logos { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
