import Image from "next/image";
import type { ProductItem } from "@/lib/content";
import { productPhoto } from "@/lib/assets";
import { ProductArt } from "./ProductArt";

/**
 * The picture on a product card: the real photograph when one has been
 * dropped into /public/images/products, otherwise the printed-art
 * illustration. See src/lib/assets.ts for the file naming.
 */
export function ProductPlate({
  item,
  sizes,
}: {
  item: Pick<ProductItem, "name" | "art">;
  sizes: string;
}) {
  const photo = productPhoto(item.name);

  if (!photo) return <ProductArt art={item.art} />;

  return (
    <Image
      src={photo}
      alt={`${item.name} printed by Asha Offset`}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}
