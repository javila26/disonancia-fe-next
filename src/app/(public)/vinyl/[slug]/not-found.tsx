import Link from "next/link";

export default function VinylNotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center px-4 py-16 text-center text-white sm:px-7">
      <div className="max-w-md">
        <p className="font-[roboto_mono] text-sm uppercase tracking-[0.25em] text-white/50">404 · Vinilos</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">No encontrado</h1>
        <p className="mt-4 text-white/65 text-sm">
          Parece que el vinilo que buscas no está disponible en el catálogo o el enlace es incorrecto.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md bg-white px-5 py-3 text-md font-medium text-[#1a1a1a] transition hover:bg-white/90"
        >
          Buscar más vinilos
        </Link>
      </div>
    </main>
  );
}
