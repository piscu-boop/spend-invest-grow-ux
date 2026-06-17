# UX Campus Hub — Design Spec
Date: 2026-06-16

## Routes
- `/campus` → `CampusHub.tsx` — intro + module grid
- `/campus/modulo-01` → `Campus.tsx` — PDF reader + test (existing, with breadcrumb added)

## CampusHub sections
1. **Hero** — eyebrow "UX CAMPUS", title "Tu educación financiera empieza acá.", 2-line description
2. **Cómo funciona** — 3 horizontal steps (Leé el módulo / Completá el test / Avanzás de nivel) with lucide icons
3. **Módulos** — card grid, 1 card for now (Módulo 01)

## Module card spec
- Badge: NIVEL 1 (teal)
- Title: Módulo 01 – Finanzas Personales
- Description: "El punto de partida para cualquier persona que quiera entender cómo funciona el dinero."
- Tags: Sistema financiero · Ahorro e inversión · Inflación · Riesgo
- Meta: PDF · 15 preguntas · ~30 min
- CTA: button → `/campus/modulo-01`

## Campus.tsx changes
- Add breadcrumb: UX Campus / Módulo 01
- Add back button: ← Volver al Campus → `/campus`

## i18n
Both pages use inline `content = { es, en }` + `useLanguage()` pattern. All UI text bilingual.

## Files
| File | Action |
|---|---|
| `src/pages/CampusHub.tsx` | Create |
| `src/pages/Campus.tsx` | Edit — add breadcrumb/back |
| `src/App.tsx` | Edit — reroute `/campus` to CampusHub, add `/campus/modulo-01` |
