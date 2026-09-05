import ServerFilters from "@/components/filters-server";
import { VinylCatalog } from "@/components/vinyl-catalog";
import {
  DEFAULT_VINYL_PAGE_SIZE,
  VINYL_PAGE_SIZE_OPTIONS,
} from "@/components/vinyl-pagination";
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
  const filters = getVinylFilters(query);
  const { categories } = await loadCategories(0, 100);

  return (
    <main className="mx-4 flex flex-col justify-between sm:flex-row">
      <aside className="m-4 mt-8 h-fit w-11/12 sm:mt-13 sm:w-96">
        <ServerFilters categories={categories} />
      </aside>

      <section className="mr-0 w-full text-white 2xl:mr-4">
        <h1 className="mx-5 w-fit text-[3rem] font-[roboto_mono] sm:mx-8 sm:mt-10">Vinyl Records</h1>

        <section className="mx-1 mt-6 sm:mx-5 sm:mt-8 xl:mx-8">
          <VinylCatalog requestedPage={requestedPage} pageSize={pageSize} filters={filters} />
        </section>
      </section>
    </main>
  );
}
