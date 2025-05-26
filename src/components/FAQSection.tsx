import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does UX Dual make money from my purchases?",
      answer: "UX Dual invests your purchase money in diversified portfolios that generate daily returns, allowing your spending money to grow while remaining accessible for your needs."
    },
    {
      question: "Is my money safe and accessible?",
      answer: "Yes, your money remains fully accessible for purchases while being invested in secure, regulated investment vehicles that generate daily returns."
    },
    {
      question: "Do I need investment experience to use UX Dual?",
      answer: "Not at all! UX Dual handles all investment decisions automatically, making wealth building as simple as your regular shopping."
    },
    {
      question: "What kind of returns can I expect?",
      answer: "Returns vary based on market conditions, but our platform is designed to generate consistent daily returns on your invested purchase money."
    }
  ];

  return (
    <section className="py-20 bg-ux-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Get answers to common questions about UX Dual and how it works.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-ux-blue-dark/50 backdrop-blur-sm rounded-2xl border border-ux-green/20 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-ux-green/5 transition-colors duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className={`text-ux-green text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-6">
                  <p className="text-gray-200 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
