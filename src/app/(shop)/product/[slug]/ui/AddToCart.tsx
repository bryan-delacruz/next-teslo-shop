"use client"

import { useState } from "react"
import { QuantitySelector, SizeSelector } from "@/components"

import type { Product, Size } from "@/interfaces"

interface Props {
  product: Product
}

const AddToCart = ({ product }: Props) => {

  const [size, setSize] = useState<Size | undefined>()
  return (
    <>
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      <QuantitySelector
        quantity={2}
      />


      <button className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}

export default AddToCart