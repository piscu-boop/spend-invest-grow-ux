import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { Factory, TrendingUp, Shield, Smartphone, CreditCard, Target, Handshake, Store } from "lucide-react";

interface ManufacturerProps {
  onOpenBeta: () => void;
}

const Manufacturer: React.FC<ManufacturerProps> = ({ onOpenBeta }) => {
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
      heroTitle: "Empower Your Value Chain Through Financial Inclusion",
      benefits: [
        { icon: <Target className="w-7 h-7" />, title: "Automate Collections" },
        { icon: <Handshake className="w-7 h-7" />, title: "Promote Financial Inclusion" },
        { icon: <TrendingUp className="w-7 h-7" />, title: "Boost Sales in Your Value Chain" }
      ],
      features: [
        { icon: <Store className="w-5 h-5" />, title: "Easy Integration", description: "Simple setup process with minimal technical requirements" },
        { icon: <Shield className="w-5 h-5" />, title: "Secure Payments", description: "Bank-level security for all transactions" },
        { icon: <Smartphone className="w-5 h-5" />, title: "QR Payment", description: "Available in every mobile device" },
        { icon: <CreditCard className="w-5 h-5" />, title: "No Setup Fees", description: "Start accepting UX Dual payments with no upfront costs" }
      ],
      howItWorks: [
        { step: "1", title: "Schedule a call with our team", description: "Send your business information for partnership review" },
        { step: "2", title: "We onboard your business", description: "Receive approval and integration instructions" },
        { step: "3", title: "Get your UX Dual QR", description: "Add the UX Dual payment option to your checkout process" },
        { step: "4", title: "You're now a UX Manufacturer", description: "Receive new customers and watch your sales grow" }
      ],
      benefitsTitle: "Why Partner with UX Dual?",
      benefitsSubtitle: "Transform your manufacturing business with investment-powered demand",
      featuresTitle: "Manufacturing Solutions",
      featuresSubtitle: "Comprehensive tools for manufacturing success in the investment economy",
      howItWorksTitle: "How to Get Started",
      howItWorksSubtitle: "Join our manufacturing network and start scaling your business",
      ctaTitle: "Join the future of manufacturing with investment rewards",
      ctaDescription: "Schedule a call with our team and start scaling with UX Dual",
      ctaButton: "Join"
    },
    es: {
      heroTitle: "Promové la Inclusión Financiera en tu cadena de valor",
      benefits: [
        { icon: <Target className="w-7 h-7" />, title: "Automatizar Cobranzas" },
        { icon: <TrendingUp className="w-7 h-7" />, title: "Promover la Inclusion Financiera" },
        { icon: <Handshake className="w-7 h-7" />, title: "Impulsar las Ventas en tu cadena de valor" }
      ],
      features: [
        { icon: <Store className="w-5 h-5" />, title: "Fácil Integración", description: "Proceso de configuración simple con requisitos técnicos mínimos" },
        { icon: <Shield className="w-5 h-5" />, title: "Cobranza Garantizada", description: "Seguridad bancaria para todas las transacciones" },
        { icon: <Smartphone className="w-5 h-5" />, title: "Pago con QR", description: "Disponible en todos los dispositivos moviles" },
        { icon: <CreditCard className="w-5 h-5" />, title: "Cobra con tu QR UX DUAL", description: "Empezá a aceptar pagos UX Dual sin costos iniciales" }
      ],
      howItWorks: [
        { step: "1", title: "Agendá una llamada con nuestro equipo", description: "Enviá la información de tu negocio para revisión de asociación" },
        { step: "2", title: "Damos de alta tu Negocio", description: "Recibí aprobación e instrucciones de integración" },
        { step: "3", title: "Recibi tu QR Ux Dual", description: "Agregá la opción de pago UX Dual a tu proceso de checkout" },
        { step: "4", title: "Ya sos Fabricante UX", description: "Recibí nuevos clientes y mirá tus ventas crecer" }
      ],
      benefitsTitle: "¿Por qué asociarte con UX Dual?",
      benefitsSubtitle: "Transformá tu negocio de manufactura con demanda potenciada por inversión",
      featuresTitle: "Soluciones de Manufactura",
      featuresSubtitle: "Herramientas integrales para el éxito manufacturero en la economía de inversión",
      howItWorksTitle: "Cómo Empezar",
      howItWorksSubtitle: "Unite a nuestra red de manufactura y empezá a escalar tu negocio",
      ctaTitle: "Unite al futuro de la manufactura con recompensas de inversión",
      ctaDescription: "Agendá una llamada con nuestro equipo y empezá a escalar con UX Dual",
      ctaButton: "Únete"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden pt-20"
        style={{ background: "var(--color-bg-dark)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(77,240,172,0.10)" }} />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-2xl" style={{ background: "rgba(77,240,172,0.05)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
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
                  {language === "en" ? "For Manufacturers" : "Para Fabricantes"}
                </span>
                <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: 0 }}>
                  {currentContent.heroTitle}
                </h1>
                <button
                  onClick={() => window.open("https://calendly.com/santicesar", "_blank")}
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
                    src="https://player.vimeo.com/video/1131705368?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&muted=0&autoplay=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "16px" }}
                    title="Fabricante"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
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

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentContent.benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center rounded-2xl p-8 transition-all duration-200 hover:scale-[1.02]"
                style={{ border: "1px solid #E5E5E5", background: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E5E5")}
              >
                <div className="mx-auto mb-4 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "rgba(77,240,172,0.12)", color: "var(--color-accent)" }}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ background: "#F5F5F7" }}>
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              {currentContent.featuresTitle}
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              {currentContent.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 bg-white transition-all duration-200 hover:scale-[1.02]"
                style={{ border: "1px solid #E5E5E5" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E5E5")}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(77,240,172,0.12)", color: "var(--color-accent)" }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-500 text-sm">{feature.description}</p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
                >
                  {step.step}
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
              onClick={() => window.open("https://calendly.com/santicesar", "_blank")}
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

export default Manufacturer;
