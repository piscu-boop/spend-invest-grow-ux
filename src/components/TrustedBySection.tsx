import { useLanguage } from "@/contexts/LanguageContext";

const trustedCompanies = [
  { name: "BCRA", src: "lovable-uploads/logo-bcra.png", alt: "BCRA" },
  { name: "DraperHouseAmerica", src: "lovable-uploads/logo-draperHA.png", alt: "Draper House America" },
  { name: "Delta", src: "lovable-uploads/logo-delta.png", alt: "Delta" },
  { name: "Bizland", src: "lovable-uploads/logo-bizland.png", alt: "Bizland" },
  { name: "DraperHouse", src: "lovable-uploads/logo-draperHo.png", alt: "Draper House" },
  { name: "TrustCapital", src: "lovable-uploads/logo-tcp.png", alt: "Trust Capital" },
  { name: "DraperUniversity", src: "lovable-uploads/logo-draperU.png", alt: "Draper University" },
];
const titles = {
  en: "Trusted by",
  es: "Confían en nosotros"
};

const TrustedBySection = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-[#223A5F] py-12 w-full">
      <div className="mx-auto px-0">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">
          {titles[language]}
        </h3>
        <div className="overflow-hidden">
          <div className="flex items-center gap-20 animate-scroll-logos min-w-[200%]">
            {trustedCompanies.concat(trustedCompanies).map((company, idx) =>  (
              <div key={company.name + idx} className="flex items-center justify-center h-16 min-w-[160px]">
                <img
                  src={company.src}
                  alt={company.alt}
                  className="object-contain max-h-16"
                  width={140}
                  height={100}
                />
              </div>
            ))}
            {/* Repetimos los logos para efecto infinito */}
            {trustedCompanies.map((company, idx) => (
              <div key={company.name + "repeat" + idx} className="flex items-center justify-center h-16 min-w-[160px]">
                <img
                  src={company.src}
                  alt={company.alt}
                  className="object-contain max-h-16"
                  width={140}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          .animate-scroll-logos {
            animation: scroll-logos 30s linear infinite;
          }
          @keyframes scroll-logos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default TrustedBySection;