
import { useLanguage } from "@/contexts/LanguageContext";

const ValueProposition = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      problemTitle: "TIRED OF HEARING",
      problemQuote: "\"I CAN'T SAVE\"?",
      solutionIntro: "That's exactly why we built",
      brandName: "UX DUAL",
      mainConcept: "SPEND-TO-INVEST",
      conceptSuffix: "IS HERE",
      benefitTitle: "No savings? No problem.",
      benefitDesc: "Every purchase becomes an investment — with daily profits.",
      ctaTitle: "JOIN THE MOVEMENT.",
      ctaSubtitle: "DOWNLOAD THE APP."
    },
    es: {
      problemTitle: "¿CANSADO DE ESCUCHAR",
      problemQuote: "\"NO PUEDO AHORRAR\"?",
      solutionIntro: "Por eso exactamente construimos",
      brandName: "UX DUAL",
      mainConcept: "GASTA-PARA-INVERTIR",
      conceptSuffix: "YA ESTÁ AQUÍ",
      benefitTitle: "¿Sin ahorros? No hay problema.",
      benefitDesc: "Cada compra se convierte en una inversión — con ganancias diarias.",
      ctaTitle: "ÚNETE AL MOVIMIENTO.",
      ctaSubtitle: "DESCARGA LA APP."
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen bg-ux-navy flex items-center overflow-hidden">
      {/* Background Effects - matching hero section */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Main Message */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Problem Statement */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {currentContent.problemTitle}
                <br />
                <span className="text-gray-300">
                  {currentContent.problemQuote}
                </span>
              </h2>
            </div>

            {/* Solution Introduction */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-gray-300">
                {currentContent.solutionIntro}
              </p>
              
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-8 py-6 border border-ux-green/20">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {currentContent.brandName}
                </h3>
              </div>
            </div>

            {/* Main Concept */}
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">
                  {currentContent.mainConcept}
                </span>
                <br />
                <span className="text-ux-green">
                  {currentContent.conceptSuffix}
                </span>
              </h3>
            </div>

            {/* Benefits */}
            <div className="space-y-4 bg-gradient-to-r from-ux-green/10 to-transparent rounded-2xl p-6 border border-ux-green/20">
              <h4 className="text-xl md:text-2xl font-semibold text-ux-green">
                {currentContent.benefitTitle}
              </h4>
              <p className="text-lg md:text-xl text-gray-300">
                {currentContent.benefitDesc}
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-4 pt-8">
              <h4 className="text-2xl md:text-3xl font-bold text-ux-green">
                {currentContent.ctaTitle}
              </h4>
              <p className="text-xl md:text-2xl text-white font-semibold">
                {currentContent.ctaSubtitle}
              </p>
              
              <button className="bg-ux-green hover:bg-ux-green-light text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg mt-6">
                {language === 'en' ? 'Download Now' : 'Descargar Ahora'}
              </button>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 w-[400px] h-[400px] bg-gradient-to-br from-ux-green/20 to-purple-500/20 rounded-full blur-3xl transform -translate-x-8 -translate-y-8"></div>
              
              {/* Phone mockup container */}
              <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-ux-green/30 shadow-2xl">
                <div className="space-y-6 text-center">
                  {/* Mock phone screen */}
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                        <span className="text-2xl">📱</span>
                      </div>
                      <h5 className="text-lg font-bold">UX DUAL APP</h5>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/30 rounded"></div>
                        <div className="h-2 bg-white/20 rounded w-3/4 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Investment visualization */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>Purchase</span>
                      <span className="text-ux-green">→ Investment</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>$50</span>
                      <span className="text-ux-green">+$2.5 profit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
