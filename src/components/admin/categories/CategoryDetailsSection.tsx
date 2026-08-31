"use client";

import { Label } from "@/components/ui/label";
import type { CategoryFormState, UpdateCategoryFormField } from "@/legacy-pages/admin/categories/edit-form";

const inputClasses =
  "mt-2 h-11 w-full rounded-xl border border-white/15 bg-[#111111] px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/40 focus:bg-[#141414]";

type CategoryDetailsSectionProps = {
  formData: CategoryFormState;
  updateField: UpdateCategoryFormField;
};

export function CategoryDetailsSection({ formData, updateField }: CategoryDetailsSectionProps) {
  return (
    <div className="border-b border-white/10 pb-8">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">Details</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Category Information</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-zinc-200">
            Category name
          </Label>
          <input
            id="name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClasses}
            placeholder="RnB"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug" className="text-sm font-medium text-zinc-200">
            Slug
          </Label>
          <input
            id="slug"
            value={formData.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            className={inputClasses}
            placeholder="rnb"
            required
          />
        </div>
      </div>
    </div>
  );
}
