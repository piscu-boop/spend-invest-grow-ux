/**
 * Cliente del backend de leads de UX Campus.
 *
 * El sitio se despliega como estático en GitHub Pages (sin servidor propio),
 * así que — siguiendo la misma convención que ya usa BetaModal
 * (src/components/ui/betaModal.tsx) para hablar con un backend — este
 * "backend" es un Google Apps Script Web App: un único endpoint que
 * multiplexa acciones por el campo `action` del body (register|complete) y
 * guarda el token de HubSpot server-side (PropertiesService), nunca en el
 * bundle del navegador. Ver serverless/campus-leads/ para el código del
 * script y las instrucciones de despliegue.
 *
 * El POST se manda con Content-Type: text/plain — no porque el body no sea
 * JSON (lo es, Code.gs hace JSON.parse(e.postData.contents)), sino para que
 * el navegador lo trate como "simple request" y no dispare un preflight
 * OPTIONS, que Apps Script Web Apps no manejan.
 */

interface LeadsApiResponse {
  ok: boolean;
  message?: string;
}

const SCRIPT_URL = import.meta.env.VITE_CAMPUS_LEADS_SCRIPT_URL as string | undefined;

async function callLeadsScript(params: Record<string, string>): Promise<LeadsApiResponse> {
  if (!SCRIPT_URL) {
    console.warn("[leadsApi] VITE_CAMPUS_LEADS_SCRIPT_URL no configurada — no se enviará el dato.");
    return { ok: false, message: "missing_script_url" };
  }
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err) {
    console.error("[leadsApi] Error llamando al backend de leads:", err);
    return { ok: false, message: "network_error" };
  }
}

export interface RegisterLeadParams {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  modulo_captura: string;
  /** Consentimiento explícito (Ley 25.326 art. 6 + GDPR opt-in) — ver EmailGate.tsx. */
  consentGiven: boolean;
  /** Versión del texto de consentimiento que se le mostró al usuario. */
  consentVersion: string;
}

/**
 * Upsert por email en HubSpot con los datos de atribución, el módulo donde se
 * capturó y el consentimiento otorgado.
 *
 * No mandamos un timestamp de consentimiento generado en el cliente: este
 * endpoint no tiene autenticación, así que un valor mandado por el navegador
 * no es confiable como evidencia legal de cuándo se consintió — Code.gs lo
 * genera server-side, al momento de recibir el request.
 */
export function registerLead(params: RegisterLeadParams): Promise<LeadsApiResponse> {
  return callLeadsScript({
    action: "register",
    email: params.email,
    utm_source: params.utm_source ?? "",
    utm_medium: params.utm_medium ?? "",
    utm_campaign: params.utm_campaign ?? "",
    modulo_captura: params.modulo_captura,
    consent_given: String(params.consentGiven),
    consent_version: params.consentVersion,
  });
}

export interface CompleteModuleParams {
  email: string;
  modulo_id: string;
  score: number;
}

/** Upsert por email seteando moduloN_completado (timestamp) y moduloN_score. */
export function completeModule(params: CompleteModuleParams): Promise<LeadsApiResponse> {
  return callLeadsScript({
    action: "complete",
    email: params.email,
    modulo_id: params.modulo_id,
    score: String(params.score),
  });
}
