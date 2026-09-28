import { CatalogLink } from "@/components/catalog-navigation";

import type { VinylFilters } from "@/lib/loadVinyls";

export const VINYL_PAGE_SIZE_OPTIONS = [10, 20, 30, 40];
export const DEFAULT_VINYL_PAGE_SIZE = 10;

type VinylPageSizeOptionsProps = {
  pageSize: number;
  filters: VinylFilters;
};

type VinylPaginationProps = VinylPageSizeOptionsProps & {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number, pageSize: number, filters: VinylFilters) {
  const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
  Object.entries(filters).forEach(([key, value]) => value && params.set(key, value));
  return `/?${params.toString()}`;
}

function getVisiblePages(totalPages: number, currentPage: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage]);

  if (currentPage <= 2) {
    pages.add(2);
    pages.add(3);
  } else if (currentPage >= totalPages - 1) {
    pages.add(totalPages - 2);
    pages.add(totalPages - 1);
  } else {
    pages.add(currentPage - 1);
    pages.add(currentPage + 1);
  }

  return [...pages].sort((a, b) => a - b);
}

export function VinylPageSizeOptions({ pageSize, filters }: VinylPageSizeOptionsProps) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-white/60">
      <span>Por página</span>
      {VINYL_PAGE_SIZE_OPTIONS.map((option) => (
        <CatalogLink
          key={option}
          href={pageHref(1, option, filters)}
          className={option === pageSize ? "font-medium text-white underline underline-offset-4" : "hover:text-white"}
        >
          {option}
        </CatalogLink>
      ))}
    </div>
  );
}

export function VinylPagination({ currentPage, totalPages, pageSize, filters }: VinylPaginationProps) {
  const visiblePages = getVisiblePages(totalPages, currentPage);

  return (
    <div className="mt-6 flex flex-col items-center gap-4 border-t border-white/10 pb-8 pt-5 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="text-sm text-white/60">
        Página <span className="font-medium text-white">{currentPage}</span> de{" "}
        <span className="font-medium text-white">{totalPages}</span>
      </div>
      <nav aria-label="Product pagination" className="flex flex-wrap items-center justify-center gap-2">
        <CatalogLink
          href={pageHref(1, pageSize, filters)}
          aria-disabled={currentPage === 1}
          className={`rounded-md border border-white/15 bg-[#111111] px-3 py-2 text-sm text-white ${currentPage === 1 ? "pointer-events-none opacity-40" : "hover:bg-[#171717]"}`}
        >
          «
        </CatalogLink>
        {visiblePages.map((pageNumber, index) => {
          const previousPage = visiblePages[index - 1];
          const shouldShowEllipsis = previousPage && pageNumber - previousPage > 1;

          return (
            <span key={pageNumber} className="flex items-center gap-2">
              {shouldShowEllipsis ? <span className="px-1 text-sm text-white/45">...</span> : null}
              <CatalogLink
                href={pageHref(pageNumber, pageSize, filters)}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                className={
                  currentPage === pageNumber
                    ? "px-1 text-sm text-white underline underline-offset-4"
                    : "px-1 text-sm text-white/70 hover:text-white"
                }
              >
                {pageNumber}
              </CatalogLink>
            </span>
          );
        })}
        <CatalogLink
          href={pageHref(totalPages, pageSize, filters)}
          aria-disabled={currentPage === totalPages}
          className={`rounded-md border border-white/15 bg-[#111111] px-3 py-2 text-sm text-white ${currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:bg-[#171717]"}`}
        >
          »
        </CatalogLink>
      </nav>
    </div>
  );
}
