import type { CartProduct } from "@/interfaces";
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[]

  getTotalItems: () => number

  addProductToCart: (product: CartProduct) => void

  updateProductQuantity: (product: CartProduct, quantity: number) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({

      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((acc, item) => acc + item.quantity, 0)
      },

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

      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()

        const updateCartProduct = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity }
          }
          return item
        })

        set({ cart: updateCartProduct })


      }
    })
    ,
    {
      name: 'shopping-store',
    }
  )
)