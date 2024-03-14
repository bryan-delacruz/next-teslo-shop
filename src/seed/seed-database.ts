import { initialData } from "./seed"
import prisma from "../lib/prisma"

async function main() {

  // 1. Borrar registros previos

  await prisma.productImage.deleteMany(),
  await prisma.product.deleteMany(),
  await prisma.category.deleteMany()

  const { products, categories } = initialData


  // 2. Categorías

  const categoriesData = categories.map(name => ({ name }))

  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany()
  console.log(categoriesDB)

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)
  console.log(categoriesMap);

  // 3. Productos

  products.forEach(async (product) => {
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    // Images

    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })



  console.log("Seed ejecutado correctamente")
}

(() => {

  if (process.env.NODE_ENV === "production") return

  main()
}

)()