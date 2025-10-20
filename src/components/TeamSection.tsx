import React from "react";

type TeamMember = {
  name: string;
  title: string;
  subtitle?: string;
  badge?: string;
  imageUrl?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Carlos César",
    title: "Co-Founder & CEO",
    imageUrl: "/lovable-uploads/logo-dual.png", // placeholder; replace with actual avatar
  },
  {
    name: "Patricia Roxana Chacón",
    title: "Co-Founder & Chief Legal Officer",
    imageUrl: "/lovable-uploads/patricia.jpeg",
  },
  {
    name: "Santiago César",
    title: "Co- Founder & COO",
    imageUrl: "/lovable-uploads/santiago.jpeg",
  },
  {
    name: "Abril Barra Delich",
    title: "Co-Founder & Head of Product",
    imageUrl: "/lovable-uploads/logo-dual.png",
  },
  {
    name: "Iván Paulin",
    title: "Co-Founder & Head of Technology",
    imageUrl: "/lovable-uploads/foto-ivan.jpeg",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="w-full bg-[#1C304F] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">UX</span> Capital Team
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.name} className="flex flex-col items-center text-center">
              <div className="h-28 w-28 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg mb-4 bg-slate-700">
                {member.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
                ) : null}
              </div>

              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-slate-300 text-sm mt-1 max-w-[14rem]">{member.title}</p>
              {member.badge ? (
                <span className="mt-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/20">
                  {member.badge}
                </span>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90">
          {/* Logos row (placeholders). Replace with real sources in /public */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lovable-uploads/Berkeley.jpg" alt="Berkeley" className="h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lovable-uploads/merrill-lynch-logo.jpg" alt="Merrill" className="h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lovable-uploads/iol-image.png" alt="InvertirOnline" className="h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lovable-uploads/logo-tcp.png" alt="TCP" className="h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="vates" className="h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="MAMBA" className="h-10" />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;


