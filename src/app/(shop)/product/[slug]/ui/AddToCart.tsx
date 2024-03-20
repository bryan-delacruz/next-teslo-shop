"use client"

import { useState } from "react"
import { QuantitySelector, SizeSelector } from "@/components"

import type { Product, Size } from "@/interfaces"

interface Props {
  product: Product
}

const AddToCart = ({ product }: Props) => {

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)

    if (!size) return

    console.log({ size, quantity, product })
  }

  return (
    <>
      {
        posted && !size && (
          <span className="mt-2 text-red-500">
            Debe de seleccionar una talla
          </span>
        )
      }
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />


      <button
        className="btn-primary my-5"
        onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  )
}

export default AddToCart