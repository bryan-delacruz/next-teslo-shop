import { Product } from "@/interfaces"
import { ProductsGridItem } from "./ProductsGridItem"

interface Props {
  products: Product[]
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 mb-10">
      {
        products.map((product => (
          <ProductsGridItem key={product.slug} product={product} />
        )))
      }
    </div >
  )
}
