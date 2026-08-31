import { Category } from "@/types/category";

type CategoriesResponse = {
  data: Category[];
  pagination?: { total?: number };
};

export async function loadCategories(page: number, limit: number): Promise<{ categories: Category[]; total: number }> {
  try {
    const resp = await fetch(`${process.env.API_BASE_URL}/categories?page=${page}&limit=${limit}`, {
      next: { revalidate: 60 },
    });

    if (!resp.ok) {
      throw new Error(`Failed to load categories: ${resp.status}`);
    }

    const categoryRecords = (await resp.json()) as CategoriesResponse;

    return {
      categories: categoryRecords.data,
      total: categoryRecords.pagination?.total ?? categoryRecords.data.length,
    };
  } catch (error) {
    console.error("Error loading categories:", error);
    return { categories: [], total: 0 };
  }
}
