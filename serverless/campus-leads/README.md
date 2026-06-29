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
2. **10 propiedades de Contacto** creadas en HubSpot (Settings → Properties
   → Contact properties):
   - `utm_source`, `utm_medium`, `utm_campaign`, `modulo_captura` (texto de
     una línea)
   - `modulo1_completado`, `modulo2_completado`, `modulo3_completado` (fecha)
   - `modulo1_score`, `modulo2_score`, `modulo3_score` (número)

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

## Qué pasa si HubSpot falla

Las dos rutas (`?action=register`, `?action=complete`) devuelven
`{ ok: false, message: ... }` si el upsert a HubSpot falla — nunca rompen el
flujo del frontend, porque el test ya se completó del lado del usuario; lo
único que falla es el guardado del dato. El frontend no muestra ese error al
usuario (ver `src/lib/leadsApi.ts`), solo lo loguea en consola.
