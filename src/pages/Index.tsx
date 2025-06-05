
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { WhyUxDual } from "@/components/WhyUxDual";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyUxDual />
      <HowItWorksSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
