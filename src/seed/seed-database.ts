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

  const categoriesDB = await prisma.category.findMany()
  console.log(categoriesDB)

  const categoriesMap = categoriesDB.reduce((map, category)=>{
    map[category.name.toLowerCase()]=category.id
    return map
  },{} as Record<string,string>)
  console.log(categoriesMap);
  

  console.log("Seed ejecutado correctamente")
}

(() => {

  if (process.env.NODE_ENV === "production") return

  main()
}

)()