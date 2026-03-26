import Navigation from "@/components/Navigation";
import HeroSectionAudience from "@/components/HeroSectionAudience";
import TrustedBySection from "@/components/TrustedBySection";
import { WhyUxDual } from "@/components/Whyuxdual";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

interface IndexProps {
  onOpenBeta: () => void;
}

const Index: React.FC<IndexProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />
      <HeroSectionAudience onOpenBeta={onOpenBeta} />
      <TrustedBySection />
      <WhyUxDual />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
