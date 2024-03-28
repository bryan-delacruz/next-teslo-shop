import type { CartProduct } from "@/interfaces";
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[]

  getTotalItems: () => number

  getSummaryInformation: () => {
    subtotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }

  addProductToCart: (product: CartProduct) => void

  updateProductQuantity: (product: CartProduct, quantity: number) => void

  removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({

      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((acc, item) => acc + item.quantity, 0)
      },

      getSummaryInformation: () => {
        const { cart,getTotalItems } = get()

        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const tax = subtotal * 0.15
        const total = subtotal + tax
        const itemsInCart = getTotalItems()

        return { subtotal, tax, total, itemsInCart }
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        console.log({cart})

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


      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get()

        const updatedCartProducts = cart.filter(item => item.id !== product.id || item.size !== product.size)

        set({ cart: updatedCartProducts })
      }
    })
    ,
    {
      name: 'shopping-store',
    }
  )
)