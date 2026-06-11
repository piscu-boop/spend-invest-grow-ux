import { FadeUp } from "./Reveal";

export function Contact() {
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
          <p className="eyebrow text-gold">Hablemos</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Si queres ofrecer pagos con Inversión, empezamos hoy.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-[1.7] text-uxc-muted-foreground">
            Contanos sobre tu banco o comercio y te mostramos cómo integrar
            pagos con inversión en semanas.
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
              Agendar demo
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-6 text-xs text-uxc-muted-foreground">
            O escribinos a{" "}
            <a className="text-teal hover:underline" href="mailto:info@uxcapital.la">
              info@uxcapital.la
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
