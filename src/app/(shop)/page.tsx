import { getPaginatedProductsWithImages } from "@/actions";
import { Title,ProductsGrid } from "@/components";

export default async function Home() {

  const {products} = await getPaginatedProductsWithImages()

  console.log(products)
  
  return (
    <>
      <Title title="tienda" subtitle="todos los productos" className="mb-2" />
      <ProductsGrid
        products={products}
        />
    </>
  );
}
