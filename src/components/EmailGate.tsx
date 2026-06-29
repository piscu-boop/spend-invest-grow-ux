import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAttribution, identifyUser, track } from "@/lib/analytics";
import { registerLead } from "@/lib/leadsApi";

const LEAD_CAPTURED_EMAIL_KEY = "uxcampus_lead_email";

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
  },
  en: {
    title: "Before starting the test",
    subtitle: "Leave us your email to save your progress in UX Campus. We'll only ask once across the whole journey.",
    placeholder: "you@email.com",
    cta: "Continue to test",
    invalid: "Enter a valid email.",
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
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.invalid);
      return;
    }
    setError("");

    const attribution = getAttribution();

    // Best-effort: el guardado en HubSpot no debe bloquear el avance del
    // usuario al test si la red falla o el script no está configurado.
    void registerLead({
      email,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      modulo_captura: moduloCaptura,
    });

    identifyUser(email);
    track("lead_capturado", { modulo_captura: moduloCaptura });
    localStorage.setItem(LEAD_CAPTURED_EMAIL_KEY, email);

    onComplete(email);
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-uxc-card p-6 md:p-8 text-center">
      <h3 className="text-lg font-semibold text-white font-display mb-2">{t.title}</h3>
      <p className="text-sm text-uxc-muted-foreground leading-relaxed mb-6">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-uxc-muted-foreground focus:outline-none focus:border-teal/50"
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          className="rounded-full bg-teal text-navy-deep font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
        >
          {t.cta}
        </button>
      </form>
    </div>
  );
};

export default EmailGate;
