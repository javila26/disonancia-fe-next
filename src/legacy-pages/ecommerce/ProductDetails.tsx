import ImagesCarousell from "@/components/images-carousel";
import type { Product } from "@/types/product";
import type { VinylImage } from "@/types/vinyl-image";

type ProductDetailsProps = {
  vinylRecord: Product | null;
};

export default function ProductDetails({ vinylRecord }: ProductDetailsProps) {
  function sortVinylImages(images: VinylImage[] = []): VinylImage[] {
    const order: Record<VinylImage["type"], number> = {
      cover: 0,
      back: 1,
      gallery: 2,
    };

    return [...images].sort((a, b) => order[a.type] - order[b.type]);
  }
  const sortedImages = sortVinylImages(vinylRecord?.images);

  return (
    <main className="w-full text-white grid grid-cols-1 md:grid-cols-2 sm:m-auto">
      <ImagesCarousell images={sortedImages || []} />
      <div className="flex flex-col gap-4 mx-7">
        <div className="font-[roboto_mono] mt-2 flex gap-4 sm:gap-6 sm:mt-7 flex-wrap ">
          <h1 className="font-bold w-full sm:w-fit text-5xl sm:text-6xl "> {vinylRecord?.artist}</h1>
          <h2 className="font-thin text-4xl sm:text-6xl">{vinylRecord?.name}</h2>
        </div>
        <h1 className="text-2xl font-extralight font-[roboto_mono]">{vinylRecord?.year}</h1>
        <h1 className="text-2xl font-semibold font-[plus_jakarta_sans]">L. {vinylRecord?.price}</h1>

        <div className="flex gap-4">
          <div className="font-[plus_jakarta_sans] mb-2 font-thin border-2 border-stone-400 w-fit py-4 px-6 text-2xl">
            {vinylRecord?.category.name}
          </div>
        </div>
        <button className="font-[roboto_mono] w-fit bg-white text-black text-2xl font-bold tracking-widest p-3 px-8 mb-2">
          COMPRAR
        </button>
      </div>
    </main>
  );
}
