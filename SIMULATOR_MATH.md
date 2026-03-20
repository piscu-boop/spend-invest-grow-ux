# Simulador UX Dual — Documentación Matemática

> Versión 2.1 — Marzo 2026
> Archivo: `src/lib/simulatorEngine.ts`

## Resumen

El simulador compara el rendimiento mensual que obtiene un usuario con **UX Dual** vs billeteras tradicionales argentinas, dado un monto inicial, un gasto mensual y un perfil de gasto.

---

## 1. Conversión de Tasa — Interés Compuesto

### Antes (v1.0): Linealización simple
```
tasa_periodo = TNA / 365 × días
```
Subestima el rendimiento real porque ignora la capitalización.

### Ahora (v2.0+): Interés compuesto
```
tasa_periodo = (1 + TNA)^(días/365) − 1
```

**Justificación**: Los FCI money market en Argentina capitalizan diariamente (el valor de cuotaparte crece cada día). La fórmula compuesta refleja esto con precisión.

**Ejemplo**:
- TNA = 23%
- Período = 30 días
- Lineal: 0.23 / 365 × 30 = 1.890%
- Compuesto: (1.23)^(30/365) − 1 = 1.711%

**Implementación**: `tnaToEffectiveRate(tna, days)` en `simulatorEngine.ts`

---

## 2. Modelo de Gasto — Distribución Uniforme Diaria

### Antes (v2.0): 3 Franjas con pesos
El gasto se repartía en 3 franjas con pesos arbitrarios (70/20/10, 20/60/20, 10/20/70). Era una aproximación razonable pero poco intuitiva y difícil de justificar los pesos exactos.

### Ahora (v2.1): Distribución uniforme diaria
El usuario elige un perfil de gasto que mapea a un día `d`:

| Perfil     | Día d |
|------------|-------|
| Principio  | 5     |
| Mitad      | 15    |
| Fin        | 25    |

El gasto total `G` se distribuye **uniformemente** entre los días 1 y d:

```
gasto_diario = G / d
```

Desde el día `d+1` al 30, no se agrega nuevo gasto.

**Justificación**: Es más intuitivo y transparente que asignar pesos arbitrarios a 3 franjas. Refleja mejor el comportamiento real: si alguien gasta "a mitad de mes", su gasto se va distribuyendo día a día hasta el día 15.

**Ejemplo** (perfil "Mitad", gasto $600.000):
- d = 15
- gasto_diario = $600.000 / 15 = $40.000
- Día 1: gasta $40.000 (estuvo invertido 1 día)
- Día 2: gasta $40.000 (estuvo invertido 2 días)
- ...
- Día 15: gasta $40.000 (estuvo invertido 15 días)
- Días 16-30: no hay nuevo gasto

---

## 3. Rendimiento UX Dual

### Dinero no gastado (una sola vez)
```
yieldUnspent = unspent × effectiveRate(TNA_UX, 30)
```

### Dinero gastado — por cada día t (de 1 a d)

**Tramo PRE gasto** (el dinero estuvo invertido t días antes de gastarse):
```
yieldPre_t = gasto_diario × effectiveRate(TNA_UX, t)
```

**Tramo POST gasto** (queda "congelado" e invertido hasta fin de mes):
```
yieldPost_t = gasto_diario × effectiveRate(TNA_UX, 30 − t) × 0.67
```
UX retiene el 33% como fee; el usuario recibe el **67%** del rendimiento post-gasto.

### Total UX
```
Total = yieldUnspent + Σ_{t=1}^{d} (yieldPre_t + yieldPost_t)
```

---

## 4. Rendimiento Billetera Tradicional

### Dinero no gastado
```
yieldUnspent = unspent × effectiveRate(TNA_trad, 30)
```

### Dinero gastado — por cada día t (de 1 a d)
```
yieldSpent_t = gasto_diario × effectiveRate(TNA_trad, t)
```
Una vez gastado, el dinero **deja de generar rendimiento** (sale del FCI).

### Total Tradicional
```
Total = yieldUnspent + Σ_{t=1}^{d} (yieldSpent_t)
```

---

## 5. Diferencial UX Dual

La ventaja de UX Dual proviene exclusivamente del **tramo POST gasto**: el dinero gastado sigue invertido y el usuario recibe el 67% de ese rendimiento adicional.

```
ventaja_mensual = total_UX − total_tradicional
ventaja_anual = ventaja_mensual × 12
```

