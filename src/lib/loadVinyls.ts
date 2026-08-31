import type { Product } from "@/types/product";

type VinylListResponse = {
  data: Product[];
  pagination?: { total?: number };
};

export type VinylFilters = {
  category?: string;
  available?: string;
  minPrice?: string;
  maxPrice?: string;
};

export async function loadVinyls(
  page: number,
  limit: number,
  filters: VinylFilters = {},
): Promise<{ vinylRecords: Product[]; total: number }> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const resp = await fetch(`${process.env.API_BASE_URL}/vinyls?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!resp.ok) {
      throw new Error(`Failed to load vinyls: ${resp.status}`);
    }

    const vinylRecords = (await resp.json()) as VinylListResponse;

    return {
      vinylRecords: vinylRecords.data,
      total: vinylRecords.pagination?.total ?? vinylRecords.data.length,
    };
  } catch (error) {
    console.error("Error loading vinyls:", error);
    return { vinylRecords: [], total: 0 };
  }
}
