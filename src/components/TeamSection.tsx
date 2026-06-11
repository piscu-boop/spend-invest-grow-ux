import React, { memo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type TeamMember = {
  name: string;
  title: string;
  imageUrl?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Carlos César", title: "Co-Founder & CEO", imageUrl: "/lovable-uploads/carlos-ux.jpeg" },
  { name: "Patricia Roxana Chacón", title: "Co-Founder & Chief Legal Officer", imageUrl: "/lovable-uploads/patricia-ux.jpeg" },
  { name: "Santiago César", title: "Co-Founder & COO", imageUrl: "/lovable-uploads/santiago-ux.jpeg" },
  { name: "Abril Barra Delich", title: "Co-Founder & Head of Product", imageUrl: "/lovable-uploads/abril-ux.jpeg" },
  { name: "Iván Paulin", title: "Co-Founder & Head of Technology", imageUrl: "/lovable-uploads/ivan-ux.jpeg" },
];

const heroContent = {
  en: { title: "Capital Team", subtitle: "The people building the future of spending and investing." },
  es: { title: "Capital Team", subtitle: "Las personas construyendo el futuro del consumo invertido." },
};

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="flex flex-col items-center text-center"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(77,240,172,0.25)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        padding: "32px 24px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.25s ease, border-color 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-28 w-28 rounded-full overflow-hidden mb-4 flex-shrink-0"
        style={{
          border: `3px solid ${hovered ? "rgba(77,240,172,0.4)" : "rgba(255,255,255,0.12)"}`,
          transition: "border-color 0.25s ease",
          background: "#1a2a40",
        }}
      >
        {member.imageUrl && (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h3
        className="font-semibold mt-1"
        style={{ color: "#fff", fontSize: "17px", marginTop: "4px" }}
      >
        {member.name}
      </h3>
      <p
        className="font-medium mt-1"
        style={{ color: "var(--color-accent)", fontSize: "13px", marginTop: "4px" }}
      >
        {member.title}
      </p>
    </li>
  );
};

const TeamSection: React.FC = () => {
  const { language } = useLanguage();
  const hero = heroContent[language];

  return (
    <section id="team" className="w-full text-white">
      {/* Hero */}
      <div className="pt-32 pb-10 text-center px-4 md:pt-40">
        <p className="eyebrow text-teal">Equipo</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl mb-3">
          <span className="text-teal">UX</span> {hero.title}
        </h1>
        <p className="text-lg text-uxc-muted-foreground">
          {hero.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-5 pb-24">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {TEAM_MEMBERS.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default memo(TeamSection);
