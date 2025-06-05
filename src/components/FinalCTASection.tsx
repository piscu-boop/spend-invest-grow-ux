import { useLanguage } from "@/contexts/LanguageContext";
import { sub } from "date-fns";

const FinalCTASection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Start building your wealth by",
      titleHighlight: "spending",
      subtitle: "Download UX Dual now and be the first to know about our upcoming launch."
      /*subtitle: "Join the financial revolution. Turn your everyday spending into your investment strategy."*/
    },
    es: {
      title: "Comienza a Construir Riqueza Con",
      titleHighlight: "Cada Compra",
      subtitle: "Descargá UX Dual ahora y sé el primero en enterarte de nuestro próximo lanzamiento."
      /*subtitle: "Únete a la revolución financiera. Convierte tus gastos cotidianos en tu estrategia de inversión."*/
    }
  };

  const currentContent = content[language];

  return (
    <section className="bg-[#1C304F] text-white py-16">
      <div className="container mx-auto px-4">
        {/* Contenido de la sección */}
        <div className="text-center max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {currentContent.title}{" "}
            <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>

          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed">
            {currentContent.subtitle}
          </p>


          {/* App Store and Google Play Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="https://apps.apple.com/us/app/ux-dual/id6673919572?l=es-MX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-300"
              style={{ width: "160px", height: "48px" }} // Tamaño fijo del botón
            >
              <img
                src="../../public/lovable-uploads/AppStore2.png" // Asegúrate de que esta imagen esté en la carpeta public/images
                alt="App Store"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=la.uxcapital.uxdual.firebase.android&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-300"
              style={{ width: "160px", height: "48px" }} // Tamaño fijo del botón
            >
              <img
                src="../../public/lovable-uploads/GooglePlay.png" // Asegúrate de que esta imagen esté en la carpeta public/images
                alt="Google Play"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
