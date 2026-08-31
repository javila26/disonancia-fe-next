"use client";

import type { Category } from "@/types/category";

export type CategoryFormState = {
  name: string;
  slug: string;
  image: File | null;
};

export type UpdateCategoryFormField = <TKey extends keyof CategoryFormState>(
  field: TKey,
  value: CategoryFormState[TKey],
) => void;

export const initialCategoryFormState: CategoryFormState = {
  name: "",
  slug: "",
  image: null,
};

function normalizeCategoryImage(image: string | null | undefined) {
  if (!image) {
    return null;
  }

  const normalized = image.trim().toLowerCase();

  if (normalized === "placeholder" || normalized === "palceholder") {
    return null;
  }

  return image;
}

export function createCategoryFormState(category: Category): CategoryFormState {
  return {
    name: category.name,
    slug: category.slug,
    image: null,
  };
}

export function createCategoryImagePreviewState(category: Category) {
  return normalizeCategoryImage(category.image);
}

export function buildCategoryFormData(formData: CategoryFormState) {
  const body = new FormData();

  body.append("name", formData.name);
  body.append("slug", formData.slug);

  if (formData.image) {
    body.append("image", formData.image);
  }

  return body;
}
