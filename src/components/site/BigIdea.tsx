import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    eyebrow: "El problema que resolvemos",
    titleMain: "Hoy, cuando pagás, tu plata deja de rendir.",
    titleHighlight: "Eso termina con UX.",
    subtitle: "No necesitás ahorros para invertir. Solo necesitás pagar con UX.",
  },
  en: {
    eyebrow: "The problem we solve",
    titleMain: "Today, the moment you pay, your money stops earning.",
    titleHighlight: "That ends with UX.",
    subtitle: "You don't need savings to invest. You just need to pay with UX.",
  },
};

export function BigIdea() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section id="problema" className="bg-palette-a relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <p className="eyebrow text-gold">{c.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            {c.titleMain}{" "}
            <span className="text-uxc-muted-foreground">{c.titleHighlight}</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-balance text-lg leading-[1.7] text-uxc-muted-foreground">
            {c.subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mx-auto mt-12 h-px w-10 bg-teal" />
        </FadeUp>
      </div>
    </section>
  );
}
