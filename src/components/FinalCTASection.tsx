import { useEffect, useRef, useState } from "react";

// SVG App Store
const AppStoreSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// SVG Google Play
const GooglePlaySVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.18 23.76c.34.19.73.19 1.08 0L15.54 12 12 8.46 3.18 23.76zm17.16-11.9L17.7 10.4 13.88 12l3.82 1.6 2.64-1.46c.83-.46.83-1.62 0-2.08zM3.04.26C2.69.45 2.46.83 2.46 1.28V22.7c0 .45.23.83.58 1.02L14.23 12 3.04.26zm10.08 11.74L4.26.52l11.88 6.88-2.02 1.6z"/>
  </svg>
);

const FinalCTASection = () => {
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
          className={`max-w-2xl mx-auto flex flex-col items-center gap-6 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Empezá a ganar desde mañana
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Gratis. Sin comisiones. Sin excusas.
          </p>

          {/* CTA primario */}
          <a
            href="https://apps.apple.com/us/app/ux-dual/id6673919572?l=es-MX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95 mt-2"
            style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
          >
            Descargar UX Dual
          </a>

          {/* Store links */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="https://apps.apple.com/us/app/ux-dual/id6673919572?l=es-MX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all duration-200 hover:bg-white/8"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              <AppStoreSVG />
              <span className="text-sm font-medium">App Store</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=la.uxcapital.uxdual.firebase.android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all duration-200 hover:bg-white/8"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              <GooglePlaySVG />
              <span className="text-sm font-medium">Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
