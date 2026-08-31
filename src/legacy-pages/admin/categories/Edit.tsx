"use client";
/* eslint-disable react-hooks/set-state-in-effect -- form state mirrors the loaded record. */

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

import { CategoryDetailsSection } from "@/components/admin/categories/CategoryDetailsSection";
import { CategoryMediaSection } from "@/components/admin/categories/CategoryMediaSection";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/useCategoryStore";
import {
  buildCategoryFormData,
  createCategoryFormState,
  createCategoryImagePreviewState,
  initialCategoryFormState,
  type CategoryFormState,
} from "./edit-form";

export default function EditCategoryPage() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const [formData, setFormData] = useState(initialCategoryFormState);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const { addCategory, updateCategory, currentCategory, getCategoryById, loading } = useCategoryStore();

  const pageTitle = id ? "Edit Category" : "Add Category";
  const pageDescription = id
    ? "Update the category details below."
    : "Fill in the category details to create a new category.";

  useEffect(() => {
    if (!id) {
      setFormData(initialCategoryFormState);
      setExistingImageUrl(null);
      return;
    }

    void getCategoryById(id);
  }, [getCategoryById, id]);

  useEffect(() => {
    if (!id || !currentCategory || currentCategory.id !== id) {
      return;
    }

    setFormData(createCategoryFormState(currentCategory));
    setExistingImageUrl(createCategoryImagePreviewState(currentCategory));
  }, [currentCategory, id]);

  const updateField = <TKey extends keyof CategoryFormState>(field: TKey, value: CategoryFormState[TKey]) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = buildCategoryFormData(formData);
    const isEditing = Boolean(id);
    const toastId = toast.loading(isEditing ? "Updating category..." : "Creating category...");
    const saved = id ? await updateCategory(id, body) : await addCategory(body);

    if (saved) {
      toast.success(isEditing ? "Category updated successfully." : "Category created successfully.", { id: toastId });
      router.push("/admin/categories");
      return;
    }

    toast.error(isEditing ? "Could not update the category." : "Could not create the category.", { id: toastId });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/categories">
            <Button variant="link" className="mb-2 px-0 text-lg text-white/80 hover:text-white">
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{pageTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">{pageDescription}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <CategoryDetailsSection formData={formData} updateField={updateField} />
        <CategoryMediaSection
          image={formData.image}
          existingImageUrl={existingImageUrl}
          onImageChange={(file) => updateField("image", file)}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link href="/admin/categories" className="sm:order-1">
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/15 bg-[#111111] text-white hover:bg-[#141414] sm:w-auto"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-white text-[#1a1a1a] hover:bg-white/90 sm:w-auto">
            {loading ? "Saving..." : id ? "Update Category" : "Save Category"}
          </Button>
        </div>
      </form>
    </>
  );
}
