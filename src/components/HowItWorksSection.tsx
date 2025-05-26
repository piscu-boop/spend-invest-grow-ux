const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Connect Your Spending",
      description: "Link your UX Dual account to your everyday purchases and start building wealth immediately.",
      icon: "🔗"
    },
    {
      step: "02", 
      title: "Automatic Investment",
      description: "Every purchase you make automatically invests your money in diversified portfolios with daily returns.",
      icon: "⚙️"
    },
    {
      step: "03",
      title: "Watch Your Money Grow",
      description: "Track your investments and returns in real-time while continuing your normal spending habits.",
      icon: "📈"
    },
    {
      step: "04",
      title: "Enjoy Daily Returns",
      description: "Earn daily returns on your investments while maintaining full access to your money for purchases.",
      icon: "💰"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-ux-navy to-ux-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Investing Made as Simple as{" "}
            <span className="gradient-text">Shopping</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Four simple steps to transform your everyday purchases into wealth-building opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-ux-green/50 to-transparent transform translate-x-4 z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-ux-green rounded-full text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-green">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-ux-green transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
