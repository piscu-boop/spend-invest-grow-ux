import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { memo, useState } from "react";

interface NavigationProps {
  onOpenBeta?: () => void; // Optional prop to open beta modal
}

const Navigation: React.FC<NavigationProps> = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = location.pathname === '/';
  
  const navItems = language === 'en' ? [
    { label: "About UX", href: isHomePage ? "#hero" : "/#hero" },
    { label: "Press", href: "/press" },
    { label: "FAQ", href: "/faq" },
    { label: "Team", href: "/team" },
  ] : [
    { label: "Acerca de UX", href: isHomePage ? "#hero" : "/#hero" },
    { label: "Prensa", href: "/press" },
    { label: "FAQ", href: "/faq" },
    { label: "Team", href: "/team" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E1B38] border-b border-ux-green/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-2">
          <img
          src="lovable-uploads/logo-capital.png" // Reemplaza con la ruta de tu imagen
          alt="UX Dual Logo"
          className="h-7 md:h-8" // Ajusta el tamaño según sea necesario
          />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto pr-2">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-ux-green transition-colors duration-300"
                >
                  {item.label}
                </a>
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

          {/* Language Toggle: mobile centered, desktop aligned to the right */}
          <div className="absolute right-16 flex justify-end md:static md:flex md:justify-start md:ml-6">
            <div className="flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/15 backdrop-blur">
            <LanguageToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3 ml-auto">
            <button
              aria-label="Abrir menú"
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-full bg-white/10 border border-white/20 text-white px-3 py-2 text-lg font-semibold hover:bg-white/15 transition-colors"
            >
              ⋯
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur">
            {navItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block w-full text-left text-gray-100 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block w-full text-left text-gray-100 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Navigation);
