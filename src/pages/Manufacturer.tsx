 import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, TrendingUp, Shield, Smartphone, CreditCard, BarChart3, Package, Handshake, Target, Zap, Store } from "lucide-react";

interface ManufacturerProps {
  onOpenBeta: () => void;
}

const Manufacturer: React.FC<ManufacturerProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "For Manufacturers",
      subtitle: "",
      description: "",
      heroTitle: "Empower Your Value Chain Through Financial Inclusion",
      heroSubtitle: "",
      benefits: [
        {
          icon: <Target className="w-8 h-8" />,
          title: "Automate Collections"
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Promote Financial Inclusion"
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Boost Sales in Your Value Chain"
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
      ctaTitle: "Join the future of manufacturing with investment rewards",
      ctaButton: "Apply as Manufacturer"
    },
    es: {
      title: "Para Fabricantes",
      subtitle: "Escalá tu producción con compras respaldadas por inversión",
      description: "",
      heroTitle: "Promové la Inclusión Financiera en tu cadena de valor",
      heroSubtitle: "",
      benefits: [
        {
          icon: <Target className="w-8 h-8" />,
          title: "Automatizar Cobranzas",
          description: ""
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Promover la Inclusion Financiera",
          description: ""
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Impulsar las Ventas en tu cadena de valor",
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
      ctaTitle: "Unite al futuro de la manufactura con recompensas de inversión",
      ctaButton: "Aplicar como Fabricante"
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
                ? 'Transform your manufacturing business with investment-powered demand' 
                : 'Transformá tu negocio de manufactura con demanda potenciada por inversión'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
              {language === 'en' ? 'Manufacturing Solutions' : 'Soluciones de Manufactura'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Comprehensive tools for manufacturing success in the investment economy' 
                : 'Herramientas integrales para el éxito manufacturero en la economía de inversión'}
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
                ? 'Join our manufacturing network and start scaling your business' 
                : 'Unite a nuestra red de manufactura y empezá a escalar tu negocio'}
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

export default Manufacturer;
