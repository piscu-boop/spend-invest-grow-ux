
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTASection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Start Building Wealth With",
      titleHighlight: "Every Purchase",
      subtitle: "Join the financial revolution. Turn your everyday spending into your investment strategy.",
      downloadButton: "Download UX Dual Now",
      availableText: "Available on iOS and Android",
      startText: "Start investing automatically today",
      appStore: "📱 App Store",
      googlePlay: "🤖 Google Play"
    },
    es: {
      title: "Comienza a Construir Riqueza Con",
      titleHighlight: "Cada Compra",
      subtitle: "Únete a la revolución financiera. Convierte tus gastos cotidianos en tu estrategia de inversión.",
      downloadButton: "Descarga UX Dual Ahora",
      availableText: "Disponible en iOS y Android",
      startText: "Comienza a invertir automáticamente hoy",
      appStore: "📱 App Store",
      googlePlay: "🤖 Google Play"
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-ux-navy to-ux-blue-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-sky-700">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {currentContent.title}{" "}
            <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed">
            {currentContent.subtitle}
          </p>

          <div className="space-y-8">
            <Button className="bg-ux-green hover:bg-ux-green-light text-white px-12 py-6 text-xl rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse-green">
              {currentContent.downloadButton}
            </Button>

            <div className="text-white">
              <p className="text-lg">{currentContent.availableText}</p>
              <p className="text-sm mt-2">{currentContent.startText}</p>
            </div>

            {/* App Store Badges */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <div className="bg-ux-blue-dark rounded-xl px-8 py-4 border border-ux-green/20 hover:border-ux-green/40 transition-colors duration-300">
                <div className="text-white font-semibold">{currentContent.appStore}</div>
              </div>
              <div className="bg-ux-blue-dark rounded-xl px-8 py-4 border border-ux-green/20 hover:border-ux-green/40 transition-colors duration-300">
                <div className="text-white font-semibold">{currentContent.googlePlay}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
