import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Borrador de política de privacidad para UX Campus. Cubre el mínimo
 * exigido por la Ley 25.326 (AR) y el GDPR (UE) para el flujo de captura de
 * email del EmailGate: qué se recolecta, para qué, dónde se guarda y cómo
 * ejercer derechos de acceso/rectificación/eliminación o revocar el
 * consentimiento.
 *
 * IMPORTANTE: este texto es un borrador razonable, no una redacción legal
 * definitiva — está pendiente de revisión por un abogado antes de
 * considerarse válido para producción real.
 */

const content = {
  es: {
    eyebrow: "UX CAMPUS",
    title: "Política de Privacidad — UX Campus",
    updated: "Última actualización: borrador, pendiente de revisión legal.",
    backLabel: "UX Campus",
    intro:
      "Esta política explica, en lenguaje simple, qué datos recolectamos cuando usás UX Campus, para qué los usamos y qué podés hacer si querés cambiar de opinión.",
    sections: [
      {
        heading: "¿Qué datos recolectamos?",
        body: "Tu dirección de email, cuando elegís dejárnosla antes de empezar el test de un módulo. También guardamos de forma automática el canal por el que llegaste al sitio (por ejemplo, si viniste desde una campaña de redes sociales) usando los parámetros UTM de la URL — esto no incluye tu nombre, ni datos sensibles, ni información de pago.",
      },
      {
        heading: "¿Para qué los usamos?",
        body: "Para llevar registro de tu progreso en los módulos de UX Campus (qué módulos completaste y tu puntaje en cada test) y para poder contactarte con contenido educativo relacionado. No vendemos ni compartimos tu email con terceros para fines publicitarios ajenos a UX Capital.",
      },
      {
        heading: "¿Dónde se guardan?",
        body: "Tu email y los datos asociados se almacenan en HubSpot, la plataforma que usamos como base de contactos. HubSpot actúa como nuestro proveedor de almacenamiento; no usa esos datos para fines propios.",
      },
      {
        heading: "Tus derechos: acceso, rectificación y eliminación",
        body: "Podés pedirnos en cualquier momento qué datos tuyos tenemos guardados, corregirlos si están mal, o pedir que los eliminemos por completo. Para cualquiera de estas solicitudes, escribinos a ",
        email: true,
      },
      {
        heading: "Revocar tu consentimiento",
        body: "El consentimiento que diste al marcar el checkbox antes del test se puede retirar en cualquier momento — dejaremos de usar tu email para los fines descriptos acá. Para revocarlo, escribinos al mismo email de contacto.",
      },
    ],
    contactLabel: "info@uxcapital.la",
    draftNotice:
      "Este texto es un borrador razonable para el lanzamiento, no una redacción legal definitiva. Está pendiente de revisión por un abogado antes de considerarse válido para producción.",
  },
  en: {
    eyebrow: "UX CAMPUS",
    title: "Privacy Policy — UX Campus",
    updated: "Last updated: draft, pending legal review.",
    backLabel: "UX Campus",
    intro:
      "This policy explains, in plain language, what data we collect when you use UX Campus, what we use it for, and what you can do if you change your mind.",
    sections: [
      {
        heading: "What data do we collect?",
        body: "Your email address, when you choose to give it to us before starting a module's test. We also automatically store the channel you arrived through (e.g. a social media campaign) using the UTM parameters in the URL — this does not include your name, sensitive data, or payment information.",
      },
      {
        heading: "What do we use it for?",
        body: "To keep track of your progress in UX Campus modules (which modules you completed and your score on each test) and to be able to contact you with related educational content. We do not sell or share your email with third parties for advertising purposes unrelated to UX Capital.",
      },
      {
        heading: "Where is it stored?",
        body: "Your email and associated data are stored in HubSpot, the platform we use as our contact database. HubSpot acts as our storage provider; it does not use this data for its own purposes.",
      },
      {
        heading: "Your rights: access, rectification and deletion",
        body: "You can ask us at any time what data we have on file for you, correct it if it's wrong, or ask us to delete it entirely. For any of these requests, write to us at ",
        email: true,
      },
      {
        heading: "Withdrawing your consent",
        body: "The consent you gave by checking the box before the test can be withdrawn at any time — we'll stop using your email for the purposes described here. To withdraw it, write to the same contact email.",
      },
    ],
    contactLabel: "info@uxcapital.la",
    draftNotice:
      "This text is a reasonable draft for launch, not a final legal text. It is pending review by a lawyer before being considered valid for production.",
  },
};

const CampusPrivacy: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="min-h-screen bg-palette-a">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex items-center gap-2 pt-6 pb-2 text-sm text-uxc-muted-foreground">
            <Link
              to="/campus"
              className="flex items-center gap-1 hover:text-teal transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {c.backLabel}
            </Link>
          </div>

          <div className="py-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-3">
              {c.eyebrow}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-3">
              {c.title}
            </h1>
            <p className="text-xs text-uxc-muted-foreground">{c.updated}</p>
          </div>

          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 px-5 py-4 text-sm text-amber-200 mb-10">
            {c.draftNotice}
          </div>

          <p className="text-base text-uxc-muted-foreground leading-relaxed mb-10">
            {c.intro}
          </p>

          <div className="flex flex-col gap-8">
            {c.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-semibold text-white font-display mb-2">
                  {s.heading}
                </h2>
                <p className="text-sm text-uxc-muted-foreground leading-relaxed">
                  {s.body}
                  {s.email && (
                    <a
                      href={`mailto:${c.contactLabel}`}
                      className="text-teal underline hover:text-teal/80"
                    >
                      {c.contactLabel}
                    </a>
                  )}
                  {s.email ? "." : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CampusPrivacy;
