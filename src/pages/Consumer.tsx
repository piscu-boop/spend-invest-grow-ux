import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Shield, Smartphone, CreditCard, DollarSign } from "lucide-react";

interface ConsumerProps {
  onOpenBeta: () => void;
}

const Consumer: React.FC<ConsumerProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "For Consumers",
      subtitle: "",
      description: "",
      heroTitle: "Your everyday purchases, now generating returns",
      heroSubtitle: "",
      benefits: [
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Daily Returns",
          description: "Your purchases start generating returns from day one"
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "Secure & Protected",
          description: "Your money is protected with bank-level security"
        },
        {
          icon: <Smartphone className="w-8 h-8" />,
          title: "Easy to Use",
          description: "Simple app interface, no complex investment knowledge needed"
        },
        {
          icon: <CreditCard className="w-8 h-8" />,
          title: "No Extra Fees",
          description: "Pay the same price, get investment returns on top"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Download the App",
          description: "Get UX Dual from your app store and create your account"
        },
        {
          step: "2",
          title: "Shop at Partner Merchants",
          description: "Find and shop at our network of partnered businesses"
        },
        {
          step: "3",
          title: "Automatic Investment",
          description: "Your purchase amount is automatically invested and starts generating returns"
        },
        {
          step: "4",
          title: "Track Your Returns",
          description: "Monitor your daily returns and compound growth in real-time"
        }
      ],
      ctaTitle: "Start earning returns on your purchases today",
      ctaButton: "Join as Consumer"
    },
    es: {
      title: "Para Consumidores",
      subtitle: "",
      description: "",
      heroTitle: "Tus compras diarias, ahora generando rendimientos",
      heroSubtitle: "",
      benefits: [
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Rendimientos Diarios",
          description: "Tus compras empiezan a generar rendimientos desde el día uno"
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "Seguro y Protegido",
          description: "Tu dinero está protegido con seguridad bancaria"
        },
        {
          icon: <Smartphone className="w-8 h-8" />,
          title: "Fácil de Usar",
          description: "Interfaz simple, no necesitás conocimientos complejos de inversión"
        },
        {
          icon: <CreditCard className="w-8 h-8" />,
          title: "Sin Costos Extra",
          description: "Pagás el mismo precio, obtenés rendimientos de inversión encima"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Descargá la App",
          description: "Obtené UX Dual desde tu tienda de apps y creá tu cuenta"
        },
        {
          step: "2",
          title: "Comprá en Comercios Adheridos",
          description: "Encontrá y comprá en nuestra red de comercios asociados"
        },
        {
          step: "3",
          title: "Inversión Automática",
          description: "El monto de tu compra se invierte automáticamente y empieza a generar rendimientos"
        },
        {
          step: "4",
          title: "Seguí Tus Rendimientos",
          description: "Monitoreá tus rendimientos diarios y crecimiento compuesto en tiempo real"
        }
      ],
      ctaTitle: "Empezá a generar rendimientos en tus compras hoy",
      ctaButton: "Únete como Consumidor"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#1C304F] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="text-center space-y-8 animate-slide-up">
            <div className="space-y-4">
              <p className="text-base md:text-lg font-semibold text-ux-green tracking-widest uppercase">
                {currentContent.title}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {currentContent.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white leading-relaxed max-w-4xl mx-auto">
                {currentContent.heroSubtitle}
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {currentContent.description}
              </p>
            </div>

            <Button
              className="border-[#0E1B38] bg-[#0E1B38] text-white hover:bg-blue-900/70 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 shadow-lg"
              onClick={onOpenBeta}
            >
              {currentContent.ctaButton}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C304F]">
              {language === 'en' ? 'Why Choose UX Dual?' : '¿Por qué elegir UX Dual?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Experience the future of shopping and investing combined' 
                : 'Experimentá el futuro de comprar e invertir combinados'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 hover:border-ux-green/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 text-ux-green">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl text-[#1C304F]">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C304F]">
              {language === 'en' ? 'How It Works' : 'Cómo Funciona'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Get started in just a few simple steps' 
                : 'Empezá en solo unos simples pasos'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-6 w-16 h-16 bg-ux-green text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#1C304F] mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1C304F]">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {currentContent.ctaTitle}
            </h2>
            <Button
              className="border-[#0E1B38] bg-[#0E1B38] text-white hover:bg-blue-900/70 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 shadow-lg"
              onClick={onOpenBeta}
            >
              {currentContent.ctaButton}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consumer;
