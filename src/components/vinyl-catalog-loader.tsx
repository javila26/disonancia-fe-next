import { Disc3 } from "lucide-react";

export function VinylCatalogLoader() {
  return (
    <div className="flex min-h-80 items-center justify-center" role="status">
      <Disc3 className="h-7 w-7 animate-spin text-white/80" aria-hidden="true" />
      <span className="ml-2 text-white">Cargando...</span>
    </div>
  );
}
