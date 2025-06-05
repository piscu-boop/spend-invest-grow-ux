import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();


  const scrollToHowItWorks = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("how-it-works");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToFooter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = document.getElementById("footer");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  const content = {
    en: {
      preTitleFirst: "Inclusive & Innovative NeoBanking",
      preTitleSecond: "Be part of the movement.",
      mainTitle: "Turn your Daily-Spending into",
      highlightTitle: "DAILY-RETURNS",
      subtitle: "We are testing UX DUAL, an unprecedented payments infrastructure that unlocks investment for everyone.  ",
      description: "For the first time since credit cards in 1950 and debit cards in 1966, millions around the globe will have the chance to invest while spending, simultaneously, with the same money.",
      joinButton: "Join Now",
      howItWorksButton: "How It Works?"
    },
    es: {
      preTitleFirst: "NeoBanking inclusivo e innovador",
      preTitleSecond: "Sé parte del movimiento.",
      mainTitle: "Convierte tus gastos diarios en",
      highlightTitle: "INGRESOS DIARIOS",
      subtitle: "Estamos en fase de prueba con UX DUAL, una infraestructura de pagos única que hace que invertir sea posible para todos.",
      description: "Por primera vez desde la aparición de las tarjetas de crédito en 1950 y las de débito en 1966, millones de personas en todo el mundo podrán invertir mientras gastan, al mismo tiempo y con el mismo dinero.",
      joinButton: "Únete Ahora",
      howItWorksButton: "¿Cómo Funciona?"
    }
  };

  const currentContent = content[language];

  return (
    <section id="hero" className="relative min-h-screen bg-[#1C304F] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up text-center lg:text-left">
            <div className="space-y-4">
              {/* Small Title Above Main Title */}
              <p className="text-base md:text-lg font-semibold text-ux-green tracking-widest uppercase mb-2">
                {currentContent.preTitleFirst}
                <br />
                {currentContent.preTitleSecond}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {language === "en" ? (
                  <>
                    Turn your <span className="whitespace-nowrap">Daily-Spending</span> into
                    <br />
                    <span className="gradient-text">
                      {currentContent.highlightTitle}
                    </span>
                  </>
                ) : (
                  <>
                    Convierte tus
                    <br />
                    <span className="whitespace-nowrap">
                      gastos diarios en
                    </span>
                    <br />
                    <span className="gradient-text">
                      {currentContent.highlightTitle}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                {language === "en"
                  ? <>
                      We are testing{" "}
                      <img
                        src="lovable-uploads/logo-dual-simple.png"
                        alt="UX Dual Logo"
                        className="inline align-middle mx-1"
                        style={{ height: "0.75em", width: "auto", display: "inline", verticalAlign: "middle" }}
                      />
                      , an unprecedented payments infrastructure that unlocks investment for everyone.
                    </>
                  : <>
                      Estamos en fase de prueba con{" "}
                      <img
                        src="lovable-uploads/logo-dual-simple.png"
                        alt="UX Dual Logo"
                        className="inline align-middle mx-1"
                        style={{ height: "0.75em", width: "auto", display: "inline", verticalAlign: "middle" }}
                      />
                      , una infraestructura de pagos única que hace que invertir sea posible para todos.
                    </>
                }
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-200">
                {currentContent.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="border-[#0E1B38] bg-[#0E1B38] text-white hover:bg-blue-900/70 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 shadow-lg"
                onClick={scrollToFooter}
              >
                {currentContent.joinButton}
              </Button>
              <Button 
                variant="outline"
                className="border-slate-800 bg-slate-800 text-white hover:bg-blue-900/40 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300"
                onClick={scrollToHowItWorks}
              >
                {currentContent.howItWorksButton}
              </Button>
            </div>
          </div>

          {/* Right Content - Mobile App Preview */}
          <div className="relative flex justify-center animate-float">
            <div className="relative">
              {/* Glowing Circle Background */}
              <div className="absolute inset-0 w-[500px] h-[500px] bg-gradient-to-r from-ux-green/20 to-ux-green/10 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
              
              {/* Phone Mockup with App Screenshot */}
              <div className="relative z-10">
                <img 
                  src="lovable-uploads/200931e1-23f7-4c91-8aa2-73df09bab162.png" 
                  alt="UX Dual App Interface" 
                  className="w-[450px] h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
