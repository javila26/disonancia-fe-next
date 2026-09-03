"use server";

import { revalidateTag } from "next/cache";

export async function revalidateVinylCache(slug?: string) {
  revalidateTag("vinyls", "max");

  if (slug) {
    revalidateTag(`vinyls:${slug}`, "max");
  }
}
