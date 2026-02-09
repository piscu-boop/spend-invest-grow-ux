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
      title: "Featured news",
      ctaText: "Read full article",
    },
    es: {
      title: "Noticias destacadas",
      ctaText: "Leer la nota completa",
    },
  } as const;

  const copy = content[language];

  return (
    <div className="min-h-screen bg-[#1C304F]">
      <Navigation />

      <section className="min-h-screen flex items-center pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {copy.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {PRESS_ARTICLES.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-ux-green/50 hover:shadow-2xl transition-all duration-300"
              >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ux-green bg-ux-green/10 px-3 py-1 rounded-full">
                    {article.source}
                  </span>
                  <span className="text-xs text-gray-300 uppercase tracking-wide">
                    {article.highlight}
                  </span>
                </div>
                <span className="text-xs text-gray-300 whitespace-nowrap">
                  {article.date}
                </span>
              </div>
                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-ux-green transition-colors whitespace-pre-line">
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

