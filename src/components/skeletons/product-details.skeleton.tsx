"use client";

import { Skeleton } from "../ui/skeleton";

export function ProductSkeleton() {
  return (
    <main className="text-white grid grid-cols-1 md:grid-cols-2">
      {/* Left side: thumbnails + main image */}
      <aside className="m-7 2xl:ml-20  flex flex-col-reverse xl:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex flex-row flex-wrap gap-[0.9rem] sm:flex-row sm:min-w-24 xl:flex-col">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-[6rem] sm:w-[7.5rem] xl:w-[8.5rem] aspect-square rounded" />
          ))}
        </div>

        {/* Main image */}
        <div className="w-full lg:w-9/12">
          <Skeleton className="w-full aspect-square rounded" />
        </div>
      </aside>

      {/* Right side: product info */}
      <div className="flex flex-col gap-4 mx-7">
        {/* Title & Artist */}
        <div className="mt-2 flex gap-4 sm:gap-6 sm:mt-7 flex-wrap">
          <Skeleton className="h-12 sm:h-14 w-full sm:w-48" /> {/* Artist */}
          <Skeleton className="h-12 sm:h-14 w-96" /> {/* Product name */}
        </div>

        {/* Year */}
        <Skeleton className="h-8 w-20" />

        {/* Price */}
        <Skeleton className="h-8 w-28" />

        {/* Buy button */}
        <Skeleton className="h-12 w-48.5" />

        {/* Category */}
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </main>
  );
}
