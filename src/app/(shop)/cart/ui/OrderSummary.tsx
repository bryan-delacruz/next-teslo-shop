"use client"

import { useCartStore } from "@/store"
import { currencyFormat, objVariables } from "@/utils"
import { useEffect, useState } from "react"

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { itemsInCart, subtotal, tax, total } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Loading ...</p>

  return (
    <div className="grid grid-cols-2">
      <span>N° Productos</span>
      <span className="text-right">{itemsInCart === 1 ? "1 artíctulo" : `${itemsInCart} artículos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>

      <span>Impuestos ({objVariables.tax * 100}%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>

  )
}
