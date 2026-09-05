export default function Loading() {
  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-12 text-white sm:px-7 md:grid-cols-2 md:gap-12 lg:gap-20" aria-busy="true">
      <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/50 md:hidden">Vinyl record</p>

      <section className="min-w-0 md:mt-8">
        <div className="flex flex-col-reverse gap-4 xl:grid xl:grid-cols-[8.5rem_minmax(0,1fr)] xl:items-stretch">
          <div className="flex flex-row flex-wrap gap-[0.9rem] sm:flex-row sm:min-w-24 xl:h-full xl:flex-col">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="aspect-square w-[6rem] animate-pulse rounded bg-white/10 sm:w-[7.5rem] xl:w-[8.5rem]" />
            ))}
          </div>
          <div className="aspect-square w-full animate-pulse rounded bg-white/10 xl:my-0.5 xl:h-[calc(100%-0.25rem)] xl:aspect-auto" />
        </div>
        <div className="hidden pt-4 md:block">
          <div className="h-32 animate-pulse rounded border border-white/10 bg-white/5" />
        </div>
      </section>

      <section className="flex min-w-0 flex-col justify-start gap-6 md:pt-8">
        <div className="space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          <div className="h-14 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-2 border-y border-white/15 sm:grid-cols-3">
          <div className="space-y-3 border-r border-white/15 py-4 pr-4 sm:py-5">
            <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
            <div className="h-7 w-20 animate-pulse rounded bg-white/10" />
          </div>
          <div className="space-y-3 py-4 pl-4 sm:border-r sm:border-white/15 sm:px-4 sm:py-5">
            <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
            <div className="h-7 w-20 animate-pulse rounded bg-white/10" />
          </div>
          <div className="col-span-2 space-y-3 border-t border-white/15 py-4 sm:col-span-1 sm:border-t-0 sm:pl-4 sm:py-5">
            <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
            <div className="h-7 w-24 animate-pulse rounded bg-white/10" />
          </div>
        </div>
        <div className="md:hidden">
          <div className="h-32 animate-pulse rounded border border-white/10 bg-white/5" />
        </div>
        <div className="pt-2">
          <div className="mb-3 h-4 w-36 animate-pulse rounded bg-white/10" />
          <div className="h-[515px] animate-pulse rounded-xl bg-white/10" />
        </div>
      </section>
    </main>
  );
}
