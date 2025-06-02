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
      copyright: "© 2024 UX Dual. All rights reserved.",
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
      copyright: "© 2024 UX Dual. Todos los derechos reservados.",
      footerLinks: [""]
    }
  };

  const currentContent = content[language];

  return (
    <footer id="footer" className="bg-ux-navy border-t border-ux-green/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">
              <img
              src="lovable-uploads/logo-dual.png" // Reemplaza con la ruta de tu imagen
              alt="UX Dual Logo"
              className="h-8" // Ajusta el tamaño según sea necesario
              />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {currentContent.description}
            </p>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="font-semibold">{currentContent.email}</span> info@uxdual.com
              </p>
              <p className="text-gray-400">
                {currentContent.followText}
              </p>
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
