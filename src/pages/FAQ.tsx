import Navigation from "@/components/Navigation";
import FAQSegmentado from "@/components/FAQSegmentado";
import Footer from "@/components/Footer";

interface FAQProps {
  onOpenBeta: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen bg-[#1C304F]">
      <Navigation onOpenBeta={onOpenBeta} />
      <div className="pt-20">
        <FAQSegmentado defaultFilter="general" />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
