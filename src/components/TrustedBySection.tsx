import { useLanguage } from "@/contexts/LanguageContext";

const trustedLogos = [
  { name: "DraperHouseAm", src: "/lovable-uploads/logo-draperHA.png",      alt: "Draper House America", filter: "brightness(1.1) saturate(0.9)", opacity: 0.85 },
  { name: "Delta",         src: "/lovable-uploads/logo-delta.png",          alt: "Delta",               filter: "brightness(0) invert(1)",     opacity: 0.75 },
  { name: "Bizland",       src: "/lovable-uploads/logo-bizland.png",        alt: "Bizland",             filter: "brightness(0) invert(1)",     opacity: 0.75 },
  { name: "DraperHouse",   src: "/lovable-uploads/logo-draperHo.png",       alt: "Draper House",        filter: "brightness(1.2) saturate(0.8) contrast(1.1)", opacity: 0.85 },
  { name: "DraperUniv",    src: "/lovable-uploads/logo-draperU.png",        alt: "Draper University",   filter: "brightness(0) invert(1)",     opacity: 0.75 },
  { name: "EndeavorHIT",   src: "/lovable-uploads/logo-endeavor-hit.svg",   alt: "Endeavor HIT",        filter: "none",                        opacity: 0.90, width: 180, height: 44 },
];

const titles = { en: "Trusted by", es: "Confían en nosotros" };

const TrustedBySection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-10" style={{ background: "var(--color-bg-dark)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-center text-sm font-medium mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>
        {titles[language]}
      </p>
      <div className="overflow-hidden">
        <div className="flex items-center gap-16 animate-scroll-logos min-w-[200%]">
          {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((l, i) => (
            <div key={l.name + i} className="flex items-center justify-center h-14 min-w-[120px]">
              <img
                src={l.src}
                alt={l.alt}
                className="object-contain transition-opacity"
                style={{ filter: l.filter, opacity: l.opacity, maxHeight: l.height ?? 40 }}
                width={l.width ?? 110}
                height={l.height ?? 40}
                loading="lazy"
              />
            </div>
          ))}
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
