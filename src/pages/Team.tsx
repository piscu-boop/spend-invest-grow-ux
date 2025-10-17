import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";

interface TeamPageProps {
  onOpenBeta: () => void;
}

const Team: React.FC<TeamPageProps> = ({ onOpenBeta }) => {
  return (
    <div className="min-h-screen">
      <Navigation onOpenBeta={onOpenBeta} />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Team;


