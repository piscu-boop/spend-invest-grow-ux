import { useLanguage } from "@/contexts/LanguageContext"; // Importa el context global

export const ValueProposition = () => {
  const { language } = useLanguage(); // Usa el idioma global

  const content = {
    en: {
      title: "Tired of hearing",
      subtitle: "\"I can't save\"?",
      explanation: "That's exactly why we built UX DUAL",
      mainFeature: "Spend-to-Invest is here",
      benefits: [
        "No savings? No problem.",
        "Every purchase becomes an investment — with daily profits."
      ],
      cta: "  Join the movement."
    },
    es: {
      title: "¿Cansado de escuchar",
      subtitle: "\"no puedo ahorrar\"?",
      explanation: "Exactamente por eso construimos UX DUAL",
      mainFeature: "Invertí comprando ya está aquí",
      benefits: [
        "¿Sin ahorros? No hay problema.",
        "Cada compra se convierte en una inversión — con ganancias diarias."
      ],
      cta: "Únete al movimiento."
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative py-16 bg-slate-900 text-white overflow-hidden flex items-center">
      {/* Main Content - Centered */}
      <div className="w-full max-w-4xl mx-auto px-8 text-center">
        {/* Main headline */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
            {currentContent.title}
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-green-400 mb-6">
            {currentContent.subtitle}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            {currentContent.explanation}
          </p>

          <div className="text-2xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent">
              {currentContent.mainFeature}
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10 space-y-4">
          {currentContent.benefits.map((benefit, index) => (
            <p key={index} className="text-xl text-gray-300">
              {benefit}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div>
          <p className="text-lg font-semibold text-green-400 mb-6 uppercase tracking-wide">
            {currentContent.cta}
          </p>
          {/* 
          <Button className="bg-green-400 hover:bg-green-500 text-slate-900 font-semibold px-8 py-3 rounded-full text-lg">
            {language === 'en' ? 'JOIN WAITLIST' : 'ÚNETE A LA LISTA'}
          </Button>
          */}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-400 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-400 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-400 opacity-5 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default ValueProposition;
