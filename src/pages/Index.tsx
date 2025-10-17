
import Navigation from "@/components/Navigation";
// import HeroSection from "@/components/HeroSection"; // desactivada temporalmente
import HeroSectionAudience from "@/components/HeroSectionAudience";
import { WhyUxDual } from "@/components/Whyuxdual";
import HowItWorksSection from "@/components/HowItWorksSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import TrustedBySection from "@/components/TrustedBySection";

interface IndexProps {
  onOpenBeta: () => void; // Optional prop to open beta modal
}

const Index:React.FC<IndexProps> = ({onOpenBeta}) => {
  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta}/>
      <HeroSectionAudience onOpenBeta={onOpenBeta}/>
      <TrustedBySection />
      <Footer />
    </div>
  );
};

export default Index;
