
import { useLanguage } from "@/contexts/LanguageContext";

const ValueProposition = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      mainTitle: "UX CAPITAL",
      subtitle: "SPEND-TO-INVEST",
      tagline: "The first card that invests while you spend",
      description: "Every purchase with your UX Capital card automatically triggers smart investments in diversified portfolios. Turn your daily spending into daily wealth building.",
      howItWorks: "HOW IT WORKS:",
      step1: "SPEND",
      step1Desc: "Make any purchase with your UX Capital card",
      step2: "INVEST", 
      step2Desc: "Your spending automatically triggers smart investments",
      step3: "GROW",
      step3Desc: "Watch your money multiply with daily returns",
      ctaText: "GET YOUR CARD NOW"
    },
    es: {
      mainTitle: "UX CAPITAL",
      subtitle: "GASTA-PARA-INVERTIR",
      tagline: "La primera tarjeta que invierte mientras gastas",
      description: "Cada compra con tu tarjeta UX Capital activa automáticamente inversiones inteligentes en portafolios diversificados. Convierte tus gastos diarios en construcción de riqueza diaria.",
      howItWorks: "CÓMO FUNCIONA:",
      step1: "GASTA",
      step1Desc: "Haz cualquier compra con tu tarjeta UX Capital",
      step2: "INVIERTE",
      step2Desc: "Tu gasto activa automáticamente inversiones inteligentes", 
      step3: "CRECE",
      step3Desc: "Ve multiplicar tu dinero con retornos diarios",
      ctaText: "OBTÉN TU TARJETA AHORA"
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen bg-slate-900 flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center space-y-16">
          {/* Main Message */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                {currentContent.mainTitle}
              </h1>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  {currentContent.subtitle}
                </span>
              </h2>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-semibold max-w-4xl mx-auto">
              {currentContent.tagline}
            </p>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* How It Works Process */}
          <div className="space-y-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {currentContent.howItWorks}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {currentContent.step1}
                  </h4>
                  <p className="text-gray-300 text-lg">
                    {currentContent.step1Desc}
                  </p>
                </div>
                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white text-4xl">
                  →
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {currentContent.step2}
                  </h4>
                  <p className="text-gray-300 text-lg">
                    {currentContent.step2Desc}
                  </p>
                </div>
                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white text-4xl">
                  →
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {currentContent.step3}
                  </h4>
                  <p className="text-gray-300 text-lg">
                    {currentContent.step3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl">
              {currentContent.ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
