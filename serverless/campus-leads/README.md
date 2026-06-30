# UX Campus — backend de leads (Google Apps Script)

Este repo se despliega como sitio estático en GitHub Pages: no hay un
servidor Node/Express corriendo en producción. El "backend" de leads es un
Google Apps Script Web App, siguiendo la misma convención que ya usa
`src/components/ui/betaModal.tsx` (ver `scriptURL` en `src/App.tsx`) para la
waitlist. `Code.gs` en esta carpeta es la fuente versionada de ese script;
Apps Script no se despliega automáticamente desde git, así que hay que
copiarlo a mano al editor de Apps Script.

## Prerrequisitos (se hacen una sola vez, a mano)

1. **Private App de HubSpot** (Settings → Integrations → Private Apps) con
   scopes `crm.objects.contacts.read` y `crm.objects.contacts.write`. Copiá
   el token que te da — lo vas a necesitar en el paso 4.
2. **12 propiedades de Contacto** creadas en HubSpot (Settings → Properties
   → Contact properties):
   - `utm_source`, `utm_medium`, `utm_campaign`, `modulo_captura` (texto de
     una línea)
   - `modulo1_completado`, `modulo2_completado`, `modulo3_completado` (fecha)
   - `modulo1_score`, `modulo2_score`, `modulo3_score` (número)
   - `consentimiento_otorgado` — recomendado crearla como **"Date and time
     picker"** (no "Date" simple), porque el valor que mandamos es un ISO
     8601 con hora exacta (`new Date().toISOString()` tomado en el momento
     del submit), no solo la fecha. Es la constancia de cuándo se dio el
     consentimiento (Ley 25.326 art. 6 + GDPR opt-in) — su sola presencia en
     el contacto es la prueba de que se otorgó.
   - `consentimiento_version` (texto de una línea) — qué versión del texto
     de consentimiento aceptó (ver `CONSENT_VERSION` en
     `src/components/EmailGate.tsx`), para poder identificar contactos que
     aceptaron una versión de texto anterior si en el futuro cambia.

## Despliegue del Web App

1. Entrá a [script.google.com](https://script.google.com) → **Proyecto
   nuevo**.
2. Borrá el contenido de `Code.gs` que viene por defecto y pegá el de este
   archivo (`serverless/campus-leads/Code.gs`).
3. **Project Settings** (ícono de engranaje) → **Script Properties** → **Add
   script property**:
   - Property: `HUBSPOT_PRIVATE_APP_TOKEN`
   - Value: el token del Private App del paso 1.
4. **Deploy** → **New deployment** → tipo **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copiá la URL que te da (termina en `/exec`).
6. Pegá esa URL como `VITE_CAMPUS_LEADS_SCRIPT_URL` en tu `.env.local` (ver
   `.env.example` en la raíz del repo).

## Actualizar el script después de un cambio en `Code.gs`

Apps Script no lee de git: si tocás `Code.gs` en este repo, tenés que volver
a copiar el contenido al editor de Apps Script y crear un **New deployment**
(o **Manage deployments** → editar la versión activa) para que el cambio
quede en producción.

## Por qué POST con Content-Type: text/plain

El frontend (`src/lib/leadsApi.ts`) le pega al Web App con `fetch(SCRIPT_URL,
{ method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
body: JSON.stringify(params) })`. El body es JSON igual (`Code.gs` lo parsea
con `JSON.parse(e.postData.contents)` en `doPost`), pero se manda como
`text/plain` para que el navegador lo trate como "simple request" y no
dispare un preflight `OPTIONS` — los Web Apps de Apps Script no responden
ese preflight, así que con `Content-Type: application/json` la llamada
fallaría por CORS. Se usa POST (no GET) para no exponer el email y los UTMs
como query params en logs de servidor, proxies o el historial del navegador.

## Consentimiento (Ley 25.326 + GDPR)

`handleRegister_` en `Code.gs` rechaza el registro (`{ ok: false, message:
"consentimiento requerido" }`) si no llega `consent_given: "true"` y
`consent_timestamp` en el body — el frontend ya bloquea el envío del
formulario sin el checkbox marcado (ver `src/components/EmailGate.tsx`),
pero el backend no debe guardar un lead sin constancia de consentimiento
aunque alguien le pegue directamente al endpoint sin pasar por la UI.

El mismo checkbox del EmailGate también habilita el envío de eventos de
comportamiento a PostHog (`opt_out_capturing_by_default: true` en
`src/lib/analytics.ts`, recién habilitado con `grantAnalyticsConsent()` al
enviar el formulario) — antes de eso, ningún evento (`module_view`,
`pdf_open`, etc.) sale del navegador. Esto significa que las sesiones que
solo leen el PDF y nunca llegan al test no generan ningún evento de
comportamiento, por diseño.

## Qué pasa si HubSpot falla

Las dos rutas (`?action=register`, `?action=complete`) devuelven
`{ ok: false, message: ... }` si el upsert a HubSpot falla — nunca rompen el
flujo del frontend, porque el test ya se completó del lado del usuario; lo
único que falla es el guardado del dato. El frontend no muestra ese error al
usuario (ver `src/lib/leadsApi.ts`), solo lo loguea en consola.
