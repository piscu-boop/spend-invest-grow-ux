import { ArrowRight, Code2, Layers, TrendingUp, ShieldCheck, Users, Network, Building2 } from "lucide-react";
import { useState } from "react";
import { FadeUp, ScaleIn } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    title: "Tu infraestructura. Tus clientes. Nuestra tecnología.",
    subtitle:
      "Con UX Nodo, ofrecés algo único — Pagos con Inversión. Más ingresos. Más fidelidad. Todo sobre tu infraestructura actual.",
    howItWorks: "Cómo funciona",
    tabLabels: { banco: "Banco", adquirente: "Adquirente" },
    diagram: {
      left: "Bancos / Fintechs",
      center: "UX Nodo",
      right: "Adquirentes / Comercios",
    },
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
        body: "SDK, sandbox y documentación completa. Equipos de ingeniería trabajan en paralelo con tu banco para llegar a producción en ciclos cortos y previsibles.",
      },
    ],
    adquirente: {
      intro:
        "UX Nodo conecta dos lados de la red: bancos/fintechs que ya invierten el saldo de sus usuarios, y adquirentes/procesadores que liquidan a los comercios. Cuando ambos lados adoptan UX Nodo, el pago queda invertido de punta a punta — desde que el usuario paga hasta que el comercio cobra.",
      steps: [
        { n: "01", t: "Usuario paga con Inversión desde su banco", b: "UX Nodo conecta el pago con la inversión." },
        { n: "02", t: "El pago viaja en tu red de POS", b: "UX Nodo enruta la transacción sobre tu red." },
        { n: "03", t: "El pago sigue generando rendimiento", b: "Mientras espera liquidarse, el saldo se mantiene invertido." },
        { n: "04", t: "Vos liquidás al comercio, con tus condiciones", b: "El comercio vende más, vos procesas más, el usuario gana más." },
      ],
      callout: "Ganás por el volumen que pasa por tu rail — sin cambiar tu modelo de negocio.",
      valueProps: [
        {
          icon: TrendingUp,
          title: "Diferenciación frente a la competencia",
          body: "Sos el procesador que ofrece Pagos con Inversión. Los que solo procesan pagos tradicionales, se quedan atrás.",
        },
        {
          icon: Users,
          title: "Fidelización de una nueva demanda",
          body: "Comercios y usuarios que buscan pagar con inversión eligen quedarse en tu red.",
        },
        {
          icon: Network,
          title: "Liquidez que fluye hacia tu ecosistema",
          body: "Cuanto más crece la red UX Nodo, más volumen y más liquidez circulan por tu infraestructura.",
        },
        {
          icon: ShieldCheck,
          title: "Tu marca. Tu comercio. Nuestra tecnología.",
          body: "UX no toca fondos, no compite con vos. Mantenés el contrato y la relación con cada comercio.",
        },
      ],
    },
    apiTag: "Integración técnica",
    apiTitle: "Una llamada. Cinco campos. Listo.",
    apiDesc:
      "Documentación completa, sandbox público, SDKs para los stacks más usados en bancos y adquirentes LATAM. Compliance, idempotencia y trazabilidad de auditoría desde el primer request.",
    apiCta: "Solicitar acceso a docs",
  },
  en: {
    title: "Your infrastructure. Your customers. Our technology.",
    subtitle:
      "With UX Nodo, you offer something unique — payments with investment. More revenue. More loyalty. All on top of your current infrastructure.",
    howItWorks: "How it works",
    tabLabels: { banco: "Bank", adquirente: "Acquirer" },
    diagram: {
      left: "Banks / Fintechs",
      center: "UX Nodo",
      right: "Acquirers / Merchants",
    },
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
        body: "SDK, sandbox and full documentation. Engineering teams work in parallel with your bank to reach production in short, predictable cycles.",
      },
    ],
    adquirente: {
      intro:
        "UX Nodo connects both sides of the network: banks/fintechs that already invest their users' balances, and acquirers/processors that settle merchants. When both sides adopt UX Nodo, the payment stays invested end-to-end — from the moment the user pays until the merchant gets paid.",
      steps: [
        { n: "01", t: "User pays with Investment from their bank", b: "UX Nodo connects the payment with the investment." },
        { n: "02", t: "The payment travels on your POS network", b: "UX Nodo routes the transaction over your network." },
        { n: "03", t: "The payment keeps earning yield", b: "While it waits to settle, the balance stays invested." },
        { n: "04", t: "You settle the merchant, on your terms", b: "The merchant sells more, you process more, the user earns more." },
      ],
      callout: "You earn on the volume that flows through your rail — without changing your business model.",
      valueProps: [
        {
          icon: TrendingUp,
          title: "Differentiation from the competition",
          body: "You're the processor offering Payments with Investment. Those who only process traditional payments fall behind.",
        },
        {
          icon: Users,
          title: "Loyalty from new demand",
          body: "Merchants and users who want to pay with investment choose to stay on your network.",
        },
        {
          icon: Network,
          title: "Liquidity flowing into your ecosystem",
          body: "As the UX Nodo network grows, more volume and liquidity flow through your infrastructure.",
        },
        {
          icon: ShieldCheck,
          title: "Your brand. Your merchant. Our technology.",
          body: "UX never touches funds, doesn't compete with you. You keep the contract and the relationship with each merchant.",
        },
      ],
    },
    apiTag: "Technical integration",
    apiTitle: "One call. Five fields. Done.",
    apiDesc:
      "Full documentation, public sandbox, SDKs for the most used stacks in LATAM banks and acquirers. Compliance, idempotency and audit traceability from the first request.",
    apiCta: "Request docs access",
  },
};

