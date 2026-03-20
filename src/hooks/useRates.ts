// ============================================================
// useRates — hook de tasas para el simulador UX Dual
// ============================================================
// Usa React Query (ya configurado en App.tsx) para:
//   - Obtener tasas desde ratesService.fetchRates()
//   - Cache de 15 minutos (staleTime)
//   - Reintentos automáticos (2 veces)
//   - Fallback transparente a FALLBACK_RATES si falla la fuente
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchRates,
  FALLBACK_RATES,
  type RatesPayload,
} from "@/services/ratesService";

export interface UseRatesResult {
  /** Tasas disponibles (live o fallback). Nunca undefined. */
  rates: RatesPayload;
  /** true mientras se hace el primer fetch */
  isLoading: boolean;
  /** true si el fetch falló y se está usando fallback */
  isError: boolean;
  /** true si los datos provienen de fallback estático (error o primer load) */
  isFallback: boolean;
  /** Fecha de última actualización de la fuente externa (o 'referencia' si es fallback) */
  lastUpdated: string;
}

export function useRates(): UseRatesResult {
  const query = useQuery<RatesPayload, Error>({
    queryKey: ["simulator-rates"],
    queryFn: fetchRates,
    staleTime: 1000 * 60 * 15,  // 15 min antes de considerar stale
    gcTime:    1000 * 60 * 30,  // 30 min en caché GC (antes llamado cacheTime)
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
  });

  // Si el fetch falló o todavía no resolvió, usamos el fallback
  const rates: RatesPayload = query.data ?? FALLBACK_RATES;

  return {
    rates,
    isLoading: query.isLoading,
    isError:   query.isError,
    isFallback: rates.isFallback || query.isError,
    lastUpdated: rates.lastUpdated,
  };
}
