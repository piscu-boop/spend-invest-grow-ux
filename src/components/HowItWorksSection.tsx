
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksSection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Now, invest with",
      titleHighlight: "no savings",
      subtitle: "Four simple steps to transform your everyday purchases into wealth-building opportunities.",
      steps: [
        {
          step: "01",
          title: "Maximize your spending",
          description: "Link your UX Dual account to your everyday purchases and start building wealth with daily returns."
        },
        {
          step: "02",
          title: "Automatic Investment",
          description: "Your money working for you 24/7, even when you spend it. Turn every purchase into automatic daily growth."
        },
        {
          step: "03",
          title: "Watch Your Money Grow",
          description: "Track your investments and returns in real-time while continuing your normal spending habits."
        },
        {
          step: "04",
          title: "Invest Without Saving",
          description: "Now you can build wealth without setting money aside — just by spending like you always do."
        }
      ]
    },
    es: {
      title: "Invertir es tan simple como",
titleHighlight: "comprar",
subtitle: "Cuatro simples pasos para transformar tus compras diarias en oportunidades para construir riqueza.",
steps: [
  {
    step: "01",
    title: "Maximizá tus gastos",
    description: "Vinculá tu cuenta UX Dual a tus compras diarias y empezá a generar riqueza con rendimientos diarios."
  },
  {
    step: "02",
    title: "Inversión automática",
    description: "Tu dinero trabaja para vos 24/7, incluso cuando lo gastás. Convertí cada compra en crecimiento diario automático."
  },
  {
    step: "03",
    title: "Observá tu dinero crecer",
    description: "Seguí tus inversiones y rendimientos en tiempo real, mientras mantenés tus hábitos de gasto."
  },
  {
    step: "04",
    title: "Invertí sin ahorrar",
    description: "Ahora podés generar riqueza sin necesidad de apartar dinero — solo gastando como siempre lo haces."
  }
]

    }
  };

  const currentContent = content[language];

  return (
    <section id="how-it-works" className="py-20 bg-[#1C304F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {currentContent.title}{" "}
            <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {currentContent.steps.map((step, index) => (
            <div key={index} className="relative group animate-slide-up" style={{
              animationDelay: `${index * 0.2}s`
            }}>
              {/* Connection Line */}
              {index < currentContent.steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-ux-green/50 to-transparent transform translate-x-4 z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-ux-green rounded-full text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-green">
                  {step.step}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-ux-green transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
