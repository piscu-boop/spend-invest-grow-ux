import { FadeUp } from "./Reveal";

export function BigIdea() {
  return (
    <section id="problema" className="bg-palette-a relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <p className="eyebrow text-gold">El problema que resolvemos</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Hoy, cuando pagás, tu plata deja de rendir.{" "}
            <span className="text-uxc-muted-foreground">Eso termina con UX.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-balance text-lg leading-[1.7] text-uxc-muted-foreground">
            No necesitás ahorros para invertir. Solo necesitás pagar con UX.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mx-auto mt-12 h-px w-10 bg-teal" />
        </FadeUp>
      </div>
    </section>
  );
}
