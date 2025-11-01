import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Shield, Smartphone, CreditCard, BarChart3, Store, Handshake } from "lucide-react";

interface MerchantProps {
  onOpenBeta: () => void;
}

const Merchant: React.FC<MerchantProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash]);

  const content = {
    en: {
      title: "For Merchants",
      subtitle: "",
      description: "",
      heroTitle: "Buy and Sell with UX DUAL",
      heroSubtitle: "",
      benefits: [
        {
          icon: <Users className="w-8 h-8" />,
          title: "Reduce your Processing Fees",
          description: ""
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Higher Sales",
          description: ""
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Customer Loyalty",
          description: ""
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Track your sales in real-time",
          description: ""
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
          title: "QR Payment",
          description: "Available in every mobile device"
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
          title: "Schedule a call with our team",
          description: "Send your business information for partnership review"
        },
        {
          step: "2",
          title: "We onboard your business",
          description: "Receive approval and integration instructions"
        },
        {
          step: "3",
          title: "Get your UX Dual QR",
          description: "Add the UX Dual payment option to your checkout process"
        },
        {
          step: "4",
          title: "You’re now a UX Merchant",
          description: "Receive new customers and watch your sales grow"
        }
      ],      
      ctaTitle: "Join our network of merchants growing with UX Dual",
      ctaDescription: "Schedule a call with our team and start growing with UX Dual",
      ctaButton: "I want to be a UX Merchant"
    },
    es: {
      title: "Para Comercios",
      subtitle: "Hacé crecer tu negocio con compras potenciadas por inversión",
      description: "",
      heroTitle: "Comprá y Vendé con UX DUAL",
      heroSubtitle: "",
      benefits: [
        {
          icon: <Users className="w-8 h-8" />,
          title: "Reducí tus costos de procesamiento",
          description: ""
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Impulsá tus Ventas",
          description: ""
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Fidelizá a tus clientes",
          description: ""
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Interactuá en tiempo real con tus metricas",
          description: ""
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
          title: "Cobranza Garantizada",
          description: "Seguridad bancaria para todas las transacciones"
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Pago con QR",
          description: "Disponible en todos los dispositivos moviles"
        },
        {
          icon: <CreditCard className="w-6 h-6" />,
          title: "Cobra con tu QR UX DUAL",
          description: "Empezá a aceptar pagos UX Dual sin costos iniciales"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Agendá una llamada con nuestro equipo",
          description: "Enviá la información de tu negocio para revisión de asociación"
        },
        {
          step: "2",
          title: "Damos de alta tu comercio",
          description: "Recibí aprobación e instrucciones de integración"
        },
        {
          step: "3",
          title: "Recibi tu QR Ux Dual",
          description: "Agregá la opción de pago UX Dual a tu proceso de checkout"
        },
        {
          step: "4",
          title: "Ya sos Comercio UX",
          description: "Recibí nuevos clientes y mirá crecer tus ventas"
        }
      ],
      ctaTitle: "Unite a nuestra red de comerciantes que crecen con UX Dual",
      ctaDescription: "Agenda una llamada con nuestro equipo y empezá a crecer con UX Dual",
      ctaButton: "Quiero ser Comercio UX"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen bg-[#1C304F] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Text */}
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-7l font-bold text-white leading-tight">
                {currentContent.heroTitle}
              </h1>
            </div>

            {/* Video Section */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div style={{padding:"56.25% 0 0 0",position:"relative"}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1131705626?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&muted=0&autoplay=1" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}} 
                    title="Comerciante"
                    loading="lazy"
                    className="rounded-2xl">
                  </iframe>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-ux-green hover:bg-ux-green-light text-white px-12 py-6 text-lg rounded-full font-semibold transition-colors duration-300"
                onClick={() => window.open("https://calendly.com/santicesar", "_blank")}
              >
                {currentContent.ctaButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C304F]">
              {language === 'en' ? 'Benefits of selling with UX Dual' : 'Beneficios de vender con UX Dual'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Join the future of commerce and customer engagement' 
                : 'Unite al futuro de los comercios y fidelizacion de clientes'}
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C304F]">
              {language === 'en' ? 'Platform Features' : 'Características de la Plataforma'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Everything you need to know about UX Dual' 
                : 'Todo lo que necesitás saber sobre UX Dual'}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C304F]">
              {language === 'en' ? 'How to Get Started' : 'Unite a nuestra red de comercios'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Follow these steps to join our merchant network' 
                : 'Seguí estos pasos para unirte a nuestra red de comercios'}
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

      {/* Final CTA Section */}
      <section className="py-24 bg-[#1C304F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {currentContent.ctaTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {currentContent.ctaDescription}
            </p>
            <Button
              size="lg"
              className="bg-ux-green hover:bg-ux-green-light text-white px-12 py-6 text-lg rounded-full font-semibold transition-colors duration-300"
              onClick={() => window.open("https://calendly.com/santicesar", "_blank")}
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

export default Merchant;
