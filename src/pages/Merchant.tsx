import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TrustedBySection from "@/components/TrustedBySection";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Shield, Smartphone, CreditCard, BarChart3, Store, Handshake } from "lucide-react";

interface MerchantProps {
  onOpenBeta: () => void;
}

const Merchant: React.FC<MerchantProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "For Merchants",
      subtitle: "Grow your business with investment-powered purchases",
      description: "Join our network of partnered merchants and offer your customers the unique opportunity to turn their purchases into investments.",
      heroTitle: "Attract more customers with investment rewards",
      heroSubtitle: "UX Dual helps merchants increase sales and customer loyalty",
      benefits: [
        {
          icon: <Users className="w-8 h-8" />,
          title: "More Customers",
          description: "Attract investment-conscious consumers to your business"
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Higher Sales",
          description: "Increase average transaction values and repeat purchases"
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Customer Loyalty",
          description: "Build stronger relationships with investment-minded customers"
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Analytics Dashboard",
          description: "Track your performance and customer engagement metrics"
        }
      ],
      features: [
        {
          icon: <Store className="w-6 h-6" />,
          title: "Easy Integration",
          description: "Simple setup process with minimal technical requirements"
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Secure Payments",
          description: "Bank-level security for all transactions"
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Mobile Optimized",
          description: "Works seamlessly on all devices and payment methods"
        },
        {
          icon: <CreditCard className="w-6 h-6" />,
          title: "No Setup Fees",
          description: "Start accepting UX Dual payments with no upfront costs"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Apply to Join",
          description: "Submit your business information for partnership review"
        },
        {
          step: "2",
          title: "Get Approved",
          description: "Receive approval and integration instructions"
        },
        {
          step: "3",
          title: "Integrate Payment",
          description: "Add UX Dual payment option to your checkout process"
        },
        {
          step: "4",
          title: "Start Earning",
          description: "Welcome new customers and watch your sales grow"
        }
      ],
      ctaTitle: "Join thousands of merchants growing with UX Dual",
      ctaButton: "Apply as Merchant"
    },
    es: {
      title: "Para Comerciantes",
      subtitle: "Hacé crecer tu negocio con compras potenciadas por inversión",
      description: "Unite a nuestra red de comercios adheridos y ofrecé a tus clientes la oportunidad única de convertir sus compras en inversiones.",
      heroTitle: "Atraé más clientes con recompensas de inversión",
      heroSubtitle: "UX Dual ayuda a los comerciantes a aumentar ventas y fidelidad de clientes",
      benefits: [
        {
          icon: <Users className="w-8 h-8" />,
          title: "Más Clientes",
          description: "Atraé consumidores conscientes de la inversión a tu negocio"
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Mayores Ventas",
          description: "Incrementá valores promedio de transacciones y compras repetidas"
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Fidelidad de Clientes",
          description: "Construí relaciones más fuertes con clientes orientados a la inversión"
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Panel de Analytics",
          description: "Seguí tu rendimiento y métricas de engagement de clientes"
        }
      ],
      features: [
        {
          icon: <Store className="w-6 h-6" />,
          title: "Fácil Integración",
          description: "Proceso de configuración simple con requisitos técnicos mínimos"
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Pagos Seguros",
          description: "Seguridad bancaria para todas las transacciones"
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Optimizado Móvil",
          description: "Funciona perfectamente en todos los dispositivos y métodos de pago"
        },
        {
          icon: <CreditCard className="w-6 h-6" />,
          title: "Sin Costos de Setup",
          description: "Empezá a aceptar pagos UX Dual sin costos iniciales"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Aplicá para Unirte",
          description: "Enviá la información de tu negocio para revisión de asociación"
        },
        {
          step: "2",
          title: "Obtené Aprobación",
          description: "Recibí aprobación e instrucciones de integración"
        },
        {
          step: "3",
          title: "Integrá el Pago",
          description: "Agregá la opción de pago UX Dual a tu proceso de checkout"
        },
        {
          step: "4",
          title: "Empezá a Ganar",
          description: "Recibí nuevos clientes y mirá crecer tus ventas"
        }
      ],
      ctaTitle: "Unite a miles de comerciantes que crecen con UX Dual",
      ctaButton: "Aplicar como Comercio"
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
              {language === 'en' ? 'Why Partner with UX Dual?' : '¿Por qué asociarte con UX Dual?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Join the future of commerce and customer engagement' 
                : 'Unite al futuro del comercio y engagement de clientes'}
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C304F]">
              {language === 'en' ? 'Platform Features' : 'Características de la Plataforma'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Everything you need to succeed as a UX Dual merchant' 
                : 'Todo lo que necesitás para tener éxito como comercio UX Dual'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-ux-green/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-ux-green">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg text-[#1C304F]">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C304F]">
              {language === 'en' ? 'How to Get Started' : 'Cómo Empezar'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Join our merchant network in just a few simple steps' 
                : 'Unite a nuestra red de comerciantes en solo unos simples pasos'}
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

      <TrustedBySection />
      <Footer />
    </div>
  );
};

export default Merchant;
