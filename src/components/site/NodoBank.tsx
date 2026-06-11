import { ArrowRight, Code2, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import { FadeUp, ScaleIn } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    title: "Tu banco. Tus clientes. Nuestra tecnología.",
    subtitle:
      "Con UX Nodo Bank, tu banco ofrece algo unico; Pagos con Inversion. Más activos bajo gestión. Clientes más leales. Todo sobre tu infraestructura actual.",
    howItWorks: "Cómo funciona",
    steps: [
      { n: "01", t: "El Usuario Paga", b: "El pago dispara una Inversión en tu banco." },
      { n: "02", t: "UX Orquesta", b: "Instrucción API enviada. Tecnologia UX orquesta la inversión." },
      { n: "03", t: "Rinde Interés", b: "El usuario gana intereses con tus productos de inversión." },
      { n: "04", t: "Comercio Liquidado", b: "Fondos liberados en T+X. Interés distribuido a usuarios." },
    ],
    callout:
      "Los fondos nunca se mueven — permanecen invertidos hasta la liquidación. UX es un orquestador tecnológico puro.",
    valueProps: [
      {
        icon: Layers,
        title: "Plug-in sobre tu core bancario",
        body: "Pagos con Inversión, vía API. Tu banco opera todo bajo su propia licencia.",
      },
      {
        icon: TrendingUp,
        title: "Nueva línea de ingresos por fee",
        body: "Más saldos en cuenta, más engagement, más ingresos por transacción. Todo sobre tu propio broker y ecosistema.",
      },
      {
        icon: ShieldCheck,
        title: "Tu marca. Tu cliente. Tu operación. Nuestra tecnologia.",
        body: "UX no toca fondos. Somos orquestadores tecnológicos puros, no competimos con vos. Tu banco sigue siendo dueño de la relación con el cliente y de los activos custodiados.",
      },
      {
        icon: Code2,
        title: "Time-to-market en semanas, no años",
        body: "API, sandbox y documentación completa. Equipos de ingeniería trabajan en paralelo con tu banco para llegar a producción en ciclos cortos y previsibles.",
      },
    ],
    apiTag: "Integración técnica",
    apiTitle: "Una llamada. Cinco campos. Listo.",
    apiDesc:
      "Documentación completa, sandbox público, APIs para integración en bancos LATAM. Compliance, idempotencia y trazabilidad de auditoría desde el primer request.",
    apiCta: "Solicitar acceso a docs",
  },
  en: {
    title: "Your bank. Your customers. Our technology.",
    subtitle:
      "With UX Nodo Bank, your bank offers something unique: payments with investment. More assets under management. More loyal customers. All on top of your current infrastructure.",
    howItWorks: "How it works",
    steps: [
      { n: "01", t: "The user pays", b: "The payment triggers an investment at your bank." },
      { n: "02", t: "UX orchestrates", b: "API instruction sent. UX technology orchestrates the investment." },
      { n: "03", t: "Earns interest", b: "The user earns interest through your investment products." },
      { n: "04", t: "Merchant settled", b: "Funds released at T+X. Interest distributed to users." },
    ],
    callout:
      "Funds never move — they stay invested until settlement. UX is a pure technology orchestrator.",
    valueProps: [
      {
        icon: Layers,
        title: "Plugs into your banking core",
        body: "Payments with investment, via API. Your bank operates everything under its own license.",
      },
      {
        icon: TrendingUp,
        title: "New fee-based revenue stream",
        body: "More balances on account, more engagement, more revenue per transaction. All on top of your own broker and ecosystem.",
      },
      {
        icon: ShieldCheck,
        title: "Your brand. Your customer. Your operation. Our technology.",
        body: "UX never touches funds. We are pure technology orchestrators, not competitors. Your bank keeps ownership of the customer relationship and custodied assets.",
      },
      {
        icon: Code2,
        title: "Time-to-market in weeks, not years",
        body: "APIs, sandbox and full documentation. Engineering teams work in parallel with your bank to reach production in short, predictable cycles.",
      },
    ],
    apiTag: "Technical integration",
    apiTitle: "One call. Five fields. Done.",
    apiDesc:
      "Full documentation, public sandbox, APIs for integration in LATAM banks. Compliance, idempotency and audit traceability from the first request.",
    apiCta: "Request docs access",
  },
};

export function NodoBank() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section id="nodo-bank" className="bg-palette-a relative overflow-hidden px-6 py-32 md:py-44">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 80% 10%, rgba(58,123,255,0.18), transparent 50%), radial-gradient(at 0% 50%, rgba(58,123,255,0.10), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Intro */}
        <div className="max-w-3xl">
          <FadeUp>
            <p className="eyebrow text-blue">UX Nodo Bank</p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              {c.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-[1.7] text-uxc-muted-foreground">
              {c.subtitle}
            </p>
          </FadeUp>
        </div>

        {/* How it works */}
        <ScaleIn delay={0.15} className="mt-20">
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="eyebrow text-uxc-muted-foreground">{c.howItWorks}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {c.steps.map((s, i) => (
                <div key={s.n} className="relative">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="font-display text-2xl text-blue">{s.n}</div>
                    <h4 className="mt-4 font-display text-lg">{s.t}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-uxc-muted-foreground">{s.b}</p>
                  </div>
                  {i < c.steps.length - 1 && (
                    <div className="hidden md:absolute md:right-[-10px] md:top-1/2 md:block md:h-px md:w-5 md:-translate-y-1/2 md:bg-white/15" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-teal/20 bg-teal/[0.04] p-4">
              <span className="mt-0.5 text-teal">⚡</span>
              <p className="text-sm text-uxc-muted-foreground">
                {c.callout}
              </p>
            </div>
          </div>
        </ScaleIn>

        {/* Value props */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          {c.valueProps.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:border-blue/40">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue/15 text-blue">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-uxc-muted-foreground">
                  {v.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* API teaser */}
        <FadeUp delay={0.1}>
          <div className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1220]">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-12">
                <p className="eyebrow text-blue">{c.apiTag}</p>
                <h3 className="mt-5 font-display text-3xl md:text-4xl">
                  {c.apiTitle}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.7] text-uxc-muted-foreground">
                  {c.apiDesc}
                </p>
                <a
                  href="#contacto"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {c.apiCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="border-t border-white/10 bg-[#080c14] p-6 font-mono text-[13px] leading-relaxed lg:border-l lg:border-t-0">
                <div className="text-uxc-muted-foreground">// POST /v1/instructions</div>
                <pre className="mt-3 whitespace-pre-wrap text-white/90">
{`{
  "amount":   125000,
  "currency": "ARS",
  "fci_id":   "fci_uxc_money_market",
  "merchant": "mch_8f3a...",
  "settle":   "T+1"
}`}
                </pre>
                <div className="mt-5 text-teal">→ 200 OK · instruction_id: ins_4ab9…</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
