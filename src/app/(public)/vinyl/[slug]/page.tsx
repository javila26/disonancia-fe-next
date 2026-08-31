import ProductDetails from "@/legacy-pages/ecommerce/ProductDetails";
import { loadVinylDetail } from "@/lib/loadVinylDetail";

type VinylDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: VinylDetailsPageProps) {
  const { slug } = await params;
  const vinylRecord = await loadVinylDetail(slug);

  return <ProductDetails vinylRecord={vinylRecord} />;
}
