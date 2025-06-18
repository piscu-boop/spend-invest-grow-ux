
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { WhyUxDual } from "@/components/Whyuxdual";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

interface IndexProps {
  onOpenBeta: () => void; // Optional prop to open beta modal
}

const Index:React.FC<IndexProps> = ({onOpenBeta}) => {
  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta}/>
      <HeroSection onOpenBeta={onOpenBeta}/>
      <WhyUxDual />
      <HowItWorksSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
