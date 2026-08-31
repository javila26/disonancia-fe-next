"use client";

import { useImagePreview } from "@/hooks/useImagePreview";
import type { VinylExistingImageUrls, VinylFormState } from "@/legacy-pages/admin/vinyls/edit-form";

import { ImageUploadField } from "./ImageUploadField";

type VinylMediaSectionProps = {
  images: VinylFormState["images"];
  existingImageUrls: VinylExistingImageUrls;
  onImageChange: (index: 0 | 1 | 2, file: File | null) => void;
};

export function VinylMediaSection({ images, existingImageUrls, onImageChange }: VinylMediaSectionProps) {
  const coverPreviewUrl = useImagePreview(images[0]) ?? existingImageUrls[0];
  const backPreviewUrl = useImagePreview(images[1]) ?? existingImageUrls[1];
  const galleryPreviewUrl = useImagePreview(images[2]) ?? existingImageUrls[2];

  return (
    <div className="border-b border-white/10 pb-8">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">Content</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Media</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <ImageUploadField
          id="coverImage"
          label="Cover image"
          file={images[0]}
          previewUrl={coverPreviewUrl}
          onChange={(file) => onImageChange(0, file)}
        />
        <ImageUploadField
          id="backImage"
          label="Back image"
          file={images[1]}
          previewUrl={backPreviewUrl}
          onChange={(file) => onImageChange(1, file)}
        />
        <ImageUploadField
          id="galleryImage"
          label="Gallery image"
          file={images[2]}
          previewUrl={galleryPreviewUrl}
          onChange={(file) => onImageChange(2, file)}
        />
      </div>
    </div>
  );
}
