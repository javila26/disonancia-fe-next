import type { EntityResponse, PaginatedResponse } from "@/types/api";
import type { Product } from "@/types/product";
import api from "@/lib/api";
import { create } from "zustand";

type PriceRange = [number, number];
type Availability = "available" | "unavailable" | null;

interface ProductStore {
  products: Product[];
  currentProduct: Product | null;
  priceFilter: PriceRange | null;
  availabilityFilter: Availability;
  loading: boolean;
  hasMore: boolean;
  total: number;
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  setPriceFilter: (range: PriceRange | null) => void;
  setAvailabilityFilter: (value: Availability) => void;
  getProductById: (id: string) => void;
  getFilteredProducts: () => Product[]; // ✅ This is our new utility
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  currentProduct: null,
  priceFilter: null,
  availabilityFilter: null,
  loading: false,
  hasMore: true,
  total: 0,

  fetchProducts: async (page = 0, limit = 10) => {
    set({ loading: true });

    try {
      const { data } = await api.get<PaginatedResponse<Product>>("/api/vinyls", {
        params: { page, limit },
      });

      if (data.success) {
        set({
          products: data.data,
          total: data.pagination.total,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set({ loading: false });
    }
  },

  setPriceFilter: (range) => set({ priceFilter: range }),
  setAvailabilityFilter: (value) => set({ availabilityFilter: value }),

  getProductById: async (id) => {
    try {
      set({ loading: true });
      const { products } = get();

      let product = products.find((p) => p.id === id);

      if (!product) {
        const response = await api.get<EntityResponse<Product>>(`/api/vinyls/${id}`);
        const data = response.data;

        if (data.success) {
          product = data.data;
        }
      }

      if (product) {
        set({ currentProduct: product });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set({ loading: false });
    }
  },

  getFilteredProducts: () => {
    const { products, priceFilter, availabilityFilter } = get();

    return products.filter((product) => {
      const matchesPrice = !priceFilter || (product.price >= priceFilter[0] && product.price <= priceFilter[1]);

      const matchesAvailability =
        !availabilityFilter ||
        (availabilityFilter === "available" && product.available) ||
        (availabilityFilter === "unavailable" && !product.available);

      return matchesPrice && matchesAvailability;
    });
  },
}));
