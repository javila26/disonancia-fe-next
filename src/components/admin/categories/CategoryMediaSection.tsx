"use client";

import { useImagePreview } from "@/hooks/useImagePreview";
import type { CategoryFormState } from "@/legacy-pages/admin/categories/edit-form";

import { ImageUploadField } from "../vinyls/ImageUploadField";

type CategoryMediaSectionProps = {
  image: CategoryFormState["image"];
  existingImageUrl: string | null;
  onImageChange: (file: File | null) => void;
};

export function CategoryMediaSection({ image, existingImageUrl, onImageChange }: CategoryMediaSectionProps) {
  const previewUrl = useImagePreview(image) ?? existingImageUrl;

  return (
    <div className="border-b border-white/10 pb-8">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">Content</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Category Image</h2>
      </div>

      <div className="max-w-md">
        <ImageUploadField
          id="categoryImage"
          label="Category image"
          file={image}
          previewUrl={previewUrl}
          onChange={onImageChange}
        />
      </div>
    </div>
  );
}
