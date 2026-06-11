import { ArrowRight } from "lucide-react";
import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    nodoTag: "Para bancos",
    nodoDesc:
      "Tecnología de pagos con inversión que tu banco integra vía API sobre su infraestructura existente. Vos mantenés la licencia, el custody y la relación con el cliente.",
    nodoBadges: ["API-first", "Plug-in sobre tu core", "Nueva línea de ingresos"],
    nodoCta: "Ver tecnología",
    dualTag: "Para usuarios y comercios",
    dualDesc:
      "La primera billetera donde tu saldo sigue invertido en FCI mientras pagás con QR. Y si sos comercio, aceptás pagos inteligentes con liquidación garantizada.",
    dualBadges: ["Pago con QR", "Rendimiento diario", "Sin fricciones"],
    dualCta: "Conocer UX Dual",
  },
  en: {
    nodoTag: "For banks",
    nodoDesc:
      "Investment-powered payment technology that your bank integrates via API on top of its existing infrastructure. You keep the license, the custody, and the customer relationship.",
    nodoBadges: ["API-first", "Plugs into your core", "New revenue stream"],
    nodoCta: "See the technology",
    dualTag: "For users and merchants",
    dualDesc:
      "The first wallet where your balance stays invested in money market funds while you pay with QR. And if you're a merchant, you accept smart payments with guaranteed settlement.",
    dualBadges: ["QR payments", "Daily yield", "Frictionless"],
    dualCta: "Discover UX Dual",
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

function DualVisual() {
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="none"
      className="absolute right-0 top-0 h-full w-full opacity-40"
      aria-hidden
    >
      <defs>
        <radialGradient id="trad" cx="80%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#00C896" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C896" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill="url(#trad)" />
      <rect
        x="210"
        y="30"
        width="80"
        height="140"
        rx="14"
        stroke="#00C896"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="225"
        y="55"
        width="50"
        height="50"
        stroke="#00C896"
        strokeWidth="1"
        fill="none"
      />
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <rect
            key={`${i}-${j}`}
            x={228 + i * 9}
            y={58 + j * 9}
            width="6"
            height="6"
            fill={(i + j) % 2 === 0 ? "#00C896" : "transparent"}
            opacity="0.7"
          />
        )),
      )}
      <text
        x="250"
        y="135"
        textAnchor="middle"
        fill="#00C896"
        fontSize="9"
        fontFamily="monospace"
      >
        +0.08% hoy
      </text>
    </svg>
  );
}

export function Bifurcation() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section className="bg-bifurcation-wrap relative px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
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
                UX Nodo Bank
              </h3>
              <p className="mt-5 max-w-md text-base leading-[1.7] text-uxc-muted-foreground">
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

        {/* Dual */}
        <FadeUp delay={0.1}>
          <a
            href="#ux-dual"
            className="bg-palette-b group relative block h-full overflow-hidden rounded-3xl border border-white/10 p-10 transition hover:border-teal/50"
          >
            <DualVisual />
            <div className="relative">
              <img
                src="/lovable-uploads/logo-dual.png"
                alt="UX Dual"
                className="mb-6 mt-3 h-10 w-auto"
              />
              <p className="eyebrow text-teal">{c.dualTag}</p>
              <h3 className="mt-4 font-display text-4xl md:text-5xl">UX Dual</h3>
              <p className="mt-5 max-w-md text-base leading-[1.7] text-uxc-muted-foreground">
                {c.dualDesc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.dualBadges.map(
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
              <span className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-navy-deep transition group-hover:gap-3">
                {c.dualCta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
