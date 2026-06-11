import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    eyebrow: "Hablemos",
    title: "Si queres ofrecer pagos con Inversión, empezamos hoy.",
    subtitle:
      "Contanos sobre tu banco o comercio y te mostramos cómo integrar pagos con inversión en semanas.",
    cta: "Agendar demo",
    emailPrefix: "O escribinos a",
  },
  en: {
    eyebrow: "Let's talk",
    title: "If you want to offer payments with investment, let's start today.",
    subtitle:
      "Tell us about your bank or business and we'll show you how to integrate payments with investment in weeks.",
    cta: "Book a demo",
    emailPrefix: "Or email us at",
  },
};

export function Contact() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section
      id="contacto"
      className="bg-palette-a relative overflow-hidden border-t-2 border-teal px-6 py-32 md:py-44"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-teal left-[15%] top-[20%] h-[320px] w-[320px] opacity-50" />
        <div className="orb-blue right-[10%] bottom-[10%] h-[380px] w-[380px] opacity-50" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <FadeUp>
          <p className="eyebrow text-gold">{c.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            {c.title}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-[1.7] text-uxc-muted-foreground">
            {c.subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mx-auto mt-12 flex max-w-xl justify-center">
            <a
              href="https://calendly.com/uxcapital"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy-deep transition hover:opacity-90"
            >
              {c.cta}
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-6 text-xs text-uxc-muted-foreground">
            {c.emailPrefix}{" "}
            <a className="text-teal hover:underline" href="mailto:info@uxcapital.la">
              info@uxcapital.la
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
