import type { EntityResponse, PaginatedResponse } from "@/types/api";
import type { Category } from "@/types/category";
import api from "@/lib/api";
import { create } from "zustand";

type CategoryPayload = FormData;

interface CategoryStore {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  hasMore: boolean;
  total: number;
  fetchCategories: (page?: number, limit?: number) => Promise<void>;
  getCategoryById: (id: string) => Promise<void>;
  addCategory: (body: CategoryPayload) => Promise<boolean>;
  updateCategory: (id: string, body: CategoryPayload) => Promise<boolean>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  currentCategory: null,
  loading: false,
  hasMore: true,
  total: 0,

  fetchCategories: async (page = 0, limit = 10) => {
    set({ loading: true });

    try {
      const { data } = await api.get<PaginatedResponse<Category>>("/categories", {
        params: { page, limit },
      });

      if (data.success) {
        set({
          categories: data.data,
          total: data.pagination.total,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set({ loading: false });
    }
  },

  getCategoryById: async (id) => {
    try {
      set({ loading: true });
      const { categories } = get();

      let category = categories.find((item) => item.id === id) ?? null;

      if (!category) {
        const response = await api.get<EntityResponse<Category>>(`/categories/${id}`);
        const data = response.data;

        if (data.success) {
          category = data.data;
        }
      }

      set({ currentCategory: category });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set({ loading: false });
    }
  },

  addCategory: async (body) => {
    try {
      set({ loading: true });

      const response = await api.post<EntityResponse<Category>>("/categories", body);
      const data = response.data;

      if (data.success && data.data) {
        set((state) => ({
          categories: [data.data, ...state.categories],
          total: state.total + 1,
        }));
      }

      return Boolean(data.success);
    } catch (error) {
      console.error("Create error:", error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (id, body) => {
    try {
      set({ loading: true });

      const response = await api.patch<EntityResponse<Category>>(`/categories/${id}`, body);
      const data = response.data;

      if (data.success && data.data) {
        set((state) => ({
          currentCategory: data.data,
          categories: state.categories.map((category) => (category.id === id ? data.data : category)),
        }));
      }

      return Boolean(data.success);
    } catch (error) {
      console.error("Update error:", error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
