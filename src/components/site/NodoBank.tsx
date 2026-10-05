import { Users, Network, Store } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    title: "Tu infraestructura. Tus clientes. Nuestra tecnología.",
    subtitle:
      "Con UX Nodo, ofrecés algo único — Pagos con Inversión. Más ingresos. Más fidelidad. Todo sobre tu infraestructura actual.",
    tabLabels: { banco: "Banco", adquirente: "Adquirente" },
    diagram: {
      left: "Bancos / Fintechs",
      center: "UX Nodo",
      right: "Adquirentes / Comercios",
    },
    adquirenteIntro:
      "UX Nodo conecta dos lados de la red: bancos/fintechs que ya invierten el saldo de sus usuarios, y adquirentes/procesadores que liquidan a los comercios. Cuando ambos lados adoptan UX Nodo, el pago queda invertido de punta a punta — desde que el usuario paga hasta que el comercio cobra.",
    infra: {
      eyebrow: "Infraestructura",
      title: "La capa que le faltaba a los pagos.",
      body: "Las redes mueven el dinero. Los bancos lo custodian. Nadie lo hacía rendir mientras se paga.",
      bodyHighlight: "Esa es nuestra capa.",
      layers: [
        { title: "Usuarios y comercios", desc: "Pagan y cobran como siempre" },
        { title: "Bancos y emisores", desc: "Cuentas, tarjetas y fondos" },
      ],
      ux: { title: "Invertí Comprando", desc: "Infraestructura", badge: "Nuevo" },
      network: { title: "Redes globales de pago", desc: "Aceptación y procesamiento" },
    },
  },
  en: {
    title: "Your infrastructure. Your customers. Our technology.",
    subtitle:
      "With UX Nodo, you offer something unique — payments with investment. More revenue. More loyalty. All on top of your current infrastructure.",
    tabLabels: { banco: "Bank", adquirente: "Acquirer" },
    diagram: {
      left: "Banks / Fintechs",
      center: "UX Nodo",
      right: "Acquirers / Merchants",
    },
    adquirenteIntro:
      "UX Nodo connects both sides of the network: banks/fintechs that already invest their users' balances, and acquirers/processors that settle merchants. When both sides adopt UX Nodo, the payment stays invested end-to-end — from the moment the user pays until the merchant gets paid.",
    infra: {
      eyebrow: "Infrastructure",
      title: "The layer payments were missing.",
      body: "Networks move the money. Banks hold it. Nobody made it earn while it was being paid.",
      bodyHighlight: "That's our layer.",
      layers: [
        { title: "Users and merchants", desc: "Pay and get paid as always" },
        { title: "Banks and issuers", desc: "Accounts, cards and funds" },
      ],
      ux: { title: "Invest by Spending", desc: "Infrastructure", badge: "New" },
      network: { title: "Global payment networks", desc: "Acceptance and processing" },
    },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

function LayerRow({ title, desc, delay }: { title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="flex flex-col justify-center gap-1 rounded-2xl border border-white/[0.12] bg-white/[0.03] px-6 py-5 md:min-h-[104px] md:flex-row md:items-center md:justify-between md:gap-6"
    >
      <h4 className="font-display text-xl md:text-2xl">{title}</h4>
      <p className="text-sm text-uxc-muted-foreground md:text-right">{desc}</p>
    </motion.div>
  );
}

export function NodoBank() {
  const { language } = useLanguage();
  const c = content[language];
  const [tab, setTab] = useState<"banco" | "adquirente">("banco");
  const isAdquirente = tab === "adquirente";
  const infra = c.infra;

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
        </div>

        {/* Tabs */}
        <FadeUp delay={0.15}>
          <div className="mt-10 flex justify-center md:justify-start">
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur">
              {(["banco", "adquirente"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                    tab === key ? "bg-teal text-navy-deep shadow" : "text-uxc-muted-foreground hover:text-white"
                  }`}
                >
                  {c.tabLabels[key]}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Network diagram */}
        <FadeUp className="mt-10">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue/15 text-blue">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-xs text-uxc-muted-foreground">{c.diagram.left}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-blue/40 via-teal/40 to-blue/40" />
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <Network className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-white">{c.diagram.center}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-blue/40 via-teal/40 to-blue/40" />
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue/15 text-blue">
                <Store className="h-5 w-5" />
              </div>
              <p className="text-xs text-uxc-muted-foreground">{c.diagram.right}</p>
            </div>
          </div>
        </FadeUp>

        {isAdquirente && (
          <p className="mx-auto mt-8 max-w-4xl text-[15px] leading-[1.7] text-uxc-muted-foreground">
            {c.adquirenteIntro}
          </p>
        )}

        {/* Infrastructure stack */}
        <FadeUp className="mt-8">
          <div className="rounded-[32px] border border-white/10 bg-[#081025] p-7 md:p-[72px]">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-uxc-muted-foreground">
                  {infra.eyebrow}
                </p>
                <h3 className="mt-5 text-balance font-display text-4xl leading-[1.05] md:text-[52px]">
                  {infra.title}
                </h3>
                <p className="mt-6 text-lg leading-[1.6] text-uxc-muted-foreground">
                  {infra.body} <span className="text-white">{infra.bodyHighlight}</span>
                </p>
              </div>

              <div className="flex flex-col gap-[14px]">
                {infra.layers.map((l, i) => (
                  <LayerRow key={l.title} title={l.title} desc={l.desc} delay={0.1 + i * 0.1} />
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                  className="flex items-center justify-between gap-4 rounded-2xl border-2 border-blue bg-blue/20 px-6 py-6 md:min-h-[136px]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue font-display text-base font-bold text-white">
                      UX
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-2xl md:text-[30px]">{infra.ux.title}</h4>
                      <p className="mt-1 text-sm text-white/75">{infra.ux.desc}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-blue">
                    {infra.ux.badge}
                  </span>
                </motion.div>

                <LayerRow title={infra.network.title} desc={infra.network.desc} delay={0.5} />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
