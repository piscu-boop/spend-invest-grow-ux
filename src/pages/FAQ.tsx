import Navigation from "@/components/Navigation";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

interface FAQProps {
  onOpenBeta: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen bg-[#1C304F]">
      <Navigation onOpenBeta={onOpenBeta} />
      <div className="pt-20">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
