"use server"

import { auth } from "@/auth.config"
import { Address, Size } from "@/interfaces"
import prisma from "@/lib/prisma"

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  const session = await auth()
  const userId = session?.user.id

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario"
    }
  }

  // Obtener la información de los productos
  // Nota: Recordar que podemos llevar +2 productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(p => p.productId)
      }
    }
  })
  // Calcular los montos
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)

  // Los totales de tax, subtotal y total
  const { subtotal, tax, total } = productIds.reduce((totals, item) => {
    const productQuantity = item.quantity
    const product = products.find(p => p.id === item.productId)

    if (!product) throw new Error(`${item.productId} no existe - 500`)

    const subTotal = product.price * productQuantity
    totals.subtotal += subTotal
    totals.tax += subTotal * 0.15
    totals.total += subTotal * 1.15

    return totals
  }, { subtotal: 0, tax: 0, total: 0 })
  console.log({ subtotal, tax, total })
}