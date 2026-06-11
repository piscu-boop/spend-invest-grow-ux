import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/site/Reveal";

const PRESS_ARTICLES = [
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
    tag: "Radio Gamba",
    media: "NOTIFY | RADIO",
    date: "22/12/2025",
    headline: "Nota UX CAPITAL en Radio Gamba a Santiago César.",
    link: "https://drive.google.com/file/d/1u3f9UvmLWxOygHM9vZ-eoswhAJdnuGL2/view",
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
    tag: "InfoPymes",
    media: "PRIMERA TECH QUE CONVIERTE COMPRAS EN INVERSIÓN",
    date: "18/12/2025",
    headline:
      "UX Capital presenta la primera tecnología del mundo que transforma compras en inversión",
    link: "https://infopymes.info/2025/12/ux-capital-presenta-la-primera-tecnologia-del-mundo-que-transforma-compras-en-inversion/",
  },
  {
    tag: "InfoNegocios",
    media: "ROMPIENDO LA LÓGICA DE PAGOS",
    date: "16/12/2025",
    headline:
      "UX Capital, la fintech cordobesa que convierte cada compra en inversión",
    link: "https://infonegocios.info/nota-principal/ux-capital-la-fintech-cordobesa-que-viene-a-romper-la-logica-de-los-pagos-y-convertir-cada-compra-en-inversion",
  },
  {
    tag: "Punto a Punto",
    media: "INNOVACIÓN APLICADA A PAGOS",
    date: "16/12/2025",
    headline:
      "Desde Córdoba crean una tecnología que permite transformar compras en inversiones",
    link: "https://puntoapunto.com.ar/desde-cordoba-crean-una-tecnologia-que-permite-transformar-compras-en-inversiones/",
  },
  {
    tag: "Cadena 3",
    media: "FINTECH PREMIADA EN SILICON VALLEY",
    date: "15/12/2025",
    headline:
      "Empresa cordobesa presentó una tecnología que transforma consumo en inversión",
    link: "https://www.cadena3.com/noticia/tecnologia/empresa-cordobesa-presento-una-tecnologia-que-transforma-consumo-en-inversion_498101",
  },
  {
    tag: "La Voz del Interior",
    media: "DE CÓRDOBA AL MUNDO",
    date: "13/12/2025",
    headline:
      "Creadores del pago con inversión: la innovación cordobesa que transforma las compras en ganancias",
    link: "https://www.lavoz.com.ar/negocios/creadores-del-pago-con-inversion-la-innovacion-cordobesa-que-transforma-las-compras-en-ganancias/",
  },
];

const Press: React.FC = () => {
  return (
    <div className="min-h-screen bg-palette-a">
      <Navigation />

      <section className="px-6 pb-10 pt-32 text-center md:pt-40">
        <FadeUp>
          <p className="eyebrow text-teal">UX Capital en los medios</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h1
            className="mt-4 font-display"
            style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Noticias Destacadas
          </h1>
        </FadeUp>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {PRESS_ARTICLES.map((c, i) => (
            <FadeUp key={c.link} delay={(i % 4) * 0.04} className="h-full">
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
                  <span className="min-w-0 flex-1 truncate text-center text-xs uppercase tracking-[0.18em] text-uxc-muted-foreground">
                    {c.media}
                  </span>
                  <span className="shrink-0 text-xs text-uxc-muted-foreground">
                    {c.date}
                  </span>
                </div>

                <h3
                  className="mt-auto pt-4 font-bold"
                  style={{ fontSize: 18, lineHeight: 1.35 }}
                >
                  {c.headline}
                </h3>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
