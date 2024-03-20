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

  const addToCart = () => {
    console.log({ size, quantity });
  }

  return (
    <>
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