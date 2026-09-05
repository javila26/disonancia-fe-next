import ProductDetails from "@/legacy-pages/ecommerce/ProductDetails";
import { loadVinylDetail } from "@/lib/loadVinylDetail";
import { notFound } from "next/navigation";

type VinylDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: VinylDetailsPageProps) {
  const { slug } = await params;
  const vinylRecord = await loadVinylDetail(slug);

  if (!vinylRecord) {
    notFound();
  }

  return <ProductDetails vinylRecord={vinylRecord} />;
}
