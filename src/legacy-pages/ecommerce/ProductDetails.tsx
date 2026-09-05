import ImagesCarousell from "@/components/images-carousel";
import { SpotifyAlbumEmbed } from "@/components/spotify-album-embed";
import TracklistTable from "@/components/tracklist-table";
import type { Product } from "@/types/product";
import type { VinylImage } from "@/types/vinyl-image";

type ProductDetailsProps = { vinylRecord: Product | null };

export default function ProductDetails({ vinylRecord }: ProductDetailsProps) {
  const order: Record<VinylImage["type"], number> = { cover: 0, back: 1, gallery: 2 };
  const sortedImages = [...(vinylRecord?.images ?? [])].sort((a, b) => order[a.type] - order[b.type]);

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-12 text-white sm:px-7 md:grid-cols-2 md:gap-12 lg:gap-20">
      <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/50 md:hidden">Vinyl record</p>

      <section className="md:mt-8 min-w-0">
        <ImagesCarousell images={sortedImages} />
        <div className="mt- border- border-white/10 pt-4 hidden md:block">
          <TracklistTable tracklist={vinylRecord?.tracklist} />
        </div>
      </section>

      <section className="flex min-w-0 flex-col justify-start gap-6 md:pt-8">
        <div className="space-y-3 font-[roboto_mono]">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50 hidden md:block">Vinyl record</p>
          <h1 className="text-5xl font-bold leading-none sm:text-6xl">{vinylRecord?.artist}</h1>
          <h2 className="text-3xl font-thin leading-tight text-white/90 sm:text-5xl">{vinylRecord?.name}</h2>
        </div>

        <dl className="grid grid-cols-2 border-y border-white/15 font-[plus_jakarta_sans] sm:grid-cols-3">
          <div className="border-r border-white/15 py-4 pr-4 sm:py-5">
            <dt className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Price</dt>
            <dd className="text-3xl font-semibold text-white">L. {vinylRecord?.price}</dd>
          </div>
          <div className="py-4 pl-4 sm:border-r sm:border-white/15 sm:px-4 sm:py-5">
            <dt className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Released</dt>
            <dd className="font-[roboto_mono] text-2xl font-extralight text-white/85">{vinylRecord?.year}</dd>
          </div>
          <div className="col-span-2 border-t border-white/15 py-4 sm:col-span-1 sm:border-t-0 sm:pl-4 sm:py-5">
            <dt className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Category</dt>
            <dd className="truncate text-lg font-thin text-white/85">{vinylRecord?.category.name}</dd>
          </div>
        </dl>

        {/* <div className="space-y-3 font-[plus_jakarta_sans]">
          <button
            type="button"
            disabled={!vinylRecord?.available}
            className="w-full bg-white px-8 py-4 font-[roboto_mono] text-xl font-bold tracking-[0.18em] text-black transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-white/50 sm:w-fit"
          >
            {vinylRecord?.available ? "COMPRAR" : "NO DISPONIBLE"}
          </button>
          <p className="text-sm text-white/50">Secure checkout · Shipping details at checkout</p>
        </div> */}

        <div className="md:hidden">
          <TracklistTable tracklist={vinylRecord?.tracklist} />
        </div>

        <div className="border- border-white/10 pt-2">
          <p className="mb-3 font-[plus_jakarta_sans] text-sm uppercase tracking-[0.2em] text-white/50">
            Listen before you buy
          </p>

          <SpotifyAlbumEmbed albumId={vinylRecord?.spotifyAlbumId} albumName={vinylRecord?.name ?? "this record"} />
        </div>
      </section>
    </main>
  );
}
