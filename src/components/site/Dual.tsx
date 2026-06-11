import { QrCode, Sparkles, Store, Wallet } from "lucide-react";
import { FadeUp, ScaleIn } from "./Reveal";

const userFeatures = [
  { icon: Wallet, t: "Saldo siempre invertido", b: "Tu plata trabaja 24.7 - Incluso despues de pagar." },
  { icon: QrCode, t: "Pagas con QR", b: "Pagas como siempre, con tu banco, con nuestra app, en los comercios adheridos." },
  { icon: Sparkles, t: "Invertis sin ahorros, pagando.", b: "Alguna vez pensaste que iba a ser posible? " },
];

const merchantFeatures = [
  { t: "Fidelidad real, no puntos", b: "Tus clientes invierten cuando te compran. Cada pago en tu marca hace crecer su plata — y los trae de vuelta." },
  { t: "Menores costos de adquisición", b: "El incentivo a invertir está integrado al pago. No bancas descuentos ni campañas para que vuelvan." },
  { t: "Retención que se acumula", b: "Cuanto más te compran, más rinde su saldo. La relación con tu marca deja de competir solo por precio." },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto flex w-[260px] items-center justify-center">
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,150,0.25) 0%, rgba(0,200,150,0.08) 70%, transparent 100%)",
          transform: "translate(-5%, -5%)",
        }}
      />
      <img
        src="/lovable-uploads/200931e1-23f7-4c91-8aa2-73df09bab162.png"
        alt="UX Dual App"
        className="relative z-10 w-full drop-shadow-2xl"
      />
    </div>
  );
}

export function Dual() {
  return (
    <section id="ux-dual" className="bg-palette-b relative overflow-hidden px-6 py-32 md:py-44">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 10%, rgba(0,200,150,0.18), transparent 50%), radial-gradient(at 100% 60%, rgba(0,200,150,0.10), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Intro */}
        <div className="max-w-3xl">
          <FadeUp>
            <p className="eyebrow text-teal">UX Dual</p>
          </FadeUp>
          <FadeUp delay={0.025}>
            <img
              src="/lovable-uploads/logo-dual.png"
              alt="UX Dual"
              className="mt-6 h-10 w-auto"
            />
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-6 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              Una app. Dos caras. Pagás y tu plata sigue trabajando.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-[1.7] text-uxc-muted-foreground">
              La red de pagos donde cada compra es una inversión. Para usuarios
              y comercios
            </p>
          </FadeUp>
        </div>

        {/* User block */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <ScaleIn>
            <PhoneMockup />
          </ScaleIn>
          <div>
            <FadeUp>
              <p className="eyebrow text-teal">Para vos</p>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">
                Tu plata, finalmente, te paga por usarla.
              </h3>
            </FadeUp>
            <div className="mt-8 space-y-5">
              {userFeatures.map((f, i) => (
                <FadeUp key={f.t} delay={i * 0.05}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg">{f.t}</h4>
                      <p className="mt-1 text-sm leading-[1.7] text-uxc-muted-foreground">
                        {f.b}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Merchant block */}
        <div className="mt-32 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <FadeUp>
              <p className="eyebrow text-teal">Para comercios</p>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">
                Tus clientes invierten cuando te compran a vos.
              </h3>
            </FadeUp>
            <div className="mt-8 space-y-4">
              {merchantFeatures.map((f, i) => (
                <FadeUp key={f.t} delay={i * 0.05}>
                  <div className="border-l-2 border-teal/60 pl-5">
                    <h4 className="font-display text-lg">{f.t}</h4>
                    <p className="mt-1 text-sm leading-[1.7] text-uxc-muted-foreground">
                      {f.b}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.2}>
              <a
                href="#contacto"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-navy-deep transition hover:opacity-90"
              >
                Hablar con ventas
              </a>
            </FadeUp>
          </div>
          <ScaleIn delay={0.1} className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
              <Store className="h-10 w-10 text-teal" />
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white/[0.03] p-4">
                  <p className="text-xs text-uxc-muted-foreground">Hoy</p>
                  <p className="mt-1 font-display text-2xl">$ 184.220</p>
                  <p className="mt-1 text-xs text-teal">↑ 18% vs ayer</p>
                </div>
                <div className="rounded-2xl bg-white/[0.03] p-4">
                  <p className="text-xs text-uxc-muted-foreground">A liquidar</p>
                  <p className="mt-1 font-display text-2xl">$ 92.110</p>
                  <p className="mt-1 text-xs text-uxc-muted-foreground">Mañana 9:00</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-white/[0.03] p-4">
                  <div className="flex items-end justify-between gap-1">
                    {[28, 42, 36, 55, 48, 70, 62].map((h, i) => (
                      <div
                        key={i}
                        className="w-full rounded-md bg-teal/70"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-uxc-muted-foreground">
                    Operaciones · últimos 7 días
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
