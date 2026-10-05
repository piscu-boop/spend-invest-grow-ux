import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    eyebrow: "Soñamos con",
    title: "Millones de personas invirtiendo sin ahorros, mientras pagan desde su banco, con UX.",
  },
  en: {
    eyebrow: "We dream of",
    title: "Millions of people investing without savings, while they pay from their bank, with UX.",
  },
};

export function BigIdea() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section id="problema" className="bg-palette-a relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <FadeUp>
          <p className="eyebrow text-gold">{c.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            {c.title}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="mx-auto mt-12 h-px w-10 bg-teal" />
        </FadeUp>
      </div>
    </section>
  );
}
