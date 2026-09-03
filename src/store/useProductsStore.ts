import type { EntityResponse, PaginatedResponse } from "@/types/api";
import type { Product } from "@/types/product";
import api from "@/lib/api";
import { revalidateVinylCache } from "@/app/actions/vinyl-cache";
import { create } from "zustand";

type PriceRange = [number, number];
type Availability = "available" | "unavailable" | null;
type ProductImagePayload = {
  type: "cover" | "back" | "gallery";
  value: string;
};
type ProductPayload = {
  name: string;
  slug: string;
  artist: string;
  spotifyAlbumId: string;
  year: number;
  price: number;
  purchasePrice: number;
  discount: number;
  stock: number;
  category: string;
  numberOfDiscs: number;
  tracklist: {
    side: string;
    tracks: string[];
  }[];
  available: boolean;
  images: ProductImagePayload[];
};
type ProductUpdatePayload = Omit<ProductPayload, "images"> & {
  images?: ProductImagePayload[];
};

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
  addProduct: (body: ProductPayload) => Promise<boolean>;
  updateProduct: (id: string, body: ProductUpdatePayload) => Promise<boolean>;
  removeProduct: (id: string) => Promise<boolean>;
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
      const { data } = await api.get<PaginatedResponse<Product>>("/vinyls", {
        params: { page, limit },
      });

      if (data.success) {
        // console.log("Fetched products:", data.data);
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
        const response = await api.get<EntityResponse<Product>>(`/vinyls/${id}`);
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

  addProduct: async (body) => {
    try {
      set({ loading: true });

      const response = await api.post<EntityResponse<Product>>("/vinyls", body);
      const data = response.data;

      if (data.success && data.data) {
        set((state) => ({
          products: [data.data, ...state.products],
          total: state.total + 1,
        }));
        await revalidateVinylCache(data.data.slug);
      }

      return Boolean(data.success);
    } catch (error) {
      console.error("Create error:", error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, body) => {
    try {
      set({ loading: true });

      const response = await api.patch<EntityResponse<Product>>(`/vinyls/${id}`, body);
      const data = response.data;

      if (data.success && data.data) {
        set((state) => ({
          currentProduct: data.data,
          products: state.products.map((product) => (product.id === id ? data.data : product)),
        }));
        await revalidateVinylCache(data.data.slug ?? body.slug);
      }

      return Boolean(data.success);
    } catch (error) {
      console.error("Update error:", error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  removeProduct: async (id) => {
    try {
      set({ loading: true });
      const slug = get().products.find((product) => product.id === id)?.slug;

      const response = await api.delete<{ success: boolean }>(`/vinyls/${id}`);
      const data = response.data;

      if (data.success) {
        set((state) => ({
          currentProduct: state.currentProduct?.id === id ? null : state.currentProduct,
          products: state.products.filter((product) => product.id !== id),
          total: Math.max(0, state.total - 1),
        }));
        await revalidateVinylCache(slug);
      }

      return Boolean(data.success);
    } catch (error) {
      console.error("Delete error:", error);
      return false;
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
