import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeUp } from "./Reveal";

type Card = {
  tag: string;
  media?: string;
  date: string;
  headline: string;
  link: string;
};

const cards: Card[] = [
  {
    tag: "Radio y Streaming",
    media: "CANAL 10 CÓRDOBA",
    date: "23/01/2026",
    headline:
      "UX CAPITAL, la app para invertir con cada compra que haces - ES UN MONTÓN!",
    link: "https://www.youtube.com/watch?v=9CrgVOWko2M",
  },
  {
    tag: "Radio y Streaming",
    media: "LAS ROSAS - ESTAMOS A TIEMPO",
    date: "07/01/2026",
    headline:
      "UX Dual - Pagás y tu plata sigue trabajando. Entrevista a Carlos César y Patricia Chacón",
    link: "https://www.youtube.com/watch?v=i-fjlo0S2Z4",
  },
  {
    tag: "EconomixTV",
    media: "CONSUMO Y TECNOLOGÍA",
    date: "18/12/2025",
    headline:
      "UX Capital presentó una tecnología que convierte las compras cotidianas en inversión automática",
    link: "https://economixtv.com/noticia/ux-capital-presento-una-tecnologia-que-convierte-las-compras-cotidianas-en-inversion-automatica/",
  },
  {
    tag: "InfoNegocios",
    media: "ROMPIENDO LA LÓGICA DE PAGOS",
    date: "16/12/2025",
    headline:
      "UX Capital, la fintech cordobesa que convierte cada compra en inversión",
    link: "https://infonegocios.info/nota-principal/ux-capital-la-fintech-cordobesa-que-viene-a-romper-la-logica-de-los-pagos-y-convertir-cada-compra-en-inversion",
  },
];

export function Press() {
  return (
    <section id="prensa" className="bg-palette-a relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <FadeUp>
            <p className="eyebrow text-teal">UX Capital en los medios</p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2
              className="mt-4 font-display text-white"
              style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Noticias Destacadas
            </h2>
          </FadeUp>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <FadeUp key={i} delay={i * 0.04} className="h-full">
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-teal/40"
              >
                <ArrowUpRight
                  size={14}
                  className="absolute right-4 top-4 text-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-teal text-teal"
                    style={{ height: 28, fontSize: 12, padding: "4px 12px", background: "transparent" }}
                  >
                    {c.tag}
                  </span>
                  {c.media && (
                    <span className="min-w-0 flex-1 truncate text-center text-xs uppercase tracking-[0.18em] text-uxc-muted-foreground">
                      {c.media}
                    </span>
                  )}
                  <span className="shrink-0 text-xs text-uxc-muted-foreground">
                    {c.date}
                  </span>
                </div>

                <h3
                  className="mt-auto pt-4 font-bold text-white"
                  style={{ fontSize: 18, lineHeight: 1.35 }}
                >
                  {c.headline}
                </h3>
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              to="/press"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/5"
            >
              Ver toda la prensa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
