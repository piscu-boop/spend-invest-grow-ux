
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Revolutionary",
      titleHighlight: "Features",
      subtitle: "Experience the future of finance with features designed to transform your spending into wealth building.",
      features: [
        {
          title: "Smart Investment Integration",
          description: "Your purchase money stays in your investment account",
          detail: "Every dollar you spend comes from your investment portfolio, allowing your money to grow even while you shop.",
          icon: "💳"
        },
        {
          title: "Instant Money Management", 
          description: "Send and receive money instantly with your UX account",
          detail: "Transfer funds, pay friends, and manage your finances seamlessly through our integrated platform.",
          icon: "⚡"
        },
        {
          title: "Complete Account Control",
          description: "Control your account and review your transactions easily",
          detail: "Stay on top of your finances with real-time tracking and comprehensive transaction history.",
          icon: "📊"
        },
        {
          title: "Automated Wealth Building",
          description: "Each of your purchases gets invested in the capital market, automatically",
          detail: "Your everyday spending automatically flows into diversified investment opportunities, building wealth without effort.",
          icon: "🚀"
        }
      ]
    },
    es: {
      title: "Características",
      titleHighlight: "Revolucionarias",
      subtitle: "Experimenta el futuro de las finanzas con características diseñadas para transformar tus gastos en construcción de riqueza.",
      features: [
        {
          title: "Integración Inteligente de Inversión",
          description: "Tu dinero de compras permanece en tu cuenta de inversión",
          detail: "Cada peso que gastas proviene de tu portafolio de inversión, permitiendo que tu dinero crezca incluso mientras compras.",
          icon: "💳"
        },
        {
          title: "Gestión Instantánea de Dinero", 
          description: "Envía y recibe dinero instantáneamente con tu cuenta UX",
          detail: "Transfiere fondos, paga a amigos y gestiona tus finanzas sin problemas a través de nuestra plataforma integrada.",
          icon: "⚡"
        },
        {
          title: "Control Completo de Cuenta",
          description: "Controla tu cuenta y revisa tus transacciones fácilmente",
          detail: "Mantente al día con tus finanzas con seguimiento en tiempo real e historial completo de transacciones.",
          icon: "📊"
        },
        {
          title: "Construcción Automatizada de Riqueza",
          description: "Cada una de tus compras se invierte en el mercado de capitales, automáticamente",
          detail: "Tus gastos cotidianos fluyen automáticamente hacia oportunidades de inversión diversificadas, construyendo riqueza sin esfuerzo.",
          icon: "🚀"
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <section id="features" className="py-20 bg-ux-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {currentContent.title} <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentContent.features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-ux-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-ux-green/20 hover:border-ux-green/40 transition-all duration-500 hover:transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-ux-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ux-green transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-ux-green font-semibold mb-4 text-sm">
                  {feature.description}
                </p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {feature.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