La proyección anual usa multiplicación simple (no compuesta) porque asumimos que cada mes el usuario vuelve a empezar con un patrón de gasto similar. No reinvierte la diferencia.

---

## 6. Parámetros Configurables

| Parámetro | Valor default | Archivo |
|-----------|--------------|---------|
| TNA UX Dual | 23% | `simulatorRates.ts` → `UX_DUAL_CONFIG.tna` |
| Factor post-gasto | 67% | `simulatorRates.ts` → `UX_DUAL_CONFIG.spentYieldFactor` |
| Días del mes | 30 | `simulatorRates.ts` → `UX_DUAL_CONFIG.monthDays` |
| Día de gasto por perfil | 5/15/25 | `simulatorRates.ts` → `SPEND_MOMENT_MAP` |
| TNA billeteras | Dinámico | `public/rates.json` → `wallets[].tna` |
| Promedio tradicional | Dinámico | `public/rates.json` → `traditional_average_tna` |

---

## 7. Fuente de Tasas

### Arquitectura
```
GitHub Actions (cada 6 horas)
  └─ scripts/fetchRates.cjs
       └─ CAFCI API → normaliza → escribe rates.json
                                        ↓
GitHub Pages sirve /rates.json
                                        ↓
React Query (useRates, stale 15min)
  └─ Si falla → fallback estático (Perfil.com mar-2026)
```

### Fuentes por billetera
| Billetera | Fuente | CAFCI Fund ID | Status |
|-----------|--------|---------------|--------|
| Mercado Pago | CAFCI | 798 / 1982 | Verificado |
| Ualá | CAFCI | 1307 / 3713 | Verificado |
| Naranja X | CAFCI | 1213 / 3355 | Verificado |
| Personal Pay | Fallback | — | Sin fuente CAFCI |
| Prex | Fallback | — | Sin fuente CAFCI |

### Fallback estáticos (Perfil.com, 3 marzo 2026)
- Mercado Pago: 19.35% TNA
- Ualá: 24.00% TNA
- Naranja X: 22.00% TNA
- Personal Pay: 18.98% TNA
- Prex: 23.00% TNA

---

## 8. Ejemplo Numérico Completo

**Inputs**:
- Saldo inicial: $1.000.000
- Gasto mensual: $600.000
- Perfil: "Mitad de mes" (d = 15)
- TNA UX: 23%
- TNA tradicional promedio: 21.47%

**Distribución de gasto** (d = 15):
- gasto_diario = $600.000 / 15 = $40.000
- Se gasta $40.000 por día del día 1 al día 15

**UX Dual**:
1. No gastado ($400.000 × 30 días): $400.000 × 1.711% = $6.845
2. Para cada día t (1..15):
   - PRE: $40.000 × effectiveRate(23%, t)
   - POST: $40.000 × effectiveRate(23%, 30−t) × 0.67
3. Suma PRE (días 1 a 15): ~$3.427
4. Suma POST (días 1 a 15): ~$3.427 × 0.67 ≈ ~$3.444

**Total UX** ≈ $13.716

**Tradicional** (21.47% TNA, sin tramos POST):
1. No gastado ($400.000 × 30d): $400.000 × 1.600% = $6.399
2. Para cada día t (1..15):
   - yield_t = $40.000 × effectiveRate(21.47%, t)
3. Suma spent (días 1 a 15): ~$3.199

**Total Tradicional** ≈ $9.598

**Ventaja mensual UX** ≈ $4.118
**Ventaja anual** ≈ $49.417

---

## 9. Comparación v2.0 (3 franjas) vs v2.1 (uniforme diario)

| Aspecto | v2.0 (3 franjas) | v2.1 (uniforme diario) |
|---------|------------------|------------------------|
| Distribución del gasto | 3 franjas con pesos arbitrarios | Uniforme día a día |
| Transparencia | Pesos difíciles de justificar | Simple: G/d por día |
| Granularidad | 3 puntos representativos | d puntos (uno por día) |
| Resultado numérico | Ligeramente distinto | Más conservador y realista |
| Complejidad de código | 3 iteraciones | d iteraciones (max 25) |

La diferencia en resultados es modesta pero el modelo v2.1 es más transparente y fácil de auditar.

---

## 10. Limitaciones

- No contempla comisiones, impuestos ni inflación.
- La distribución uniforme es una simplificación; el gasto real puede tener picos.
- La TNA no incluye capitalización intra-diaria.
- Las tasas de fallback pueden estar desactualizadas.
- La proyección anual asume comportamiento mensual constante.
