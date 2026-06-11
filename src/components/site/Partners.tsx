import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const logos = [
  { name: "Draper University", src: "/lovable-uploads/logo-draperU.png" },
  { name: "Endeavor", src: "/lovable-uploads/logo-endeavor-hit.svg" },
  { name: "Delta Asset Management", src: "/lovable-uploads/logo-delta.png" },
  { name: "Bizland", src: "/lovable-uploads/logo-bizland.png" },
];

const content = {
  es: { eyebrow: "Confían en nosotros" },
  en: { eyebrow: "Trusted by" },
};

export function Partners() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section id="partners" className="relative py-24 bg-navy-deep">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <FadeUp>
          <p className="eyebrow text-white/60">{c.eyebrow}</p>
        </FadeUp>
      </div>

      <div
        className="marquee mt-12 w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="marquee-track flex w-max items-center animate-marquee-scroll">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="shrink-0 px-6">
              <div className="flex items-center justify-center h-[60px] w-[180px]">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-[54px] max-w-[160px] w-auto h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
