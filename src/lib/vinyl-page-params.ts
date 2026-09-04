import type { VinylFilters } from "@/lib/loadVinyls";

export type VinylPageSearchParams = Record<string, string | string[] | undefined>;

export function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : fallback;
}

export function getVinylFilters(query: VinylPageSearchParams): VinylFilters {
  const single = (key: string) => getSingleParam(query[key]);
  const minPrice = single("minPrice");
  const maxPrice = single("maxPrice");

  return {
    category: single("category") || undefined,
    available: single("available") === "true" || single("available") === "false" ? single("available") : undefined,
    minPrice: minPrice && Number.isFinite(Number(minPrice)) && Number(minPrice) >= 0 ? minPrice : undefined,
    maxPrice: maxPrice && Number.isFinite(Number(maxPrice)) && Number(maxPrice) >= 0 ? maxPrice : undefined,
  };
}
