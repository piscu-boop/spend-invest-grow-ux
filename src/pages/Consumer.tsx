import { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, Smartphone, CreditCard } from "lucide-react";

type PartnerStore = {
  name: string;
  category: string;
  image: string;
  accent: string;
  description: string;
};

const PARTNER_STORES: PartnerStore[] = [
  {
    name: "Diario",
    category: "Café & deli",
    image: "/lovable-uploads/diario.jpeg",
    accent: "#fbbf24",
    description: "Café de especialidad y snacks diarios."
  },
  {
    name: "Cachavacha Jugueterías",
    category: "Juguetería",
    image: "/lovable-uploads/cachavacha.png",
    accent: "#facc15",
    description: "Juguetes y juegos para todas las edades."
  },
  {
    name: "Sweet Sweet Way",
    category: "Golosinas",
    image: "/lovable-uploads/Sweet.png",
    accent: "#0f172a",
    description: "Candy bar, chocolates y regalos dulces."
  },
  {
    name: "Bucor Nueva Córdoba",
    category: "Natación & Gym",
    image: "/lovable-uploads/bucor.png",
    accent: "#0d47a1",
    description: "Piscina climatizada y entrenamiento integral."
  },
  {
    name: "Casa de Pedro",
    category: "Ropa de Cama",
    image: "/lovable-uploads/casa-de-pedro.jpg",
    accent: "#5aa4e8",
    description: "Blanquería con más de 80 años de trayectoria."
  },
  {
    name: "Autoservicios RC",
    category: "Retail",
    image: "/lovable-uploads/autoservicios-rc.jpeg",
    accent: "#0b6623",
    description: "Compras rápidas y conveniencia."
  },
  {
    name: "Golden Pack",
    category: "Gift & Experiences",
    image: "/lovable-uploads/golden-pack.jpeg",
    accent: "#d6b04a",
    description: "Packs de experiencias gastronómicas, aventura y bienestar."
  }
];

interface ConsumerProps {
  onOpenBeta: () => void;
}


