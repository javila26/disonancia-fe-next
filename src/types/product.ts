import type { VinylImage } from "./vinyl-image";
import type { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  purchasePrice: number;
  discount: number;
  images: VinylImage[];
  available: boolean;
  artist: string;
  year: number;
  stock: number;
  numberOfDiscs: number;
  category: Category;
  description?: string;
  spotifyAlbumId?: string;
  tracklist?: {
    side: string;
    tracks: string[];
  }[];
}
