"use client";
/* eslint-disable react-hooks/set-state-in-effect -- reset the selected image when the product changes. */

import type { VinylImage } from "@/types/vinyl-image";
import Image from "next/image";
import { useEffect, useState } from "react";

const placeholderImages = [
  { id: "1", url: "https://www.deejay.de/images/xl/4/3//279743.jpg", type: "cover" },
  { id: "2", url: "https://www.deejay.de/images/xl/4/3//279743.jpg", type: "back" },
  { id: "3", url: "https://www.deejay.de/images/xl/4/3//279743.jpg", type: "gallery" },
];

type ImagesCarousellProps = {
  images: VinylImage[];
};

export default function ImagesCarousell({ images }: ImagesCarousellProps) {
  const displayImages = images.length > 0 ? images : placeholderImages;
  const [selectedImage, setSelectedImage] = useState(displayImages[0]);

  useEffect(() => {
    setSelectedImage(displayImages[0]);
  }, [displayImages]);

  return (
    <aside className="flex flex-col-reverse gap-4 xl:grid xl:grid-cols-[8.5rem_minmax(0,1fr)] xl:items-stretch">
      <div className="flex flex-row flex-wrap gap-[0.9rem] sm:flex-row sm:min-w-24 xl:h-full xl:flex-col">
        {displayImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className="relative aspect-square w-[6rem] focus:outline-none sm:w-[7.5rem] xl:w-[8.5rem]"
          >
            <Image
              src={img.url}
              alt={`thumbnail-${index}`}
              fill
              sizes="(min-width: 1280px) 8.5rem, (min-width: 640px) 7.5rem, 6rem"
              unoptimized
              className={`w-full h-full object-cover rounded transition duration-200 border-2 ${
                selectedImage === img ? "border-gray" : "border-transparent"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-square w-full xl:my-0.5 xl:h-[calc(100%-0.25rem)] xl:aspect-auto p-0">
        <Image
          src={selectedImage.url}
          alt="cover-album-main"
          fill
          sizes="(min-width: 1280px) 60vw, 100vw"
          unoptimized
          className="rounded object-cover"
        />
      </div>
    </aside>
  );
}
