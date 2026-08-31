"use client";

import { ImagePlus } from "lucide-react";

import { Label } from "@/components/ui/label";

type ImageUploadFieldProps = {
  id: string;
  label: string;
  file: File | null;
  previewUrl: string | null;
  onChange: (file: File | null) => void;
};

export function ImageUploadField({ id, label, file, previewUrl, onChange }: ImageUploadFieldProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <Label htmlFor={id} className="text-sm font-medium text-zinc-200">
            {label}
          </Label>
          <p className="mt-1 text-xs text-white/45">JPG, JPEG, PNG or WEBP</p>
        </div>
        {file ? (
          <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-white/60">Selected</span>
        ) : null}
      </div>

      <label
        htmlFor={id}
        className="group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-[#171717] px-4 py-3 transition hover:border-white/30 hover:bg-[#1b1b1b]"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#111111] transition group-hover:scale-105">
          <ImagePlus className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-white">{file ? "Change image" : "Choose image"}</span>
          <span className="block truncate text-xs text-white/45">{file?.name ?? "No file selected yet"}</span>
        </span>
      </label>

      <input
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="sr-only"
      />

      <div className="mt-4 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">
        {previewUrl ? (
          <img src={previewUrl} alt={`${label} preview`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-white/35">
            <ImagePlus className="size-8" />
            <p className="text-sm">Preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
