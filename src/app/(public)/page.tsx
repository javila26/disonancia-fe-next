import Link from "next/link";
import ProductCard from "@/components/product-card";
import ServerFilters from "@/components/filters-server";
import { loadVinyls, type VinylFilters } from "@/lib/loadVinyls";
import { loadCategories } from "@/lib/loadCategories";

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40];
const DEFAULT_PAGE_SIZE = 10;
const PAGE_BUTTON_LIMIT = 3;

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : fallback;
}

function getFilters(query: Record<string, string | string[] | undefined>): VinylFilters {
  const single = (key: string) => getSingleParam(query[key]);
  const minPrice = single("minPrice");
  const maxPrice = single("maxPrice");
  return {
    category: single("category") || undefined,
    available: single("available") === "true" || single("available") === "false" ? single("available") : undefined,
    minPrice: minPrice && Number.isFinite(Number(minPrice)) && Number(minPrice) >= 0 ? minPrice : undefined,
    maxPrice: maxPrice && Number.isFinite(Number(maxPrice)) && Number(maxPrice) >= 0 ? maxPrice : undefined,
  };
}

function getVisiblePages(totalPages: number) {
  if (totalPages <= PAGE_BUTTON_LIMIT + 1) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  return [...Array.from({ length: PAGE_BUTTON_LIMIT }, (_, index) => index + 1), totalPages];
}

function pageHref(page: number, limit: number, filters: VinylFilters) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  Object.entries(filters).forEach(([key, value]) => value && params.set(key, value));
  return `/?${params.toString()}`;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;
  const requestedPage = parsePositiveInteger(getSingleParam(query.page), 1);
  const pageSizeValue = parsePositiveInteger(getSingleParam(query.limit), DEFAULT_PAGE_SIZE);
  const pageSize = PAGE_SIZE_OPTIONS.includes(pageSizeValue) ? pageSizeValue : DEFAULT_PAGE_SIZE;
  const apiPage = requestedPage - 1;
  const filters = getFilters(query);
  const [{ vinylRecords, total }, { categories }] = await Promise.all([
    loadVinyls(apiPage, pageSize, filters),
    loadCategories(0, 100),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const pageEnd = total === 0 ? 0 : Math.min(currentPage * pageSize, total);
  const visiblePages = getVisiblePages(totalPages);

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
              Showing{" "}
              <span className="font-medium text-white">
                {pageStart}-{pageEnd}
              </span>{" "}
              of <span className="font-medium text-white">{total}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-white/60">
              <span>Per page</span>
              {PAGE_SIZE_OPTIONS.map((option) => (
                <Link
                  key={option}
                  href={pageHref(1, option, filters)}
                  className={
                    option === pageSize ? "font-medium text-white underline underline-offset-4" : "hover:text-white"
                  }
                >
                  {option}
                </Link>
              ))}
            </div>
          </div>

          {vinylRecords.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center text-xl text-white">No vinyls found</div>
          ) : (
            <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-8">
              {vinylRecords.map((product) => {
                const coverImage = product.images.find((image) => image.type === "cover");
                return (
                  <div key={product.id} className="flex justify-center">
                    <ProductCard
                      name={product.name}
                      price={product.price}
                      image={coverImage?.url || ""}
                      slug={product.slug}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex flex-col items-center gap-4 border-t border-white/10 pb-8 pt-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="text-sm text-white/60">
              Page <span className="font-medium text-white">{currentPage}</span> of{" "}
              <span className="font-medium text-white">{totalPages}</span>
            </div>
            <nav aria-label="Product pagination" className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href={pageHref(1, pageSize, filters)}
                aria-disabled={currentPage === 1}
                className={`rounded-md border border-white/15 bg-[#111111] px-3 py-2 text-sm text-white ${currentPage === 1 ? "pointer-events-none opacity-40" : "hover:bg-[#171717]"}`}
              >
                «
              </Link>
              {visiblePages.map((pageNumber, index) => {
                const previousPage = visiblePages[index - 1];
                const shouldShowEllipsis = previousPage && pageNumber - previousPage > 1;

                return (
                  <span key={pageNumber} className="flex items-center gap-2">
                    {shouldShowEllipsis ? <span className="px-1 text-sm text-white/45">...</span> : null}
                    <Link
                      href={pageHref(pageNumber, pageSize, filters)}
                      aria-current={currentPage === pageNumber ? "page" : undefined}
                      className={
                        currentPage === pageNumber
                          ? "px-1 text-sm text-white underline underline-offset-4"
                          : "px-1 text-sm text-white/70 hover:text-white"
                      }
                    >
                      {pageNumber}
                    </Link>
                  </span>
                );
              })}
              <Link
                href={pageHref(totalPages, pageSize, filters)}
                aria-disabled={currentPage === totalPages}
                className={`rounded-md border border-white/15 bg-[#111111] px-3 py-2 text-sm text-white ${currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:bg-[#171717]"}`}
              >
                »
              </Link>
            </nav>
          </div>
        </section>
      </section>
    </main>
  );
}
