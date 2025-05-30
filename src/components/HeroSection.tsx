import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      mainTitle: "Your Purchases,",
      highlightTitle: "Your Best Investment",
      subtitle: "UX Dual is the first app that lets you invest the same money you use for your everyday purchases.",
      description: "Transform every transaction into a wealth-building opportunity. Start investing automatically with the money you're already spending.",
      joinButton: "Join Now",
      howItWorksButton: "How It Works?"
    },
    es: {
      mainTitle: "Tus compras,",
      highlightTitle: "TU MEJOR INVERSIÓN",
      subtitle: "UX Dual es la primera App que te permite invertir el mismo dinero que usas para hacer tus compras.",
      description: "Transforma cada transacción en una oportunidad de generar riqueza. Comienza a invertir automáticamente con el dinero que ya estás gastando.",
      joinButton: "Únete Ahora",
      howItWorksButton: "¿Cómo Funciona?"
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen bg-ux-navy flex items-center overflow-hidden">
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {currentContent.mainTitle}
                <br /> {/* Esto fuerza un salto de línea */}
                <span className="gradient-text">
                  {currentContent.highlightTitle}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                {currentContent.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-200">
                {currentContent.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-ux-green hover:bg-ux-green-light text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                {currentContent.joinButton}
              </Button>
              <Button variant="outline" className="border-ux-green text-ux-green hover:bg-ux-green hover:text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300">
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