const Consumer: React.FC<ConsumerProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const [storeSearch, setStoreSearch] = useState("");
  
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
  
  const content = useMemo(() => ({
    en: {
      heroTitle: "Your everyday purchases, now generating returns",
      watchVideo: "Watch How It Works",
      benefits: [
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Daily Returns",
          description: "Your purchases start generating returns from day one with compound interest"
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "Bank-Level Security",
          description: "Your money is protected with institutional-grade security measures"
        },
        {
          icon: <Smartphone className="w-8 h-8" />,
          title: "Easy to Use",
          description: "Simple app interface designed for everyone, zero investment knowledge required"
        },
        {
          icon: <CreditCard className="w-8 h-8" />,
          title: "No Extra Fees",
          description: "Pay the same price you always do, get investment returns on top"
        }
      ],
      storesTopline: "Where can you shop?",
      storesTitle: "Our partner stores",
      storesSubtitle: "Discover the brands already connected to UX Dual and start earning while you shop.",
      storesSearchPlaceholder: "What would you like to buy?",
      storesSearchButton: "Search",
      storesViewMore: "See more stores",
      howItWorksTitle: "How It Works",
      howItWorksSubtitle: "Get started in just a few simple steps",
      howItWorks: [
        {
          step: "1",
          icon: "Download",
          title: "Download the App",
          description: "Get UX Dual from your app store and create your account in minutes"
        },
        {
          step: "2",
          icon: "ShoppingBag",
          title: "Shop at Partners",
          description: "Find and shop at our growing network of partnered businesses"
        },
        {
          step: "3",
          icon: "PieChart",
          title: "Auto Investment",
          description: "Your purchase amount is automatically invested in diverse portfolios"
        },
        {
          step: "4",
          icon: "BarChart3",
          title: "Track Returns",
          description: "Monitor your daily returns and compound growth in real-time"
        }
      ],
      whyDifferentTitle: "Why We're Different",
      whyDifferentSubtitle: "Traditional shopping vs UX Dual experience",
      features: [
        {
          title: "Passive Income",
          description: "Turn everyday spending into an investment portfolio"
        },
        {
          title: "Instant Activation",
          description: "Your money starts working for you immediately after purchase"
        },
        {
          title: "Smart Allocation",
          description: "AI-powered portfolio optimization for maximum returns"
        }
      ],
      ctaTitle: "Start earning returns on your purchases today",
      ctaDescription: "Join our waitlist and don't miss our launch.",
      ctaButton: "Join as Consumer",
      benefitsTitle: "Why Choose UX Dual?",
      benefitsSubtitle: "Experience the future of shopping and investing combined"
    },
    es: {
      heroTitle: "Tus compras diarias, ahora generando rendimientos",
      watchVideo: "Mirá Cómo Funciona",
      benefits: [
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Rendimientos Diarios",
          description: "Tus compras empiezan a generar rendimientos desde el día uno con interés compuesto"
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "Seguridad Bancaria",
          description: "Tu dinero está protegido con medidas de seguridad de nivel institucional"
        },
        {
          icon: <Smartphone className="w-8 h-8" />,
          title: "Fácil de Usar",
          description: "Interfaz simple diseñada para todos, sin conocimientos de inversión requeridos"
        },
        {
          icon: <CreditCard className="w-8 h-8" />,
          title: "Sin Costos Extra",
          description: "Pagás el mismo precio de siempre, obtenés rendimientos de inversión encima"
        }
      ],
      storesTopline: "¿Dónde podés comprar?",
      storesTitle: "Nuestros comercios",
      storesSubtitle: "Descubrí las marcas adheridas ya conectadas con UX Dual y generá rendimiento con cada compra.",
      storesSearchPlaceholder: "¿Qué te gustaría comprar?",
      storesSearchButton: "Buscar",
      storesViewMore: "Ver más comercios",
      howItWorksTitle: "Cómo Funciona",
      howItWorksSubtitle: "Empezá en solo unos simples pasos",
      howItWorks: [
        {
          step: "1",
          icon: "Download",
          title: "Descargá la App",
          description: "Obtené UX Dual desde tu tienda de apps y creá tu cuenta en minutos"
        },
        {
          step: "2",
          icon: "ShoppingBag",
          title: "Comprá en Socios",
          description: "Encontrá y comprá en nuestra red creciente de comercios asociados"
        },
        {
          step: "3",
          icon: "PieChart",
          title: "Inversión Automática",
          description: "El monto de tu compra se invierte automáticamente en carteras diversificadas"
        },
        {
          step: "4",
          icon: "BarChart3",
          title: "Seguí Rendimientos",
          description: "Monitoreá tus rendimientos diarios y crecimiento compuesto en tiempo real"
        }
      ],
      whyDifferentTitle: "Por qué somos diferentes",
      whyDifferentSubtitle: "Compras tradicionales vs experiencia UX Dual",
      features: [
        {
          title: "Ingreso Pasivo",
          description: "Convertí tus gastos diarios en una cartera de inversión"
        },
        {
          title: "Activación Instantánea",
          description: "Tu dinero empieza a trabajar para vos inmediatamente después de la compra"
        },
        {
          title: "Tu dinero, tu inversión.",
          description: "Rendimientos automaticos diarios, en tu cuenta."
        }
      ],
      ctaTitle: "Empezá a generar rendimientos en tus compras hoy",
      ctaDescription: "Únete a nuestra lista de espera y no te pierdas de nuestro lanzamiento.",
      ctaButton: "Únete como Consumidor",
      benefitsTitle: "¿Por qué elegir UX Dual?",
      benefitsSubtitle: "Experimentá el futuro de comprar e invertir combinados"
    }
  }), []);

  const filteredStores = useMemo(() => {
    const term = storeSearch.toLowerCase().trim();
    if (!term) return PARTNER_STORES;

    return PARTNER_STORES.filter(
      (store) =>
        store.name.toLowerCase().includes(term) ||
        store.category.toLowerCase().includes(term) ||
        store.description.toLowerCase().includes(term)
    );
  }, [storeSearch]);

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation onOpenBeta={onOpenBeta} />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen bg-[#1C304F] flex items-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl"></div>
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
                    src="https://player.vimeo.com/video/1131704779?title=0&byline=0&portrait=0&badge=0&autopause=1&player_id=0&app_id=58479&muted=0&autoplay=1" 
                    frameBorder="0" 
                    allow="fullscreen; picture-in-picture" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}} 
                    title="Consumidores UX"
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
                onClick={onOpenBeta}
              >
                {currentContent.ctaButton}
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* Partner Stores Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#0f1f38] via-[#112544] to-white" id="partners">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(111,255,216,0.08),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.06),_transparent_35%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ux-green">
              {currentContent.storesTopline}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {currentContent.storesTitle}
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              {currentContent.storesSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/40 rounded-full flex items-center gap-3 px-4 py-3">
              <div className="flex-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ux-green/20 flex items-center justify-center text-ux-green font-semibold">
                  🔍
                </div>
                <input
                  id="store-search"
                  type="text"
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  placeholder={currentContent.storesSearchPlaceholder}
                  className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                />
              </div>
              <Button
                type="button"
                className="bg-ux-green hover:bg-ux-green-light text-[#0f1f38] font-semibold px-6 rounded-full"
                onClick={() => {
                  const input = document.getElementById("store-search");
                  if (input instanceof HTMLInputElement) {
                    input.focus();
                  }
                }}
              >
                {currentContent.storesSearchButton}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <div
                key={store.name}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl border border-white/20 bg-transparent flex items-center justify-center"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="flex items-center justify-center p-6 w-full h-full">
                  {store.image ? (
                    <img
                      src={store.image}
                      alt={store.name}
                      className="max-h-40 w-auto object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-white font-semibold text-center">{store.name}</span>
                  )}
                </div>
                <div className="absolute top-4 left-4 z-30">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/85 text-[#0f1f38] shadow-sm">
                    {store.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 space-y-1 z-30">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">{store.name}</h3>
                  <p className="text-sm text-gray-100/85">{store.description}</p>
                </div>
              </div>
            ))}

            {filteredStores.length === 0 && (
              <div className="col-span-full text-center bg-white/80 backdrop-blur border border-dashed border-ux-green/50 rounded-2xl p-8 text-[#1C304F]">
                {language === "es"
                  ? "No encontramos comercios con ese nombre. Probá otra búsqueda."
                  : "No stores found for that search. Try another keyword."}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C304F]">
              {currentContent.benefitsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentContent.benefitsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {currentContent.benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="text-center border-2 hover:border-ux-green/50 transition-colors duration-300 hover:shadow-lg bg-white"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 text-ux-green">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl text-[#1C304F]">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C304F]">
              {currentContent.whyDifferentTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentContent.whyDifferentSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {currentContent.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-ux-green to-ux-green-light rounded-xl flex items-center justify-center text-white mb-6">
                  {(feature.title === "Ingreso Pasivo" || feature.title === "Passive Income") && (
                    <svg className="w-6 h-6"  viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  )}
                  {(feature.title === "Activación Instantánea" || feature.title === "Instant Activation") && (
                    <svg className="w-6 h-6"  viewBox="0 0 24 24">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
                    </svg>
                  )}
                  {(feature.title === "Tu dinero, tu inversión." || feature.title === "Smart Allocation") && (
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#1C304F] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C304F]">
              {currentContent.howItWorksTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentContent.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {currentContent.howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-ux-green to-ux-green-light text-white rounded-2xl flex items-center justify-center shadow-lg">
                    {step.step === "1" && (
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                    )}
                    {step.step === "2" && (
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                      </svg>
                    )}
                    {step.step === "3" && (
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
                      </svg>
                    )}
                    {step.step === "4" && (
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M5 9.2H7V19H5V9.2ZM10.6 5H12.4V19H10.6V5ZM16.2 13H18V19H16.2V13ZM21.8 2H23.6V19H21.8V2Z"/>
                      </svg>
                    )}
                  </div>
                  {index < currentContent.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-ux-green/50 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#1C304F] mb-4">
                  {step.title}
                </h3>
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
