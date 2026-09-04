import ProductCard from "@/components/product-card";
import ServerFilters from "@/components/filters-server";
import {
  DEFAULT_VINYL_PAGE_SIZE,
  VINYL_PAGE_SIZE_OPTIONS,
  VinylPageSizeOptions,
  VinylPagination,
} from "@/components/vinyl-pagination";
import { loadVinyls } from "@/lib/loadVinyls";
import { loadCategories } from "@/lib/loadCategories";
import {
  getSingleParam,
  getVinylFilters,
  parsePositiveInteger,
  type VinylPageSearchParams,
} from "@/lib/vinyl-page-params";

type ProductsPageProps = {
  searchParams: Promise<VinylPageSearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;
  const requestedPage = parsePositiveInteger(getSingleParam(query.page), 1);
  const pageSizeValue = parsePositiveInteger(getSingleParam(query.limit), DEFAULT_VINYL_PAGE_SIZE);
  const pageSize = VINYL_PAGE_SIZE_OPTIONS.includes(pageSizeValue) ? pageSizeValue : DEFAULT_VINYL_PAGE_SIZE;
  const apiPage = requestedPage - 1;
  const filters = getVinylFilters(query);
  const [{ vinylRecords, total }, { categories }] = await Promise.all([
    loadVinyls(apiPage, pageSize, filters),
    loadCategories(0, 100),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const pageEnd = total === 0 ? 0 : Math.min(currentPage * pageSize, total);

  return (
    <main className="mx-4 flex flex-col justify-between sm:flex-row">
      <aside className="m-4 mt-8 h-fit w-11/12 sm:mt-13 sm:w-96">
        <ServerFilters categories={categories} />
      </aside>

      <section className="mr-0 w-full text-white 2xl:mr-4">
        <h1 className="mx-5 w-fit text-[3rem] font-[roboto_mono] sm:mx-8 sm:mt-10">Vinyl Records</h1>

        <section className="mx-1 mt-6 sm:mx-5 sm:mt-8 xl:mx-8">
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

          {vinylRecords.length === 0 ? (
            <div className="flex min-h-80 items-center justify-center text-xl text-white">No vinyls found</div>
          ) : (
            <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-5  2xl:gap-8">
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
          )}

          <VinylPagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} filters={filters} />
        </section>
      </section>
    </main>
  );
}
