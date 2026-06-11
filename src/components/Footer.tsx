import { useLanguage } from "@/contexts/LanguageContext";

const QUICK_LINKS = {
  es: [
    { label: "Inicio", href: "/#hero" },
    { label: "UX Nodo Bank", href: "/#nodo-bank" },
    { label: "UX Dual", href: "/#ux-dual" },
    { label: "Partners", href: "/#partners" },
    { label: "Contacto", href: "/#contacto" },
    { label: "Prensa", href: "/press" },
  ],
  en: [
    { label: "Home", href: "/#hero" },
    { label: "UX Nodo Bank", href: "/#nodo-bank" },
    { label: "UX Dual", href: "/#ux-dual" },
    { label: "Partners", href: "/#partners" },
    { label: "Contact", href: "/#contacto" },
    { label: "Press", href: "/press" },
  ],
};

const content = {
  es: {
    description:
      "La primera plataforma que transforma cada gasto en una inversión con retornos diarios. Construyendo el futuro de la creación automatizada de riqueza.",
    emailLabel: "Email: ",
    social: "Síguenos en redes sociales para actualizaciones y consejos",
    quickLinks: "Enlaces Rápidos",
    rights: "© 2025 UX Capital S.A.S. Todos los derechos reservados.",
    disclaimer:
      "Los rendimientos pasados no garantizan rendimientos futuros. El fondo está regulado por la CNV. Invertir implica riesgos.",
  },
  en: {
    description:
      "The first platform that turns every purchase into an investment with daily returns. Building the future of automated wealth creation.",
    emailLabel: "Email: ",
    social: "Follow us on social media for updates and tips",
    quickLinks: "Quick Links",
    rights: "© 2025 UX Capital S.A.S. All rights reserved.",
    disclaimer:
      "Past returns do not guarantee future returns. The fund is regulated by the CNV. Investing involves risk.",
  },
};

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ux.dual/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@UX.DUAL.INVERTI.COMPRANDO",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ux.dual",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const { language } = useLanguage();
  const c = content[language];
  const quickLinks = QUICK_LINKS[language];

  return (
    <footer id="footer" className="bg-footer-deep border-t border-white/10">
      <div className="container mx-auto px-5 py-14 md:py-20">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-sm">
          <div className="flex items-center">
          <img
            src="/lovable-uploads/logo-capital.png"
            alt="UX Capital"
            className="max-h-16 w-auto"
          />
          </div>
            <p className="text-base leading-[1.7] text-uxc-muted-foreground">
              {c.description}
            </p>
            <p className="text-base text-uxc-muted-foreground">
              <span className="font-semibold text-white">{c.emailLabel}</span>
              <a
                href="mailto:info@uxcapital.la"
                className="transition-colors duration-200 hover:text-teal"
              >
                info@uxcapital.la
              </a>
            </p>
            <p className="text-base text-uxc-muted-foreground">
              {c.social}
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-uxc-muted-foreground transition-colors duration-200 hover:text-teal"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <p className="eyebrow text-teal mb-5">{c.quickLinks}</p>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-base text-uxc-muted-foreground transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-uxc-muted-foreground/60">
          <p>{c.rights}</p>
          <p className="max-w-md text-right">
            {c.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
