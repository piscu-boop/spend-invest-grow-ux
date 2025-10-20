import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  onOpenBeta: () => void; // Optional prop to open beta modal
}

const Navigation: React.FC<NavigationProps> = ({onOpenBeta}) => {
  const { language } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const navItems = language === 'en' ? [
    { label: "About UX", href: isHomePage ? "#hero" : "/#hero" },
    { label: "FAQ", href: "/faq" },
    { label: "Team", href: "/team" },
    // { label: "Features", href: "#features" },
    // { label: "Security", href: "#security" },
    // { label: "Support", href: "#support" },
  ] : [
    { label: "Acerca de UX", href: isHomePage ? "#hero" : "/#hero" },
    { label: "FAQ", href: "/faq" },
    { label: "Team", href: "/team" },
    // { label: "Características", href: "#features" },
    // { label: "Seguridad", href: "#security" },
    // { label: "Soporte", href: "#support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E1B38] border-b border-ux-green/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
          <img
          src="lovable-uploads/logo-capital.png" // Reemplaza con la ruta de tu imagen
          alt="UX Dual Logo"
          className="h-8" // Ajusta el tamaño según sea necesario
          />
          </div>

          {/* Desktop Navigation alineado a la derecha pero con espacio */}
          <div className="hidden md:flex items-center space-x-8" style={{ marginRight: "60px", marginLeft: "auto" }}>
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-ux-green transition-colors duration-300"
                >
                  {item.label}
                </a>
              ) : item.href.startsWith('/#') ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-300 hover:text-ux-green transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-300 hover:text-ux-green transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Language Toggle and CTA */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Button
              className="border-[#0E1B38] bg-[#0E1B38] text-white hover:bg-blue-900/70 hover:text-ux-green px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={onOpenBeta}
            >
              <a href="#join-now">
              {language === 'en' ? 'Join Now' : 'Únete Ahora'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
