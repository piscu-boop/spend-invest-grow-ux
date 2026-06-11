import Navigation from "@/components/Navigation";
import FAQSegmentado from "@/components/FAQSegmentado";
import Footer from "@/components/Footer";

interface FAQProps {
  onOpenBeta: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen bg-palette-a">
      <Navigation onOpenBeta={onOpenBeta} />
      <FAQSegmentado defaultFilter="general" />
      <Footer />
    </div>
  );
};

export default FAQ;
