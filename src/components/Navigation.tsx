import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { memo, useState, useEffect } from "react";

interface NavigationProps {
  onOpenBeta?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = language === 'en' ? [
    { label: "About UX",    href: isHomePage ? "#hero" : "/#hero" },
    { label: "Simulator",   href: "/simulador" },
    { label: "Press",       href: "/press" },
    { label: "FAQ",         href: "/faq" },
    { label: "Team",        href: "/team" },
  ] : [
    { label: "Acerca de UX", href: isHomePage ? "#hero" : "/#hero" },
    { label: "Simulador",    href: "/simulador" },
    { label: "Prensa",       href: "/press" },
    { label: "FAQ",          href: "/faq" },
    { label: "Team",         href: "/team" },
  ];

  const ctaLabel = language === 'en' ? 'Join' : 'Únete';

  const LinkItem = ({ label, href, mobile = false }: { label: string; href: string; mobile?: boolean }) => {
    const cls = mobile
      ? "block w-full text-left text-white/80 hover:text-white px-4 py-3 rounded-xl hover:bg-white/8 transition-colors duration-200 text-base font-medium"
      : "text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium";

    if (href.startsWith("#") || href.startsWith("/#")) {
      return <a href={href} className={cls} onClick={() => setMobileOpen(false)}>{label}</a>;
    }
    return <Link to={href} className={cls} onClick={() => setMobileOpen(false)}>{label}</Link>;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg-dark)] shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Navegación principal">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/lovable-uploads/logo-capital.png"
              alt="UX Capital"
              className="h-7 md:h-8"
            />
          </Link>

          {/* Links desktop — centrados */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <li key={item.label}>
                <LinkItem label={item.label} href={item.href} />
              </li>
            ))}
          </ul>

          {/* Derecha: LanguageToggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/15 backdrop-blur">
              <LanguageToggle />
            </div>
            <button
              onClick={onOpenBeta}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-dark)",
              }}
            >
              {ctaLabel}
            </button>
          </div>

          {/* Hamburger mobile */}
          <button
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden mx-4 mb-3 p-3 rounded-2xl border border-white/10 backdrop-blur-xl"
            style={{ background: "rgba(41,70,118,0.95)" }}
          >
            {navLinks.map((item) => (
              <LinkItem key={item.label} label={item.label} href={item.href} mobile />
            ))}
            <div className="pt-2 border-t border-white/10 mt-2 space-y-2">
              <div className="flex justify-center">
                <div className="flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/15">
                  <LanguageToggle />
                </div>
              </div>
              <button
                onClick={() => { setMobileOpen(false); onOpenBeta?.(); }}
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navigation);
