import { ArrowRight } from "lucide-react";
import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    nodoTag: "Para bancos y adquirentes",
    nodoDesc:
      "Tecnología de pagos con inversión que integrás vía API sobre tu infraestructura existente — seas banco o adquirente/gateway. Vos mantenés la licencia, el custody y la relación con el cliente o comercio.",
    nodoBadges: ["API-first", "Plug-in sobre tu stack", "Nueva línea de ingresos"],
    nodoCta: "Ver tecnología",
  },
  en: {
    nodoTag: "For banks and acquirers",
    nodoDesc:
      "Investment-powered payment technology that you integrate via API on top of your existing infrastructure — whether you're a bank or an acquirer/gateway. You keep the license, the custody, and the customer or merchant relationship.",
    nodoBadges: ["API-first", "Plugs into your stack", "New revenue stream"],
    nodoCta: "See the technology",
  },
};

function NodoVisual() {
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="none"
      className="absolute right-0 top-0 h-full w-full opacity-40"
      aria-hidden
    >
      <defs>
        <radialGradient id="bgrad" cx="80%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#3A7BFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3A7BFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill="url(#bgrad)" />
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 4 }).map((_, j) => (
          <circle
            key={`${i}-${j}`}
            cx={40 + i * 60}
            cy={30 + j * 50}
            r="2.5"
            fill="#3A7BFF"
            opacity={0.6}
          />
        )),
      )}
      <path
        d="M40 30 L100 80 L160 50 L220 130 L280 80"
        stroke="#3A7BFF"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M40 180 L100 130 L160 160 L220 90 L280 130"
        stroke="#3A7BFF"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}


export function Bifurcation() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section className="bg-bifurcation-wrap relative px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Nodo Bank */}
        <FadeUp>
          <a
            href="#nodo-bank"
            className="bg-palette-a group relative block h-full overflow-hidden rounded-3xl border border-white/10 p-10 transition hover:border-blue/50"
          >
            <NodoVisual />
            <div className="relative">
              <p className="eyebrow text-blue">{c.nodoTag}</p>
              <h3 className="mt-4 font-display text-4xl md:text-5xl">
                UX Nodo
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-[1.7] md:text-lg text-uxc-muted-foreground">
                {c.nodoDesc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.nodoBadges.map(
                  (t) => (
                    <span
                      key={t}
                      className="glass rounded-full px-3.5 py-1.5 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
              <span className="mt-10 inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition group-hover:gap-3">
                {c.nodoCta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
