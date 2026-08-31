"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-white">404</h1>

      <p className="text-gray-500">La página que estás buscando no existe.</p>

      <Link href="/" className="rounded-md bg-black px-4 py-2 text-white">
        Regresar
      </Link>
    </main>
  );
}
