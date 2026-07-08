import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAttribution, identifyUser, track } from "@/lib/analytics";
import { registerLead } from "@/lib/leadsApi";

const LEAD_CAPTURED_EMAIL_KEY = "uxcampus_lead_email";

// Misma regex que Code.gs (handleRegister_) — deliberadamente permisiva:
// solo bloquea errores estructurales obvios (sin @, sin dominio, espacios).
// No es una validación tipo RFC 5322 completa a propósito, esas terminan
// rechazando direcciones válidas reales. Acepta subdominios, plus-addressing
// (nombre+test@dominio.com), etc. Esta es solo feedback inmediato en el
// cliente — la validación que realmente protege corre en el backend.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254; // límite práctico de RFC 5321

// Misma lista que Code.gs — validación instantánea en el cliente, sin esperar
// el round-trip al backend. La lista del servidor sigue siendo la autoridad
// para quien llame al endpoint directamente sin pasar por la UI.
const DISPOSABLE_EMAIL_DOMAINS = [
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "tempmail.com", "yopmail.com", "trashmail.com",
  "throwawaymail.com", "fakeinbox.com",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1];
  return domain ? DISPOSABLE_EMAIL_DOMAINS.includes(domain.toLowerCase()) : false;
}

// Versión del texto de consentimiento mostrado al usuario. Si el texto
// cambia de forma sustantiva en el futuro, subir este valor para poder
// distinguir bajo qué versión aceptó cada contacto en HubSpot.
// v3: el tracking anónimo de comportamiento (PostHog) ya no depende de este
// checkbox — corre desde que la persona entra al sitio. Este checkbox vuelve
// a estar acotado a lo que sí controla: usar el email para HubSpot/contacto.
const CONSENT_VERSION = "v3";

export function hasCapturedLead(): boolean {
  return Boolean(localStorage.getItem(LEAD_CAPTURED_EMAIL_KEY));
}

export function getCapturedEmail(): string | null {
  return localStorage.getItem(LEAD_CAPTURED_EMAIL_KEY);
}

const ui = {
  es: {
    title: "Antes de empezar el test",
    subtitle: "Dejanos tu email para guardar tu progreso en UX Campus. Te lo pedimos una sola vez en todo el recorrido.",
    placeholder: "tu@email.com",
    cta: "Continuar al test",
    invalid: "Ingresá un email válido.",
    disposableDomain: "Usá un email donde podamos contactarte.",
    consentRequired: "Tenés que aceptar la Política de Privacidad para continuar.",
    consentBefore: "Acepto que UX Capital use mi email para darme seguimiento de mi progreso en UX Campus y contactarme con contenido relacionado. Ver ",
    consentLink: "Política de Privacidad",
    consentAfter: ".",
  },
  en: {
    title: "Before starting the test",
    subtitle: "Leave us your email to save your progress in UX Campus. We'll only ask once across the whole journey.",
    placeholder: "you@email.com",
    cta: "Continue to test",
    invalid: "Enter a valid email.",
    disposableDomain: "Please use an email where we can reach you.",
    consentRequired: "You need to accept the Privacy Policy to continue.",
    consentBefore: "I agree that UX Capital uses my email to track my progress in UX Campus and contact me with related content. See ",
    consentLink: "Privacy Policy",
    consentAfter: ".",
  },
};

interface EmailGateProps {
  moduloCaptura: string;
  onComplete: (email: string) => void;
}

const EmailGate: React.FC<EmailGateProps> = ({ moduloCaptura, onComplete }) => {
  const { language } = useLanguage();
  const t = ui[language];
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0 || trimmedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(trimmedEmail)) {
      setError(t.invalid);
      return;
    }
    if (isDisposableEmail(trimmedEmail)) {
      setError(t.disposableDomain);
      return;
    }
    // Defensa en profundidad: el botón ya queda visualmente bloqueado sin el
    // checkbox marcado, pero si de algún modo se intenta enviar igual (por
    // ejemplo presionando Enter), no se avanza sin un mensaje explícito. No
    // tocamos consentChecked en ningún error de acá abajo, para que el
    // usuario pueda corregir el email sin perder el checkbox ya marcado.
    if (!consentChecked) {
      setError(t.consentRequired);
      return;
    }
    setError("");

    const attribution = getAttribution();

    // Fire-and-forget: la validación de dominio descartable ya ocurrió en el
    // cliente. El backend sigue siendo la autoridad para llamadas directas
    // que no pasen por la UI, pero no bloqueamos la UX esperando su respuesta.
    // No mandamos un timestamp: Code.gs lo genera server-side.
    void registerLead({
      email: trimmedEmail,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      modulo_captura: moduloCaptura,
      consentGiven: true,
      consentVersion: CONSENT_VERSION,
    });

    // PostHog ya venía trackeando esta sesión de forma anónima desde que
    // entró al sitio (no depende de este checkbox) — acá la ligamos a un
    // email real, que es lo que sí requiere este consentimiento explícito.
    identifyUser(trimmedEmail);
    track("lead_capturado", { modulo_captura: moduloCaptura });
    localStorage.setItem(LEAD_CAPTURED_EMAIL_KEY, trimmedEmail);

    onComplete(trimmedEmail);
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-uxc-card p-6 md:p-8 text-center">
      <h3 className="text-lg font-semibold text-white font-display mb-2">{t.title}</h3>
      <p className="text-sm text-uxc-muted-foreground leading-relaxed mb-6">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-uxc-muted-foreground focus:outline-none focus:border-teal/50"
        />

        <label className="flex items-start gap-2.5 text-left text-xs text-uxc-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded accent-teal"
          />
          <span>
            {t.consentBefore}
            <Link
              to="/campus/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-teal hover:text-teal/80"
            >
              {t.consentLink}
            </Link>
            {t.consentAfter}
          </span>
        </label>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          className={`rounded-full font-semibold px-6 py-3 transition-opacity ${
            consentChecked
              ? "bg-teal text-navy-deep hover:opacity-90"
              : "bg-teal/40 text-navy-deep/70 cursor-not-allowed"
          }`}
        >
          {t.cta}
        </button>
      </form>
    </div>
  );
};

export default EmailGate;
