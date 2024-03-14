import { initialData } from "./seed"
import prisma from "../lib/prisma"

async function main() {

  // 1. Borrar registros previos
  await Promise.all(
    [
      prisma.productImage.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany()
    ]
  )

  const { products, categories } = initialData

  const categoriesData = categories.map(name => ({name}))

  // 2. Categorías

  await prisma.category.createMany({
    data: categoriesData
  })


  console.log("Seed ejecutado correctamente")
}

(() => {

  if (process.env.NODE_ENV === "production") return

  main()
}

)()