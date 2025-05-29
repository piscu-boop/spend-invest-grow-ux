
import { useLanguage } from "@/contexts/LanguageContext";

const ValueProposition = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Turn Every Purchase Into",
      highlight: "Profit",
      description: "We are the first platform that transforms every expense into an investment with daily returns, automatically. We build solutions that facilitate and reinvent the way you save and create daily value."
    },
    es: {
      title: "Convierte cada compra en",
      highlight: "Ganancia",
      description: "Somos la primera plataforma que transforma cada gasto en una inversión con retornos diarios, automáticamente. Construimos soluciones que facilitan y reinventan la forma en que ahorras y creas valor diario."
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-ux-blue-dark to-ux-navy bg-cyan-700">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {currentContent.title}{" "}
            <span className="gradient-text text-[#02000a]">{currentContent.highlight}</span>
          </h2>
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            {currentContent.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
