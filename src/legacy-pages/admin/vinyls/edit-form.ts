"use client";

import type { VinylImage } from "@/types/vinyl-image";
import type { Product } from "@/types/product";

const VINYL_IMAGE_TYPES = ["cover", "back", "gallery"] as const;

type VinylImageType = (typeof VINYL_IMAGE_TYPES)[number];

export type VinylTracklist = {
  side: string;
  tracks: string[];
}[];

export type VinylFormState = {
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
  tracklist: VinylTracklist;
  available: string;
  images: [File | null, File | null, File | null];
};

export type VinylExistingImageUrls = [string | null, string | null, string | null];
export type VinylImagePayload = {
  type: VinylImageType;
  value: string;
};
export type VinylPayload = {
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
  tracklist: VinylTracklist;
  available: boolean;
  images: VinylImagePayload[];
};
export type VinylUpdatePayload = Omit<VinylPayload, "images"> & {
  images?: VinylImagePayload[];
};

export type UpdateVinylFormField = <TKey extends keyof VinylFormState>(
  field: TKey,
  value: VinylFormState[TKey],
) => void;

export const initialFormState: VinylFormState = {
  name: "",
  slug: "",
  artist: "",
  spotifyAlbumId: "",
  year: 0,
  price: 0,
  purchasePrice: 0,
  discount: 0,
  stock: 0,
  numberOfDiscs: 1,
  category: "",
  tracklist: createVinylTracklist(1),
  available: "true",
  images: [null, null, null],
};

export function createVinylTracklist(numberOfDiscs: number, existingTracklist?: VinylTracklist): VinylTracklist {
  const discCount = Math.max(1, Math.floor(Number(numberOfDiscs) || 1));
  const savedTracklist = existingTracklist ?? [];

  return Array.from({ length: discCount * 2 }, (_, index) => {
    const side = String.fromCharCode(65 + index);
    const existingSide = savedTracklist.find((face) => face.side === side);

    return {
      side,
      tracks: existingSide?.tracks.length ? [...existingSide.tracks] : [""],
    };
  });
}

function getTracklistPayload(tracklist: VinylTracklist): VinylTracklist {
  return tracklist.map((side) => ({
    side: side.side,
    tracks: side.tracks.filter((track) => track.trim().length > 0),
  }));
}

export function createVinylFormState(product: Product): VinylFormState {
  return {
    name: product.name,
    slug: product.slug,
    artist: product.artist,
    spotifyAlbumId: product.spotifyAlbumId ?? "",
    year: Number(product.year),
    price: product.price,
    purchasePrice: product.purchasePrice,
    discount: product.discount,
    stock: product.stock,
    category: "",
    numberOfDiscs: Math.max(1, Number(product.numberOfDiscs) || 1),
    tracklist: createVinylTracklist(product.numberOfDiscs, product.tracklist),
    available: String(product.available),
    images: [null, null, null],
  };
}

function getImageForType(product: Product, type: VinylImageType, fallbackIndex: number): VinylImage | undefined {
  return product.images.find((image) => image.type === type) ?? product.images[fallbackIndex];
}

export function createVinylImagePreviewState(product: Product): VinylExistingImageUrls {
  return [
    getImageForType(product, "cover", 0)?.url ?? null,
    getImageForType(product, "back", 1)?.url ?? null,
    getImageForType(product, "gallery", 2)?.url ?? null,
  ];
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        resolve(result);
        return;
      }

      reject(new Error("Could not convert image to base64."));
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("Could not read image file."));
    };

    reader.readAsDataURL(file);
  });
}

export async function buildVinylPayload(formData: VinylFormState): Promise<VinylPayload> {
  const images = (
    await Promise.all(
      formData.images.map(async (image, index) => {
        if (!image) {
          return null;
        }

        return {
          type: VINYL_IMAGE_TYPES[index],
          value: await fileToBase64(image),
        } satisfies VinylImagePayload;
      }),
    )
  ).filter((image): image is VinylImagePayload => image !== null);

  return {
    name: formData.name,
    slug: formData.slug,
    artist: formData.artist,
    spotifyAlbumId: formData.spotifyAlbumId,
    year: formData.year,
    price: formData.price,
    purchasePrice: formData.purchasePrice,
    discount: formData.discount,
    stock: formData.stock,
    category: formData.category,
    numberOfDiscs: formData.numberOfDiscs,
    tracklist: getTracklistPayload(formData.tracklist),
    available: formData.available === "true",
    images,
  };
}

export async function buildVinylUpdatePayload(formData: VinylFormState): Promise<VinylUpdatePayload> {
  const images = (
    await Promise.all(
      formData.images.map(async (image, index) => {
        if (!image) {
          return null;
        }

        return {
          type: VINYL_IMAGE_TYPES[index],
          value: await fileToBase64(image),
        } satisfies VinylImagePayload;
      }),
    )
  ).filter((image): image is VinylImagePayload => image !== null);

  return {
    name: formData.name,
    slug: formData.slug,
    artist: formData.artist,
    spotifyAlbumId: formData.spotifyAlbumId,
    year: formData.year,
    price: formData.price,
    purchasePrice: formData.purchasePrice,
    discount: formData.discount,
    stock: formData.stock,
    category: formData.category,
    numberOfDiscs: formData.numberOfDiscs,
    tracklist: getTracklistPayload(formData.tracklist),
    available: formData.available === "true",
    ...(images.length > 0 ? { images } : {}),
  };
}
