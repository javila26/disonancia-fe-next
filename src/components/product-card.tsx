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
};

function ProductCard({ name, price, image, slug }: ProductCardProps) {
  return (
    <Link href={`/vinyl/${slug}`}>
      <Card className="h-fit w-48 gap-1 border-0 bg-transparent text-white shadow-none">
        <CardHeader className="flex items-center justify-center mx-auto w-full max-w-[10rem] rounded-sm bg-stone-200 p-3   md:max-w-[14.3rem] md:h-[12.5rem]">
          <Image
            src={image || "/default-vinyl.webp"}
            width={250}
            height={250}
            alt="Vinyl"
            unoptimized
            className="m-auto h-auto max-h-full max-w-full object-contain"
          />
        </CardHeader>
        <CardContent className="mx-auto w-full max-w-[10rem] px-0 md:max-w-[12.3rem]">
          <CardTitle className="mt-2 w-40 line-clamp-2 font-[plus_jakarta_sans] text-md font-normal">{name}</CardTitle>
          <p className="font-[plus_jakarta_sans] text-sm font-light text-stone-300">L. {price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
