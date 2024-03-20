export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductsGrid, Pagination } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {


  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })


  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title="tienda" subtitle="todos los productos" className="mb-2" />
      <ProductsGrid
        products={products}
      />
      <Pagination totalPages={totalPages} />
    </>
  );
}
