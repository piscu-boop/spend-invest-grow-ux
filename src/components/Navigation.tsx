import LanguageToggle from "./LanguageToggle";
import { Link, useLocation } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  onOpenBeta?: () => void;
}

const SECTION_LINKS = {
  es: [
    { href: "#nodo-bank", label: "UX Nodo Bank" },
    { href: "#ux-dual", label: "UX Dual" },
  ],
  en: [
    { href: "#nodo-bank", label: "UX Nodo Bank" },
    { href: "#ux-dual", label: "UX Dual" },
  ],
};

const ROUTE_LINKS = {
  es: [
    { href: "/simuladores", label: "Simulador" },
    { href: "/team", label: "Equipo" },
    { href: "/faq", label: "FAQ" },
    { href: "/press", label: "Prensa" },
  ],
  en: [
    { href: "/simuladores", label: "Simulator" },
    { href: "/team", label: "Team" },
    { href: "/faq", label: "FAQ" },
    { href: "/press", label: "Press" },
  ],
};

const content = {
  es: { cta: "Agendar demo", openMenu: "Abrir menú", closeMenu: "Cerrar menú" },
  en: { cta: "Book a demo", openMenu: "Open menu", closeMenu: "Close menu" },
};

const SECTION_IDS = ["hero", "nodo-bank", "ux-dual", "contacto"];

const Navigation: React.FC<NavigationProps> = ({ onOpenBeta }) => {
  const location = useLocation();
  const { language } = useLanguage();
  const c = content[language];
  const sectionLinks = SECTION_LINKS[language];
  const routeLinks = ROUTE_LINKS[language];
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!isHomePage) return;
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { threshold: 0.3 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage) return;
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const sectionHref = (href: string) => (isHomePage ? href : `/${href}`);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-nav-solid/80 backdrop-blur-xl"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-6">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/lovable-uploads/logo-capital.png" alt="UX Capital" className="h-7 md:h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {sectionLinks.map((l) => (
            <a
              key={l.href}
              href={sectionHref(l.href)}
              onClick={(e) => handleAnchorClick(e, l.href)}
              className={`text-sm font-medium transition-colors ${
                active === l.href ? "text-teal" : "text-uxc-muted-foreground hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          {routeLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-medium text-uxc-muted-foreground hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/15 backdrop-blur">
            <LanguageToggle />
          </div>
          <a
            href={sectionHref("#contacto")}
            onClick={(e) => handleAnchorClick(e, "#contacto")}
            className="inline-flex items-center rounded-full bg-teal px-5 py-2 text-sm font-semibold text-navy-deep transition hover:opacity-90"
          >
            {c.cta}
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
          aria-label={open ? c.closeMenu : c.openMenu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-50 bg-navy-deep md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-1 px-6 pt-4 pb-8">
            {sectionLinks.map((l) => (
              <a
                key={l.href}
                href={sectionHref(l.href)}
                onClick={(e) => handleAnchorClick(e, l.href)}
                className="border-b border-white/5 py-4 font-display text-xl"
                style={{ color: active === l.href ? "#00C896" : undefined }}
              >
                {l.label}
              </a>
            ))}
            {routeLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="border-b border-white/5 py-4 font-display text-xl text-white"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4 flex justify-center">
              <div className="flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/15">
                <LanguageToggle />
              </div>
            </div>
            <a
              href={sectionHref("#contacto")}
              onClick={(e) => handleAnchorClick(e, "#contacto")}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-teal px-5 py-3 font-medium text-navy-deep"
            >
              {c.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default memo(Navigation);