export function NodoBank() {
  const { language } = useLanguage();
  const c = content[language];
  const [tab, setTab] = useState<"banco" | "adquirente">("banco");
  const isAdquirente = tab === "adquirente";
  const active = isAdquirente
    ? { steps: c.adquirente.steps, callout: c.adquirente.callout, valueProps: c.adquirente.valueProps }
    : { steps: c.steps, callout: c.callout, valueProps: c.valueProps };

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
            <p className="eyebrow text-blue">UX Nodo</p>
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
          <FadeUp delay={0.15}>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setTab("banco")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === "banco" ? "bg-teal text-navy-deep" : "text-uxc-muted-foreground hover:text-white"
                }`}
              >
                {c.tabLabels.banco}
              </button>
              <button
                type="button"
                onClick={() => setTab("adquirente")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isAdquirente ? "bg-teal text-navy-deep" : "text-uxc-muted-foreground hover:text-white"
                }`}
              >
                {c.tabLabels.adquirente}
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Network diagram (+ Adquirente-only intro) */}
        <FadeUp className="mt-10">
          {isAdquirente && (
            <p className="max-w-2xl text-[15px] leading-[1.7] text-uxc-muted-foreground">
              {c.adquirente.intro}
            </p>
          )}
          <div className={`flex items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 ${isAdquirente ? "mt-8" : ""}`}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/15 text-blue">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs text-uxc-muted-foreground">{c.diagram.left}</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-teal/40 to-teal/40" />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/20 text-teal">
                <Network className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-white">{c.diagram.center}</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-teal/40 via-teal/40 to-white/10" />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/15 text-blue">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xs text-uxc-muted-foreground">{c.diagram.right}</span>
            </div>
          </div>
        </FadeUp>

        {/* How it works */}
        <ScaleIn delay={0.15} className="mt-20">
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="eyebrow text-uxc-muted-foreground">{c.howItWorks}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {active.steps.map((s, i) => (
                <div key={s.n} className="relative">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="font-display text-2xl text-blue">{s.n}</div>
                    <h4 className="mt-4 font-display text-lg">{s.t}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-uxc-muted-foreground">{s.b}</p>
                  </div>
                  {i < active.steps.length - 1 && (
                    <div className="hidden md:absolute md:right-[-10px] md:top-1/2 md:block md:h-px md:w-5 md:-translate-y-1/2 md:bg-white/15" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-teal/20 bg-teal/[0.04] p-4">
              <span className="mt-0.5 text-teal">⚡</span>
              <p className="text-sm text-uxc-muted-foreground">
                {active.callout}
              </p>
            </div>
          </div>
        </ScaleIn>

        {/* Value props */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          {active.valueProps.map((v, i) => (
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
