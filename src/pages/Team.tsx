import Navigation from "@/components/Navigation";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

interface TeamProps {
  onOpenBeta: () => void;
}

const Team: React.FC<TeamProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen pb-2">
      <Navigation onOpenBeta={onOpenBeta} />
      <TeamSection />
      <Footer />
    </div>

  );
};

export default Team;
