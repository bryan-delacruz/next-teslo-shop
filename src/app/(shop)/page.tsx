import { Title,ProductsGrid } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products

export default function Home() {
  return (
    <>
      <Title title="tienda" subtitle="todos los productos" className="mb-2" />
      <ProductsGrid
        products={products}
        />
    </>
  );
}
