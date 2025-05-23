
const Footer = () => {
  const quickLinks = [
    "How It Works",
    "Security & Privacy", 
    "Terms of Service",
    "Contact Support",
    "Careers"
  ];

  return (
    <footer className="bg-ux-navy border-t border-ux-green/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">
                UX <span className="text-ux-green">DUAL</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The first platform that transforms every expense into an investment with daily returns. Building the future of automated wealth creation.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="font-semibold">Email:</span> support@uxdual.com
              </p>
              <p className="text-gray-400">
                Follow us on social media for updates and tips
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
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
            <h4 className="text-xl font-bold text-white">Stay Updated</h4>
            <p className="text-gray-400">
              Get the latest updates on features and investment opportunities.
            </p>
            <div className="space-y-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-ux-blue-dark border border-ux-green/20 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-ux-green"
                />
                <button className="bg-ux-green hover:bg-ux-green-light px-6 py-3 rounded-r-lg text-white font-semibold transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ux-green/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 UX Dual. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-ux-green transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-ux-green transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-ux-green transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
