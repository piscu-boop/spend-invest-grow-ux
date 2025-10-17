import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TrustedBySection from "@/components/TrustedBySection";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, TrendingUp, Shield, Smartphone, CreditCard, BarChart3, Package, Handshake, Target, Zap } from "lucide-react";

interface ManufacturerProps {
  onOpenBeta: () => void;
}

const Manufacturer: React.FC<ManufacturerProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "For Manufacturers",
      subtitle: "Scale your production with investment-backed purchases",
      description: "Connect with merchants and consumers in our ecosystem to increase demand for your products through investment-powered purchasing.",
      heroTitle: "Expand your market reach with investment rewards",
      heroSubtitle: "UX Dual helps manufacturers increase sales and market penetration",
      benefits: [
        {
          icon: <Target className="w-8 h-8" />,
          title: "Market Expansion",
          description: "Reach investment-conscious consumers through our merchant network"
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Increased Demand",
          description: "Higher purchase volumes driven by investment incentives"
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Strategic Partnerships",
          description: "Build strong relationships with merchants and distributors"
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Market Analytics",
          description: "Access detailed insights about consumer purchasing patterns"
        }
      ],
      features: [
        {
          icon: <Factory className="w-6 h-6" />,
          title: "Production Integration",
          description: "Seamlessly integrate with existing production and supply chain systems"
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Quality Assurance",
          description: "Maintain product quality standards with our verification system"
        },
        {
          icon: <Package className="w-6 h-6" />,
          title: "Inventory Management",
          description: "Optimize inventory levels based on investment-driven demand patterns"
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Fast Onboarding",
          description: "Quick setup process to start benefiting from the ecosystem"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Apply for Partnership",
          description: "Submit your manufacturing details and product portfolio"
        },
        {
          step: "2",
          title: "Get Verified",
          description: "Complete our quality and compliance verification process"
        },
        {
          step: "3",
          title: "Connect with Merchants",
          description: "Partner with merchants in our network to sell your products"
        },
        {
          step: "4",
          title: "Scale Production",
          description: "Increase production based on investment-driven demand"
        }
      ],
      ctaTitle: "Join the future of manufacturing with investment rewards",
      ctaButton: "Apply as Manufacturer"
    },
    es: {
      title: "Para Fabricantes",
      subtitle: "Escalá tu producción con compras respaldadas por inversión",
      description: "Conectate con comerciantes y consumidores en nuestro ecosistema para aumentar la demanda de tus productos a través de compras potenciadas por inversión.",
      heroTitle: "Expandí tu alcance de mercado con recompensas de inversión",
      heroSubtitle: "UX Dual ayuda a los fabricantes a aumentar ventas y penetración de mercado",
      benefits: [
        {
          icon: <Target className="w-8 h-8" />,
          title: "Expansión de Mercado",
          description: "Alcanzá consumidores conscientes de la inversión a través de nuestra red de comerciantes"
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Mayor Demanda",
          description: "Volúmenes de compra más altos impulsados por incentivos de inversión"
        },
        {
          icon: <Handshake className="w-8 h-8" />,
          title: "Asociaciones Estratégicas",
          description: "Construí relaciones fuertes con comerciantes y distribuidores"
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Analytics de Mercado",
          description: "Accedé a insights detallados sobre patrones de compra de consumidores"
        }
      ],
      features: [
        {
          icon: <Factory className="w-6 h-6" />,
          title: "Integración de Producción",
          description: "Integráte perfectamente con sistemas de producción y cadena de suministro existentes"
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Aseguramiento de Calidad",
          description: "Mantené estándares de calidad de productos con nuestro sistema de verificación"
        },
        {
          icon: <Package className="w-6 h-6" />,
          title: "Gestión de Inventario",
          description: "Optimizá niveles de inventario basados en patrones de demanda impulsados por inversión"
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Onboarding Rápido",
          description: "Proceso de configuración rápido para empezar a beneficiarte del ecosistema"
        }
      ],
      howItWorks: [
        {
          step: "1",
          title: "Aplicá para Asociación",
          description: "Enviá los detalles de tu fabricación y portafolio de productos"
        },
        {
          step: "2",
          title: "Obtené Verificación",
          description: "Completá nuestro proceso de verificación de calidad y cumplimiento"
        },
        {
          step: "3",
          title: "Conectate con Comerciantes",
          description: "Asociate con comerciantes en nuestra red para vender tus productos"
        },
        {
          step: "4",
          title: "Escalá Producción",
          description: "Incrementá producción basada en demanda impulsada por inversión"
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

      <TrustedBySection />
      <Footer />
    </div>
  );
};

export default Manufacturer;
