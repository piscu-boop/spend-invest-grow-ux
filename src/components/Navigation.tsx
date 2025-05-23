
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navItems = [
    { label: "About UX", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "Support", href: "#support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ux-navy/90 backdrop-blur-md border-b border-ux-green/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              UX <span className="text-ux-green">DUAL</span>
            </div>
            <div className="text-sm text-ux-green font-medium hidden md:block">
              Invertí comprando
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-ux-green transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button className="bg-ux-green hover:bg-ux-green-light text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            Join Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
