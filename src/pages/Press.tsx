import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PRESS_ARTICLES = [
  {
    title: "UX CAPITAL, la app para invertir con cada compra que haces - ES UN MONTÓN!",
    source: "Radio y Streaming",
    url: "https://www.youtube.com/watch?v=9CrgVOWko2M",
    highlight: "Canal 10 Córdoba",
    date: "23/01/2026",
  },
  {
    title: "UX Dual - Pagás y tu plata sigue trabajando.\nEntrevista a Carlos César y Patricia Chacón",
    source: "Radio y Streaming",
    url: "https://www.youtube.com/watch?v=i-fjlo0S2Z4",
    highlight: "Las Rosas - Estamos a tiempo",
    date: "07/01/2026",
  },
  {
    title: "Nota UX CAPITAL en Radio Gamba a Santiago César.",
    source: "Radio Gamba",
    url: "https://drive.google.com/file/d/1u3f9UvmLWxOygHM9vZ-eoswhAJdnuGL2/view",
    highlight: "Notify | Radio",
    date: "22/12/2025",
  },
  {
    title: "UX Capital presentó una tecnología que convierte las compras cotidianas en inversión automática",
    source: "EconomixTV",
    url: "https://economixtv.com/noticia/ux-capital-presento-una-tecnologia-que-convierte-las-compras-cotidianas-en-inversion-automatica/",
    highlight: "Consumo y tecnología",
    date: "18/12/2025",
  },
  {
    title: "UX Capital presenta la primera tecnología del mundo que transforma compras en inversión",
    source: "InfoPymes",
    url: "https://infopymes.info/2025/12/ux-capital-presenta-la-primera-tecnologia-del-mundo-que-transforma-compras-en-inversion/",
    highlight: "Primera tech que convierte compras en inversión",
    date: "18/12/2025",
  },
  {
    title: "UX Capital, la fintech cordobesa que convierte cada compra en inversión",
    source: "InfoNegocios",
    url: "https://infonegocios.info/nota-principal/ux-capital-la-fintech-cordobesa-que-viene-a-romper-la-logica-de-los-pagos-y-convertir-cada-compra-en-inversion",
    highlight: "Rompiendo la lógica de pagos",
    date: "16/12/2025",
  },
  {
    title: "Desde Córdoba crean una tecnología que permite transformar compras en inversiones",
    source: "Punto a Punto",
    url: "https://puntoapunto.com.ar/desde-cordoba-crean-una-tecnologia-que-permite-transformar-compras-en-inversiones/",
    highlight: "Innovación aplicada a pagos",
    date: "16/12/2025",
  },
  {
    title: "Empresa cordobesa presentó una tecnología que transforma consumo en inversión",
    source: "Cadena 3",
    url: "https://www.cadena3.com/noticia/tecnologia/empresa-cordobesa-presento-una-tecnologia-que-transforma-consumo-en-inversion_498101",
    highlight: "Fintech premiada en Silicon Valley",
    date: "15/12/2025",
  },
  {
    title: "Creadores del pago con inversión: la innovación cordobesa que transforma las compras en ganancias",
    source: "La Voz del Interior",
    url: "https://www.lavoz.com.ar/negocios/creadores-del-pago-con-inversion-la-innovacion-cordobesa-que-transforma-las-compras-en-ganancias/",
    highlight: "De Córdoba al mundo",
    date: "13/12/2025",
  },
];

const Press: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      heroTitle: "Featured News",
      heroSubtitle: "UX Capital in the media",
      ctaText: "Read full article",
    },
    es: {
      heroTitle: "Noticias Destacadas",
      heroSubtitle: "UX Capital en los medios",
      ctaText: "Leer la nota completa",
    },
  } as const;

  const copy = content[language];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-dark)" }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-10 text-center px-4" style={{ background: "var(--color-bg-dark)" }}>
        <h1 className="text-5xl md:text-6xl font-semibold text-white mb-3">
          {copy.heroTitle}
        </h1>
        <p className="text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
          {copy.heroSubtitle}
        </p>
      </section>

      {/* Articles grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {PRESS_ARTICLES.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl p-7 transition-all duration-250"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "28px",
                  transition: "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = "rgba(77,240,172,0.3)";
                  el.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Badge de fuente */}
                    <span
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(77,240,172,0.12)",
                        color: "#4DF0AC",
                        border: "1px solid rgba(77,240,172,0.2)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {article.source}
                    </span>
                    <span
                      className="text-[11px] uppercase tracking-[0.08em]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {article.highlight}
                    </span>
                  </div>
                  <span
                    className="text-[12px] whitespace-nowrap flex-shrink-0"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {article.date}
                  </span>
                </div>
                <h3
                  className="whitespace-pre-line leading-[1.4]"
                  style={{ color: "#fff", fontSize: "18px", fontWeight: 600 }}
                >
                  {article.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
