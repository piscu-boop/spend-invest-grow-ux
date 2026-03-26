import { Link, useLocation } from "react-router-dom";
import { memo, useState, useEffect } from "react";

interface NavigationProps {
  onOpenBeta?: () => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú mobile al cambiar de ruta
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Producto",        href: isHomePage ? "#hero" : "/#hero" },
    { label: "Cómo funciona",   href: isHomePage ? "#como-funciona" : "/#como-funciona" },
    { label: "Para empresas",   href: "/merchant" },
  ];

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
              src="lovable-uploads/logo-capital.png"
              alt="UX Capital"
              className="h-7 md:h-8"
            />
          </Link>

          {/* Links — desktop, centrados */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <li key={item.label}>
                <LinkItem label={item.label} href={item.href} />
              </li>
            ))}
          </ul>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://apps.apple.com/us/app/ux-dual/id6673919572?l=es-MX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-dark)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-accent)")}
            >
              Descargar app
            </a>
          </div>

          {/* Hamburger — mobile */}
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
          <div className="md:hidden mx-4 mb-3 p-3 rounded-2xl border border-white/10 backdrop-blur-xl"
            style={{ background: "rgba(13,10,43,0.92)" }}
          >
            {navLinks.map((item) => (
              <LinkItem key={item.label} label={item.label} href={item.href} mobile />
            ))}
            <div className="pt-2 border-t border-white/10 mt-2">
              <a
                href="https://apps.apple.com/us/app/ux-dual/id6673919572?l=es-MX"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
                onClick={() => setMobileOpen(false)}
              >
                Descargar app
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navigation);
