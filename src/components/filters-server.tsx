"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import type { Category } from "@/types/category";

type ServerFiltersProps = {
  categories: Category[];
};

function updateQuery(searchParams: URLSearchParams, key: string, value?: string) {
  const next = new URLSearchParams(searchParams);
  next.delete("page");
  if (value) next.set(key, value);
  else next.delete(key);
  for (const [name, currentValue] of next.entries()) {
    if (!currentValue) next.delete(name);
  }
  return next.toString();
}

export default function ServerFilters({ categories }: ServerFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const navigate = (query: string) => {
    startTransition(() => router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false }));
  };

  const availability = searchParams.get("available");
  const category = searchParams.get("category");

  return (
    <div className="h-fit text-white ">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-[plus_jakarta_sans]">Filtros</h1>
        <button
          type="button"
          onClick={() => {
            const next = new URLSearchParams(searchParams);
            ["category", "available", "minPrice", "maxPrice", "page"].forEach((key) => next.delete(key));
            navigate(next.toString());
          }}
          className="text-xs text-white/60 underline underline-offset-4 hover:text-white"
        >
          Clear all
        </button>
      </div>
      <Accordion type="multiple">
        <AccordionItem value="price">
          <AccordionTrigger className="font-[plus_jakarta_sans]">Precio</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm text-white/70">
                Desde
                <input
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={searchParams.get("minPrice") ?? ""}
                  onChange={(event) => navigate(updateQuery(searchParams, "minPrice", event.target.value))}
                  className="mt-2 h-9 w-full rounded border border-white/20 bg-transparent px-2 text-white outline-none focus:border-white"
                />
              </label>
              <label className="text-sm text-white/70">
                Hasta
                <input
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={searchParams.get("maxPrice") ?? ""}
                  onChange={(event) => navigate(updateQuery(searchParams, "maxPrice", event.target.value))}
                  className="mt-2 h-9 w-full rounded border border-white/20 bg-transparent px-2 text-white outline-none focus:border-white"
                />
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="availability">
          <AccordionTrigger className="font-[plus_jakarta_sans]">Disponibilidad</AccordionTrigger>
          <AccordionContent>
            {[
              ["true", "Disponible"],
              ["false", "No Disponible"],
            ].map(([value, label]) => (
              <div key={value} className="flex h-10 items-center space-x-2">
                <Checkbox
                  id={`available-${value}`}
                  checked={availability === value}
                  onCheckedChange={(checked) =>
                    navigate(updateQuery(searchParams, "available", checked ? value : undefined))
                  }
                />
                <Label htmlFor={`available-${value}`} className="font-[plus_jakarta_sans]">
                  {label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="category">
          <AccordionTrigger className="font-[plus_jakarta_sans]">Categoría</AccordionTrigger>
          <AccordionContent>
            {categories.map((item) => (
              <div key={item.id} className="flex min-h-10 items-center space-x-2">
                <Checkbox
                  id={`category-${item.id}`}
                  checked={category === item.slug}
                  onCheckedChange={(checked) =>
                    navigate(updateQuery(searchParams, "category", checked ? item.slug : undefined))
                  }
                />
                <Label htmlFor={`category-${item.id}`} className="font-[plus_jakarta_sans]">
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
