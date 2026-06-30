/**
 * UX Campus — backend de leads, corriendo como Google Apps Script Web App.
 *
 * Por qué Apps Script y no un Express/Vercel function: este repo se
 * despliega 100% estático en GitHub Pages (sin servidor propio — ver
 * scripts/fetchRates.cjs y el workflow update-rates.yml, que son el único
 * "backend" hoy, corriendo offline vía GitHub Actions). El proyecto ya tiene
 * un precedente idéntico para este problema: src/components/ui/betaModal.tsx
 * le pega a otro Web App de Apps Script (ver scriptURL en src/App.tsx) para
 * registrar leads de la waitlist sin necesidad de levantar un servidor.
 * Replicamos exactamente esa convención acá, en vez de introducir Express,
 * Vercel Functions u otra pieza de infraestructura nueva.
 *
 * El token de HubSpot vive ÚNICAMENTE en las Script Properties de este
 * proyecto de Apps Script. Nunca se commitea, nunca llega al navegador: el
 * código del frontend solo conoce la URL pública de este Web App (que no es
 * secreta — la seguridad la da el token guardado acá, server-side).
 *
 * ── Despliegue ──────────────────────────────────────────────────────────
 * Ver README.md en esta misma carpeta para el paso a paso completo.
 */

var HUBSPOT_UPSERT_URL = "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert";

// Deliberadamente permisiva: solo bloquea errores estructurales obvios (sin
// @, sin dominio, espacios). No usamos una regex tipo RFC 5322 completa —
// son innecesariamente complejas y terminan rechazando direcciones válidas
// reales. Acepta subdominios, plus-addressing (nombre+test@dominio.com), etc.
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var MAX_EMAIL_LENGTH = 254; // límite práctico de RFC 5321

// Dominios de email descartables/temporales conocidos, para evitar que
// alguien destrabe el test con un email sin intención real de ser
// contactado. Lista corta y estática, ampliable a mano — un servicio
// externo de verificación sería sobre-ingeniería para esta escala.
var DISPOSABLE_EMAIL_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "yopmail.com",
  "trashmail.com",
  "throwawaymail.com",
  "fakeinbox.com",
];

function isValidEmailFormat_(email) {
  return email.length > 0 && email.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(email);
}

function isDisposableEmail_(email) {
  var domain = email.split("@")[1];
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.indexOf(domain.toLowerCase()) !== -1;
}

function getHubspotToken_() {
  var token = PropertiesService.getScriptProperties().getProperty("HUBSPOT_PRIVATE_APP_TOKEN");
  if (!token) {
    throw new Error("HUBSPOT_PRIVATE_APP_TOKEN no está configurado en Script Properties.");
  }
  return token;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Upsert por email en HubSpot (Contacts API v3, batch upsert con
 * idProperty: "email"). Nunca crea un contacto sin antes intentar
 * matchear por email, evitando duplicados.
 */
function upsertContact_(email, properties) {
  var payload = {
    inputs: [
      {
        idProperty: "email",
        id: email,
        properties: properties,
      },
    ],
  };

  var response = UrlFetchApp.fetch(HUBSPOT_UPSERT_URL, {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + getHubspotToken_() },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var status = response.getResponseCode();
  if (status < 200 || status >= 300) {
    throw new Error("HubSpot upsert falló (" + status + "): " + response.getContentText());
  }

  return JSON.parse(response.getContentText());
}

function handleRegister_(params) {
  // Trim: la validación de formato y de dominio descartable corre sobre el
  // valor ya recortado, y es ese valor el que se guarda en HubSpot.
  var email = (params.email || "").trim();

  if (!isValidEmailFormat_(email)) {
    // Defensa en profundidad: el frontend ya valida el formato con la misma
    // regex antes de llamar acá, pero este endpoint es público — cualquiera
    // puede pegarle directo sin pasar por la UI.
    return jsonResponse_({ ok: false, reason: "invalid_email", message: "Email inválido" });
  }
  if (isDisposableEmail_(email)) {
    return jsonResponse_({
      ok: false,
      reason: "disposable_domain",
      message: "Usá un email donde podamos contactarte",
    });
  }
  if (params.consent_given !== "true") {
    // Defensa en profundidad: el frontend ya bloquea el submit sin consentimiento
    // marcado, pero el backend no debe guardar un lead sin constancia de consentimiento.
    return jsonResponse_({ ok: false, reason: "consent_required", message: "consentimiento requerido" });
  }

  var properties = {
    email: email,
    utm_source: params.utm_source || "",
    utm_medium: params.utm_medium || "",
    utm_campaign: params.utm_campaign || "",
    modulo_captura: params.modulo_captura || "",
    // Ley 25.326 art. 6 + GDPR opt-in: queda constancia de cuándo se dio el
    // consentimiento y bajo qué versión de texto, no solo que "se pidió en pantalla".
    //
    // El timestamp se genera ACÁ, server-side, en vez de confiar en un valor
    // mandado por el cliente — este endpoint no tiene autenticación (mismo
    // modelo que betaModal.tsx), así que cualquiera con la URL podría mandar
    // cualquier fecha si confiáramos en params.consent_timestamp. Generarlo acá
    // no prueba que un humano real tildó el checkbox, pero al menos garantiza
    // que la fecha registrada es cuándo el servidor recibió el pedido, no un
    // valor arbitrario fabricado por quien sea que llamó al endpoint.
    consentimiento_otorgado: new Date().toISOString(),
    consentimiento_version: params.consent_version || "",
  };

  try {
    upsertContact_(email, properties);
    return jsonResponse_({ ok: true });
  } catch (err) {
    console.error("Error registrando lead en HubSpot: " + err);
    return jsonResponse_({ ok: false, message: "No se pudo guardar el lead" });
  }
}

function handleComplete_(params) {
  var email = params.email;
  var moduloId = params.modulo_id;
  if (!email || !moduloId) {
    return jsonResponse_({ ok: false, message: "email y modulo_id son requeridos" });
  }

  var properties = {};
  properties["modulo" + moduloId + "_completado"] = new Date().toISOString();
  properties["modulo" + moduloId + "_score"] = params.score !== undefined ? Number(params.score) : null;

  try {
    upsertContact_(email, properties);
    return jsonResponse_({ ok: true });
  } catch (err) {
    console.error("Error registrando completion en HubSpot: " + err);
    return jsonResponse_({ ok: false, message: "No se pudo guardar el progreso" });
  }
}

/**
 * Único punto de entrada del Web App. Se usa POST (no GET) para no mandar
 * el email y los datos de atribución como query params visibles en logs de
 * servidor/proxy/historial del navegador. El body va como JSON, pero el
 * fetch del frontend lo manda con Content-Type: text/plain — eso evita el
 * preflight CORS (OPTIONS) que los Web Apps de Apps Script no responden,
 * sin necesidad de configurar headers de CORS acá.
 *
 *   POST body: {"action":"register","email":"...","utm_source":"...","modulo_captura":"...","consent_given":"true","consent_version":"v2"}
 *   POST body: {"action":"complete","email":"...","modulo_id":"...","score":"..."}
 *
 * Nota: consent_timestamp ya NO se recibe del cliente — ver el comentario en
 * handleRegister_ sobre por qué se genera server-side.
 */
function doPost(e) {
  var params = JSON.parse(e.postData.contents);
  switch (params.action) {
    case "register":
      return handleRegister_(params);
    case "complete":
      return handleComplete_(params);
    default:
      return jsonResponse_({ ok: false, message: "action desconocida" });
  }
}
