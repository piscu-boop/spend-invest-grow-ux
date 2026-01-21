import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      description: "The first platform that transforms every expense into an investment with daily returns. Building the future of automated wealth creation.",
      email: "Email:",
      followText: "Follow us on social media for updates and tips",
      quickLinks: "Quick Links",
      quickLinksItems: [
        "About UX",
        "How It Works"
      ],
      newsletter: "Stay Updated",
      newsletterDescription: "Get the latest updates on features and investment opportunities.",
      emailPlaceholder: "Enter your email",
      subscribeButton: "Subscribe",
      copyright: "© 2025 UX Dual. All rights reserved.",
      footerLinks: [""]
    },
    es: {
      description: "La primera plataforma que transforma cada gasto en una inversión con retornos diarios. Construyendo el futuro de la creación automatizada de riqueza.",
      email: "Email:",
      followText: "Síguenos en redes sociales para actualizaciones y consejos",
      quickLinks: "Enlaces Rápidos",
      quickLinksItems: [
        "Acerca de UX",
        "Cómo Funciona"
      ],
      newsletter: "Mantente Actualizado",
      newsletterDescription: "Obtén las últimas actualizaciones sobre características y oportunidades de inversión.",
      emailPlaceholder: "Ingresa tu email",
      subscribeButton: "Suscribirse",
      copyright: "© 2025 UX Dual. Todos los derechos reservados.",
      footerLinks: [""]
    }
  };

  const currentContent = content[language];

  return (
    <footer id="footer" className="bg-[#1C304F] border-t border-ux-green/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">
              <img
              src="lovable-uploads/logo-capital.png" // Reemplaza con la ruta de tu imagen
              alt="UX capital Logo"
              className="h-8" // Ajusta el tamaño según sea necesario
              />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {currentContent.description}
            </p>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="font-semibold">{currentContent.email}</span> info@uxcapital.la
              </p>
              <p className="text-gray-400">
                {currentContent.followText}
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://www.instagram.com/ux.dual/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-ux-green transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@UX.DUAL.INVERTI.COMPRANDO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-ux-green transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@ux.dual"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-ux-green transition-colors duration-300"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">{currentContent.quickLinks}</h4>
            <ul className="space-y-3">
              {currentContent.quickLinksItems.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-ux-green transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">{currentContent.newsletter}</h4>
            <p className="text-gray-400">
              {currentContent.newsletterDescription}
            </p>
            <div className="space-y-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={currentContent.emailPlaceholder}
                  className="flex-1 bg-ux-blue-dark border border-ux-green/20 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-ux-green"
                />
                <button className="bg-ux-green hover:bg-ux-green-light px-6 py-3 rounded-r-lg text-white font-semibold transition-colors duration-300">
                  {currentContent.subscribeButton}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ux-green/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {currentContent.copyright}
            </p>
            <div className="flex space-x-6">
              {currentContent.footerLinks.map((link, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-ux-green transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
