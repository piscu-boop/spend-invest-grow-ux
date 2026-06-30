import posthog from "posthog-js";

const ATTRIBUTION_KEY = "uxcampus_attribution";
const SEEN_EVENTS_KEY = "uxcampus_seen_events";

export interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  referrer: string;
  capturado_en: string;
}

const EMPTY_ATTRIBUTION: Attribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  referrer: "",
  capturado_en: "",
};

let initialized = false;
let posthogReady = false;

function captureAttributionFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    referrer: document.referrer || "",
    capturado_en: new Date().toISOString(),
  };
}

/**
 * Atribución first-touch: se guarda solo si todavía no había una guardada,
 * para que el canal de la primera visita no se pise con navegación interna
 * sin UTMs.
 */
export function getAttribution(): Attribution {
  const raw = localStorage.getItem(ATTRIBUTION_KEY);
  if (!raw) return EMPTY_ATTRIBUTION;
  try {
    return { ...EMPTY_ATTRIBUTION, ...JSON.parse(raw) };
  } catch {
    return EMPTY_ATTRIBUTION;
  }
}

/**
 * Punto de entrada único: capturar atribución first-touch e inicializar
 * PostHog. Debe llamarse una sola vez en el punto de entrada global de la
 * app (no por ruta), porque la primera visita puede caer en cualquier página.
 */
export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;

  if (!localStorage.getItem(ATTRIBUTION_KEY)) {
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(captureAttributionFromUrl()));
  }

  const posthogKey = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!posthogKey) {
    console.warn("[analytics] VITE_POSTHOG_KEY no configurada — PostHog deshabilitado.");
    return;
  }

  posthog.init(posthogKey, {
    api_host: (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://us.i.posthog.com",
    capture_pageview: true,
    // GDPR: no se manda ningún evento de comportamiento (ni siquiera el
    // pageview automático) hasta que grantAnalyticsConsent() lo habilite.
    // PostHog persiste el estado de opt-in en su propio storage, así que
    // una vez otorgado el consentimiento queda recordado entre sesiones.
    opt_out_capturing_by_default: true,
  });
  posthogReady = true;

  posthog.register(getAttribution());
}

/**
 * Habilita el envío de eventos de comportamiento a PostHog. Debe llamarse
 * solo en respuesta a un consentimiento explícito del usuario (el checkbox
 * del EmailGate) — nunca automáticamente. PostHog recuerda este estado
 * entre sesiones, así que no hace falta volver a pedirlo en cada módulo.
 */
export function grantAnalyticsConsent(): void {
  if (!posthogReady) return;
  posthog.opt_in_capturing();
}

export function hasAnalyticsConsent(): boolean {
  if (!posthogReady) return false;
  return posthog.has_opted_in_capturing();
}

/** Única función que debe llamar a posthog.capture en toda la app. */
export function track(eventName: string, properties: Record<string, unknown> = {}): void {
  if (!posthogReady) return;
  posthog.capture(eventName, properties);
}

/**
 * Igual que track(), pero deduplicado por sessionStorage para que eventos de
 * "entrada" (module_view, pdf_open, test_start) no se disparen de nuevo cada
 * vez que el usuario cambia de tab y Radix vuelve a montar el componente.
 */
export function trackOnce(eventName: string, properties: Record<string, unknown> = {}): void {
  const key = `${eventName}:${JSON.stringify(properties)}`;
  let seen: string[] = [];
  try {
    seen = JSON.parse(sessionStorage.getItem(SEEN_EVENTS_KEY) || "[]");
  } catch {
    seen = [];
  }
  if (seen.includes(key)) return;
  sessionStorage.setItem(SEEN_EVENTS_KEY, JSON.stringify([...seen, key]));
  track(eventName, properties);
}

export function identifyUser(email: string): void {
  if (!posthogReady) return;
  posthog.identify(email, getAttribution());
}
