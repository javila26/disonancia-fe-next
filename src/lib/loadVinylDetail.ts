import type { Product } from "@/types/product";

export async function loadVinylDetail(slug: string): Promise<Product | null> {
  try {
    const resp = await fetch(`${process.env.API_BASE_URL}/vinyls/${slug}`, {
      cache: "force-cache",
      next: { tags: [`vinyls:${slug}`] },
    });

    if (!resp.ok) {
      throw new Error(`Failed to load vinyls: ${resp.status}`);
    }

    const vinylRecord = await resp.json();

    return vinylRecord.data as Product;
  } catch (error) {
    console.error("Error loading vinyls:", error);
    return null;
  }
}
