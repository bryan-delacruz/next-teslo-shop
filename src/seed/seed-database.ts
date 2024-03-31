import { initialData } from "./seed"
import prisma from "../lib/prisma"
import { countries } from "./seed-countries"

async function main() {

  // 1. Borrar registros previos
  await prisma.user.deleteMany()
  await prisma.country.deleteMany()

  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { products, categories, users } = initialData

  await prisma.user.createMany({
    data: users
  })

  await prisma.country.createMany({
    data: countries
  })

  // 2. Categorías

  const categoriesData = categories.map(name => ({ name }))

  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

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

  console.log({ Seed: "Seed ejecutado correctamente" })
}

(() => {

  if (process.env.NODE_ENV === "production") return

  main()
}

)()