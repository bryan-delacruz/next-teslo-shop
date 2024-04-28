'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'
import { setTransactionId } from "@/actions"

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer()

  const rountedAmount = (Math.round(amount * 100) / 100)

  if (isPending) {
    return (
      <div className="animate-pulse mb-14">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${rountedAmount}`
          }
        }
      ]
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) {
      throw new Error("No se pudo actualizar la orden")
    }

    console.log({ transactionId });

    return transactionId
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
    // onApprove={ }
    />
  )
}