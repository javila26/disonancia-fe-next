import ProductCard from "@/components/product-card";
import { VinylCatalogLoader } from "@/components/vinyl-catalog-loader";
import { VinylPageSizeOptions, VinylPagination } from "@/components/vinyl-pagination";
import { loadVinyls, type VinylFilters } from "@/lib/loadVinyls";
import type { Product } from "@/types/product";
import { Suspense } from "react";

type VinylCatalogProps = {
  requestedPage: number;
  pageSize: number;
  filters: VinylFilters;
};

export async function VinylCatalog({ requestedPage, pageSize, filters }: VinylCatalogProps) {
  const { vinylRecords, total } = await loadVinyls(requestedPage - 1, pageSize, filters);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const pageEnd = total === 0 ? 0 : Math.min(currentPage * pageSize, total);

  return (
    <>
      <div className="mb-6 flex items-center justify-around gap-4 border-b border-white/10 pb-5 text-center sm:justify-between sm:text-left">
        <div className="text-sm text-white/70">
          Mostrando{" "}
          <span className="font-medium text-white">
            {pageStart}-{pageEnd}
          </span>{" "}
          de <span className="font-medium text-white">{total}</span>
        </div>
        <VinylPageSizeOptions pageSize={pageSize} filters={filters} />
      </div>

      <Suspense fallback={<VinylCatalogLoader />}>
        <VinylGallery vinylRecords={vinylRecords} />
      </Suspense>

      <VinylPagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} filters={filters} />
    </>
  );
}

async function VinylGallery({ vinylRecords }: { vinylRecords: Product[] }) {
  if (vinylRecords.length === 0) {
    return <div className="flex min-h-80 items-center justify-center text-xl text-white">No vinyls found</div>;
  }

  return (
    <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-5 2xl:gap-8">
      {vinylRecords.map((product) => {
        const coverImage = product.images.find((image) => image.type === "cover");

        return (
          <div key={product.id} className="flex justify-center">
            <ProductCard
              name={product.name}
              price={product.price}
              image={coverImage?.url || ""}
              slug={product.slug}
              available={product.available}
            />
          </div>
        );
      })}
    </div>
  );
}
