"use client";

import type { Category } from "@/types/category";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UpdateVinylFormField, VinylFormState } from "@/legacy-pages/admin/vinyls/edit-form";

const inputClasses =
  "mt-2 h-11 w-full rounded-xl border border-white/15 bg-[#111111] px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/40 focus:bg-[#141414]";

type VinylDetailsSectionProps = {
  formData: VinylFormState;
  categories: Category[];
  categoriesLoading: boolean;
  updateField: UpdateVinylFormField;
};

export function VinylDetailsSection({
  formData,
  categories,
  categoriesLoading,
  updateField,
}: VinylDetailsSectionProps) {
  return (
    <div className="border-b border-white/10 pb-8">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">Details</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Vinyl Information</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-zinc-200">
            Vinyl name
          </Label>
          <input
            id="name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClasses}
            placeholder="Blond"
            required
          />
        </div>

        <div>
          <Label htmlFor="artist" className="text-sm font-medium text-zinc-200">
            Artist
          </Label>
          <input
            id="artist"
            value={formData.artist}
            onChange={(event) => updateField("artist", event.target.value)}
            className={inputClasses}
            placeholder="Frank Ocean"
            required
          />
        </div>

        <div>
          <Label htmlFor="spotifyAlbumId" className="text-sm font-medium text-zinc-200">
            Spotify Album ID
          </Label>
          <input
            id="spotifyAlbumId"
            value={formData.spotifyAlbumId}
            onChange={(event) => updateField("spotifyAlbumId", event.target.value)}
            className={inputClasses}
            placeholder="4m2880jivSbbyEGAKfITCa"
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
            placeholder="fkj"
            required
          />
        </div>

        <div>
          <Label htmlFor="year" className="text-sm font-medium text-zinc-200">
            Release year
          </Label>
          <input
            id="year"
            type="number"
            min="0"
            max="2026"
            value={formData.year}
            onChange={(event) => updateField("year", Number(event.target.value))}
            className={inputClasses}
            placeholder="2016"
            required
          />
        </div>

        <div>
          <Label htmlFor="price" className="text-sm font-medium text-zinc-200">
            Price
          </Label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(event) => updateField("price", Number(event.target.value))}
            className={inputClasses}
            placeholder="49.99"
            required
          />
        </div>

        <div>
          <Label htmlFor="purchasePrice" className="text-sm font-medium text-zinc-200">
            Purchase price
          </Label>
          <input
            id="purchasePrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.purchasePrice}
            onChange={(event) => updateField("purchasePrice", Number(event.target.value))}
            className={inputClasses}
            placeholder="760"
            required
          />
        </div>

        <div>
          <Label htmlFor="discount" className="text-sm font-medium text-zinc-200">
            Discount
          </Label>
          <input
            id="discount"
            type="number"
            min="0"
            step="0.01"
            value={formData.discount}
            onChange={(event) => updateField("discount", Number(event.target.value))}
            className={inputClasses}
            placeholder="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="stock" className="text-sm font-medium text-zinc-200">
            Stock
          </Label>
          <input
            id="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={(event) => updateField("stock", Number(event.target.value))}
            className={inputClasses}
            placeholder="12"
            required
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-sm font-medium text-zinc-200">
            Category
          </Label>
          <Select value={formData.category} onValueChange={(value: string) => updateField("category", value)}>
            <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-white/15 bg-[#111111] text-white focus:border-white/40 focus:bg-[#141414]">
              <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a category"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="numberOfDiscs" className="text-sm font-medium text-zinc-200">
            Number of Discs
          </Label>
          <input
            id="numberOfDiscs"
            type="number"
            min="1"
            value={formData.numberOfDiscs}
            onChange={(event) => updateField("numberOfDiscs", Number(event.target.value))}
            className={inputClasses}
            placeholder="1"
            required
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-zinc-200">Availability</Label>
          <Select value={formData.available} onValueChange={(value: string) => updateField("available", value)}>
            <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-white/15 bg-[#111111] text-white focus:border-white/40 focus:bg-[#141414]">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
