// "use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  slug: string;
  id?: string;
  returnTo?: string;
  available: boolean;
};

function ProductCard({ name, price, image, slug, available }: ProductCardProps) {
  return (
    <Link href={`/vinyl/${slug}`}>
      <Card className="h-fit w-48 gap-1 border-0 bg-transparent text-white shadow-none">
        <CardHeader className="relative mx-auto flex w-full max-w-40 items-center justify-center rounded-sm bg-stone-200 p-3 md:h-[12.5rem] md:max-w-[14.3rem]">
          {!available ? (
            <p className="absolute left-2 top-2 rounded-sm bg-black/70 px-2 py-1 text-xs font-medium uppercase tracking-wide text-white/85">
              Agotado
            </p>
          ) : null}
          <Image
            src={image || "/default-vinyl.webp"}
            width={250}
            height={250}
            alt="Vinyl"
            unoptimized
            className="m-auto h-auto max-h-full max-w-full object-contain"
          />
        </CardHeader>
        <CardContent className="mx-auto w-full max-w-40 px-0 md:max-w-[12.3rem]">
          <CardTitle className="mt-2 w-40 line-clamp-2 font-[plus_jakarta_sans] text-md font-normal">{name}</CardTitle>
          <p className="font-[plus_jakarta_sans] text-sm font-light text-stone-300">L. {price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
