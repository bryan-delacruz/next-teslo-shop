import type { CartProduct } from "@/interfaces";
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[]

  addProductToCart: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({

      cart: [],

      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        console.log(cart)

        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size)

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity
            }
          }
          return item
        })

        set({ cart: updatedCartProducts })

      }
    })
    ,
    {
      name: 'shopping-store',
    }
  )
)