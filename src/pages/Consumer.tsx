import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
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
    description: "Distribuidora de alimentos. Compras rápidas y conveniencia."
  },
  {
    name: "Golden Pack",
    category: "Gift & Experiences",
    image: "/lovable-uploads/golden-pack.jpeg",
    accent: "#d6b04a",
    description: "Packs de experiencias gastronómicas, aventura y más."
  },
  {
    name: "AutoLink",
    category: "Tienda de piezas de automóviles",
    image: "/lovable-uploads/autolink.jpg",
    accent: "#f97316",
    description: "Repuestos y piezas para tu auto."
  }
];

interface ConsumerProps {
  onOpenBeta: () => void;
}


const Consumer: React.FC<ConsumerProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Prevent browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Function to scroll to element with robust retry logic
    const scrollToElement = (selector: string, retries = 30, delay = 100) => {
      const element = document.querySelector(selector);

      if (element) {
        // Wait for next frame to ensure layout is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = Math.max(0, elementPosition - 80); // Offset for fixed navigation

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          });
        });
        return true;
      } else if (retries > 0) {
        // Retry with exponential backoff
        setTimeout(() => scrollToElement(selector, retries - 1, Math.min(delay * 1.15, 400)), delay);
        return false;
      }
      return false;
    };

    // Handle hash navigation
    const handleHashNavigation = () => {
      const hash = window.location.hash;

      if (!hash) {
        // No hash, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Prevent browser's default scroll to hash
      window.scrollTo({ top: 0, behavior: 'auto' });

      const attemptScroll = () => {
        if (hash === "#hero") {
          scrollToElement("#hero");
        } else if (hash === "#partners") {
          scrollToElement("#partners");
        } else if (hash) {
          scrollToElement(hash);
        }
      };

      // Try multiple times with increasing delays to handle production builds
      attemptScroll();
      const timeouts = [
        setTimeout(attemptScroll, 100),
        setTimeout(attemptScroll, 300),
        setTimeout(attemptScroll, 600),
        setTimeout(attemptScroll, 1000),
        setTimeout(attemptScroll, 1500),
        setTimeout(attemptScroll, 2500),
      ];

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    };

    // Handle initial load and hash changes
    const cleanup = handleHashNavigation();

    // Also listen for hash changes
    const handleHashChange = () => {
      handleHashNavigation();
    };

    window.addEventListener('hashchange', handleHashChange);

    // Also try after window load (important for production)
    const handleLoad = () => {
      handleHashNavigation();
    };

    if (document.readyState === 'complete') {
      setTimeout(handleHashNavigation, 100);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      cleanup?.();
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', handleLoad);
    };
  }, [location.hash, location.pathname]);

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
      storesSubtitle: "Coming soon you'll be able to see and enable our partner stores.",
      storesSubtitleGreen: "Coming soon",
      storesSubtitleRest: " you'll be able to see and enable our partner stores.",
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
      ctaButton: "Join",
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
      storesTitle: "Red de comercios UX, donde comprar también es invertir",
      storesSubtitle: "Próximamente podrás ver todos los comercios adheridos.",
      storesSubtitleGreen: "Próximamente",
      storesSubtitleRest: " podrás ver todos los comercios adheridos.",
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
      ctaDescription: "Unite a nuestra lista de espera y no te pierdas de nuestro lanzamiento.",
      ctaButton: "Únete",
      benefitsTitle: "¿Por qué elegir UX Dual?",
      benefitsSubtitle: "Experimentá el futuro de comprar e invertir combinados"
    }
  }), []);

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{
          background: "var(--color-bg-dark)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "80px",
          boxSizing: "border-box",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(77,240,172,0.10)" }} />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-2xl" style={{ background: "rgba(77,240,172,0.05)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="max-w-6xl mx-auto">
            {/* 2-col layout desktop / stack mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Columna izquierda: badge + título + CTA */}
              <div className="flex flex-col items-start gap-6">
                {/* Badge */}
                <span style={{
                  background: "rgba(77,240,172,0.1)",
                  border: "1px solid rgba(77,240,172,0.25)",
                  color: "#4DF0AC",
                  borderRadius: "20px",
                  padding: "5px 14px",
                  fontSize: "12px",
                  fontWeight: 500,
                  display: "inline-block",
                }}>
                  {language === "en" ? "For Consumers" : "Para Consumidores"}
                </span>
                <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: 0 }}>
                  {currentContent.heroTitle}
                </h1>
                <button
                  onClick={onOpenBeta}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[24px] font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
                >
                  {currentContent.ctaButton}
                </button>
              </div>

              {/* Columna derecha: video */}
              <div style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://player.vimeo.com/video/1131704779?title=0&byline=0&portrait=0&badge=0&autopause=1&player_id=0&app_id=58479&muted=0&autoplay=1"
                    frameBorder="0"
                    allow="fullscreen; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "16px" }}
                    title="Consumidores UX"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Stores Section */}
      <section
        className="relative py-20 scroll-mt-20"
        id="partners"
        style={{ background: "var(--color-bg-dark)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(77,240,172,0.10)" }} />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-2xl" style={{ background: "rgba(77,240,172,0.05)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-accent)" }}>
              {currentContent.storesTopline}
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">
              {currentContent.storesTitle}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              <span className="font-medium" style={{ color: "var(--color-accent)" }}>{currentContent.storesSubtitleGreen}</span>
              {currentContent.storesSubtitleRest}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
              {PARTNER_STORES.map((store) => (
                <div
                  key={store.name}
                  className="group relative rounded-xl aspect-[4/5] shadow-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={store.image}
                      alt=""
                      className="max-h-28 w-auto object-contain blur-lg scale-110 select-none pointer-events-none"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute top-2 left-2 z-30">
                    <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-white/90 text-[#0f1f38] shadow-sm">
                      {store.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl min-h-[280px]"
              style={{ background: "rgba(41,70,118,0.70)", backdropFilter: "blur(4px)" }}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              {currentContent.benefitsTitle}
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              {currentContent.benefitsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {currentContent.benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02]"
                style={{ border: "1px solid #E5E5E5", background: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E5E5")}
              >
                <div className="mx-auto mb-4 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(77,240,172,0.12)", color: "var(--color-accent)" }}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20" style={{ background: "#F5F5F7" }}>
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              {currentContent.whyDifferentTitle}
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              {currentContent.whyDifferentSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentContent.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 bg-white transition-all duration-200 hover:scale-[1.02]"
                style={{ border: "1px solid #E5E5E5" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E5E5")}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(77,240,172,0.12)" }}>
                  {(feature.title === "Ingreso Pasivo" || feature.title === "Passive Income") && (
                    <svg className="w-6 h-6" style={{ fill: "var(--color-accent)" }} viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  )}
                  {(feature.title === "Activación Instantánea" || feature.title === "Instant Activation") && (
                    <svg className="w-6 h-6" style={{ fill: "var(--color-accent)" }} viewBox="0 0 24 24">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
                    </svg>
                  )}
                  {(feature.title === "Tu dinero, tu inversión." || feature.title === "Smart Allocation") && (
                    <svg className="w-6 h-6" style={{ fill: "var(--color-accent)" }} viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              {currentContent.howItWorksTitle}
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              {currentContent.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {currentContent.howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div
                    className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
                  >
                    {step.step === "1" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                    )}
                    {step.step === "2" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                      </svg>
                    )}
                    {step.step === "3" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
                      </svg>
                    )}
                    {step.step === "4" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 9.2H7V19H5V9.2ZM10.6 5H12.4V19H10.6V5ZM16.2 13H18V19H16.2V13ZM21.8 2H23.6V19H21.8V2Z"/>
                      </svg>
                    )}
                  </div>
                  {index < currentContent.howItWorks.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-8 left-[60%] w-full h-px"
                      style={{ background: "linear-gradient(to right, rgba(77,240,172,0.4), transparent)" }}
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--color-bg-dark)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(77,240,172,0.10)" }} />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(77,200,240,0.06)" }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              {currentContent.ctaTitle}
            </h2>
            <p className="text-xl" style={{ color: "var(--color-text-muted)" }}>
              {currentContent.ctaDescription}
            </p>
            <button
              onClick={onOpenBeta}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[24px] font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
            >
              {currentContent.ctaButton}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consumer;
