import Navigation from "@/components/Navigation";
import HeroSectionAudience from "@/components/HeroSectionAudience";
import { Partners } from "@/components/site/Partners";
import { BigIdea } from "@/components/site/BigIdea";
import { Bifurcation } from "@/components/site/Bifurcation";
import { NodoBank } from "@/components/site/NodoBank";
import { Dual } from "@/components/site/Dual";
import { Contact } from "@/components/site/Contact";
import Footer from "@/components/Footer";

interface IndexProps {
  onOpenBeta: () => void;
}

const Index: React.FC<IndexProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />
      <HeroSectionAudience onOpenBeta={onOpenBeta} />
      <Partners />
      <BigIdea />
      <Bifurcation />
      <NodoBank />
      <Dual />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
