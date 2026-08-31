"use client";
/* eslint-disable react-hooks/set-state-in-effect -- reset the selected image when the product changes. */

import type { VinylImage } from "@/types/vinyl-image";
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
    <aside className="m-7 2xl:ml-20 flex flex-col-reverse xl:flex-row gap-4">
      <div className="flex flex-row flex-wrap gap-[0.9rem] sm:flex-row sm:min-w-24 xl:flex-col">
        {displayImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className="w-[6rem] sm:w-[7.5rem] xl:w-[8.5rem] aspect-square focus:outline-none"
          >
            <img
              src={img.url}
              alt={`thumbnail-${index}`}
              className={`w-full h-full object-cover rounded transition duration-200 border-2 ${
                selectedImage === img ? "border-gray" : "border-transparent"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="w-full xl:w-9/12">
        <img src={selectedImage.url} alt="cover-album-main" className="w-full aspect-square object-cover rounded" />
      </div>
    </aside>
  );
}
