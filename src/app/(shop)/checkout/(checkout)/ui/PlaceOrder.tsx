"use client"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {

  const [loaded, setLoaded] = useState(false)

  const address = useAddressStore(state => state.address)

  const { itemsInCart, subtotal, tax, total } = useCartStore(state => state.getSummaryInformation())


  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Cargando...</p>

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>N° Productos</span>
        <span className="text-right">{itemsInCart === 1 ? "1 artíctulo" : `${itemsInCart} artículos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Impuestos (18%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condicions</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>
        <button
          className="flex btn-primary justify-center"
        // href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  )
}
