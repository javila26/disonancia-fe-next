"use client";
/* eslint-disable react-hooks/set-state-in-effect -- form state mirrors the loaded record. */

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

import { VinylDetailsSection } from "@/components/admin/vinyls/VinylDetailsSection";
import { VinylMediaSection } from "@/components/admin/vinyls/VinylMediaSection";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductsStore";
import {
  buildVinylPayload,
  buildVinylUpdatePayload,
  createVinylFormState,
  createVinylImagePreviewState,
  initialFormState,
  type VinylExistingImageUrls,
  type VinylFormState,
} from "./edit-form";

export default function EditPage() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);
  const [existingImageUrls, setExistingImageUrls] = useState<VinylExistingImageUrls>([null, null, null]);
  const { addProduct, updateProduct, currentProduct, getProductById, loading } = useProductStore();
  const { categories, fetchCategories, loading: categoriesLoading } = useCategoryStore();

  const pageTitle = id ? "Edit Vinyl" : "Add Vinyl";
  const pageDescription = id
    ? "Update the vinyl details below."
    : "Fill in the vinyl details you need to create a new record.";

  useEffect(() => {
    void fetchCategories(0, 100);
  }, [fetchCategories]);

  useEffect(() => {
    if (!id) {
      setFormData(initialFormState);
      setExistingImageUrls([null, null, null]);
      return;
    }

    void getProductById(id);
  }, [getProductById, id]);

  useEffect(() => {
    if (!id || !currentProduct || currentProduct.id !== id) {
      return;
    }

    setFormData(createVinylFormState(currentProduct));
    setExistingImageUrls(createVinylImagePreviewState(currentProduct));
  }, [currentProduct, id]);

  useEffect(() => {
    if (!id || !currentProduct || currentProduct.id !== id || categories.length === 0) {
      return;
    }

    const matchedCategory =
      categories.find((category) => category.id === currentProduct.category.id) ??
      categories.find((category) => category.slug === currentProduct.category.slug) ??
      categories.find((category) => category.name === currentProduct.category.name);

    if (!matchedCategory) {
      return;
    }

    setFormData((current) => {
      if (current.category === matchedCategory.id) {
        return current;
      }

      return {
        ...current,
        category: matchedCategory.id,
      };
    });
  }, [categories, currentProduct, id]);

  const updateField = <TKey extends keyof VinylFormState>(field: TKey, value: VinylFormState[TKey]) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageChange = (index: 0 | 1 | 2, file: File | null) => {
    setFormData((current) => {
      const nextImages: VinylFormState["images"] = [...current.images] as VinylFormState["images"];
      nextImages[index] = file;

      return {
        ...current,
        images: nextImages,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEditing = Boolean(id);
    const toastId = toast.loading(isEditing ? "Updating vinyl..." : "Creating vinyl...");
    const saved =
      id && isEditing
        ? await updateProduct(id, await buildVinylUpdatePayload(formData))
        : await addProduct(await buildVinylPayload(formData));

    if (saved) {
      toast.success(isEditing ? "Vinyl updated successfully." : "Vinyl created successfully.", { id: toastId });
      router.push("/admin/vinyls");
      return;
    }

    toast.error(isEditing ? "Could not update the vinyl." : "Could not create the vinyl.", { id: toastId });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/vinyls">
            <Button variant="link" className="mb-2 px-0 text-lg text-white/80 hover:text-white">
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{pageTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">{pageDescription}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <VinylDetailsSection
          formData={formData}
          categories={categories}
          categoriesLoading={categoriesLoading}
          updateField={updateField}
        />
        <VinylMediaSection
          images={formData.images}
          existingImageUrls={existingImageUrls}
          onImageChange={handleImageChange}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link href="/admin/vinyls" className="sm:order-1">
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/15 bg-[#111111] text-white hover:bg-[#141414] sm:w-auto"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="sm:w-auto bg-white text-[#1a1a1a] hover:bg-white/90">
            {loading ? "Saving..." : id ? "Update Vinyl" : "Save Vinyl"}
          </Button>
        </div>
      </form>
    </>
  );
}
