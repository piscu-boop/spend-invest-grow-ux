
import { useLanguage } from "@/contexts/LanguageContext";

const ValueProposition = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      mainTitle: "TIRED OF HEARING",
      quotedTitle: ""I CAN'T SAVE"?",
      subtitle: "That's exactly why we built",
      brandName: "UX DUAL",
      spendToInvest: "SPEND-TO-INVEST",
      isHere: "IS HERE",
      description: "No savings? No problem. Every purchase becomes an investment — with daily profits.",
      ctaText: "JOIN THE MOVEMENT. DOWNLOAD THE APP."
    },
    es: {
      mainTitle: "¿CANSADO DE ESCUCHAR",
      quotedTitle: ""NO PUEDO AHORRAR"?",
      subtitle: "Exactamente por eso construimos",
      brandName: "UX DUAL",
      spendToInvest: "GASTA-PARA-INVERTIR",
      isHere: "ESTÁ AQUÍ",
      description: "¿Sin ahorros? No hay problema. Cada compra se convierte en una inversión — con ganancias diarias.",
      ctaText: "ÚNETE AL MOVIMIENTO. DESCARGA LA APP."
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen bg-ux-navy flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up text-center lg:text-left">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {currentContent.mainTitle}
                <br />
                <span className="text-white">
                  {currentContent.quotedTitle}
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300">
                {currentContent.subtitle}
              </p>
              
              <div className="bg-black rounded-2xl px-8 py-4 inline-block">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {currentContent.brandName}
                </h3>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="gradient-text">
                    {currentContent.spendToInvest}
                  </span>
                </h4>
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400">
                  {currentContent.isHere}
                </h4>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                {currentContent.description}
              </p>
              
              <p className="text-lg md:text-xl font-semibold gradient-text">
                {currentContent.ctaText}
              </p>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative flex justify-center animate-float">
            <div className="relative">
              {/* Glowing Background */}
              <div className="absolute inset-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-400/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
              
              {/* Illustration Area */}
              <div className="relative z-10 flex flex-col items-center space-y-8">
                {/* Person with Phone Illustration */}
                <div className="relative w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H7V6h10v10z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Investment Growth Chart */}
                <div className="flex space-x-4">
                  <div className="w-8 h-16 bg-gradient-to-t from-ux-green to-ux-green-light rounded opacity-80"></div>
                  <div className="w-8 h-20 bg-gradient-to-t from-ux-green to-ux-green-light rounded"></div>
                  <div className="w-8 h-24 bg-gradient-to-t from-ux-green to-ux-green-light rounded"></div>
                  <div className="w-8 h-28 bg-gradient-to-t from-ux-green to-ux-green-light rounded"></div>
                </div>
                
                {/* Dollar Sign */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse-green">
                  <span className="text-2xl font-bold text-black">$</span>
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
