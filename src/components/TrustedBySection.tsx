import { useLanguage } from "@/contexts/LanguageContext";

const trustedLogos = [
  { name: "BCRA",          src: "/lovable-uploads/logo-bcra.png",     alt: "BCRA" },
  { name: "DraperHouseAm", src: "/lovable-uploads/logo-draperHA.png", alt: "Draper House America" },
  { name: "Delta",         src: "/lovable-uploads/logo-delta.png",    alt: "Delta" },
  { name: "Bizland",       src: "/lovable-uploads/logo-bizland.png",  alt: "Bizland" },
  { name: "DraperHouse",   src: "/lovable-uploads/logo-draperHo.png", alt: "Draper House" },
  { name: "TrustCapital",  src: "/lovable-uploads/logo-tcp.png",      alt: "Trust Capital" },
  { name: "DraperUniv",    src: "/lovable-uploads/logo-draperU.png",  alt: "Draper University" },
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
            <div key={l.name + i} className="flex items-center justify-center h-12 min-w-[120px]">
              <img
                src={l.src}
                alt={l.alt}
                className="object-contain max-h-10 transition-opacity"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.55 }}
                width={110}
                height={40}
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
