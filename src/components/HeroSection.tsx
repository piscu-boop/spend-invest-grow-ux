
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-ux-navy flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Your Purchases,{" "}
                <span className="gradient-text">
                  Your Best Investment
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                UX Dual is the first app that lets you invest the same money you use for your everyday purchases.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-200">
                Transform every transaction into a wealth-building opportunity. Start investing automatically with the money you're already spending.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-ux-green hover:bg-ux-green-light text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Join Now
              </Button>
              <Button 
                variant="outline" 
                className="border-ux-green text-ux-green hover:bg-ux-green hover:text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300"
              >
                How It Works?
              </Button>
            </div>
          </div>

          {/* Right Content - Mobile App Preview */}
          <div className="relative flex justify-center lg:justify-end animate-float">
            <div className="relative">
              {/* Glowing Circle Background */}
              <div className="absolute inset-0 w-96 h-96 bg-gradient-to-r from-ux-green/20 to-ux-green/10 rounded-full blur-2xl transform -translate-x-12 -translate-y-12"></div>
              
              {/* Phone Mockup */}
              <div className="relative z-10 w-80 h-[600px] bg-gradient-to-b from-ux-blue-dark to-ux-navy rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-ux-navy rounded-[2rem] p-6 flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-white text-sm mb-6">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="text-white mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Hola Carla</span>
                      <div className="w-8 h-8 bg-ux-green rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-400 mb-1">Saldo disponible</div>
                    <div className="text-3xl font-bold text-white">$30.000</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-ux-blue-dark rounded-xl mb-2 flex items-center justify-center">
                        <div className="w-6 h-6 bg-ux-green rounded"></div>
                      </div>
                      <span className="text-xs text-gray-400">Retirar</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-ux-blue-dark rounded-xl mb-2 flex items-center justify-center">
                        <div className="w-6 h-6 bg-ux-green rounded"></div>
                      </div>
                      <span className="text-xs text-gray-400">Ingresar</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-ux-blue-dark rounded-xl mb-2 flex items-center justify-center">
                        <div className="w-6 h-6 bg-ux-green rounded"></div>
                      </div>
                      <span className="text-xs text-gray-400">Transferir</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-ux-blue-dark rounded-xl mb-2 flex items-center justify-center">
                        <div className="w-6 h-6 bg-ux-green rounded"></div>
                      </div>
                      <span className="text-xs text-gray-400">Apple Pay</span>
                    </div>
                  </div>

                  {/* Investment Section */}
                  <div className="bg-ux-blue-dark rounded-2xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">Mis rendimientos</span>
                      <div className="w-6 h-6 bg-ux-green rounded-full"></div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">$1.000</div>
                    <div className="text-sm text-gray-400">Total invertido: $31.000</div>
                  </div>

                  {/* Balance Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>$30.000 de saldo disponible</span>
                      <div className="w-2 h-2 bg-ux-green rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>$1.000 de compras invertidas</span>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
