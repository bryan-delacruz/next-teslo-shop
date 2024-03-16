export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string
  }
}

export default async function GenderByPage({ params, searchParams }: Props) {

  const { gender } = params

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Gender })

  console.log(currentPage, totalPages);

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const labels: Record<string, string> = {
    "men": "para hombres",
    "women": "para mujeres",
    "kid": "para niños",
    "unisex": "para todos"
  }

  // if (id === "3-pers") {
  //   notFound()
  // }

  return (
    <>
      <Title title={`Artículos ${(labels as any)[gender]}`} subtitle="Todos los productos" className="mb-2" />
      <ProductsGrid
        products={products}
      />

      <Pagination totalPages={totalPages}/>
    </>
  );
}