import { Title } from "@/components";
import Link from "next/link";
import { initialData } from '@/seed/seed';
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string
  }
}

export default function OrdersByPage({ params }: Props) {
  const { id } = params

  // Todo: verificar
  // redirect(/)

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-start gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-boldt text-white mb-5",
              {
                "bg-red-500":false,
                "bg-green-700":true
              })
            }>
              <IoCardOutline size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>
            {/* Items */}
            {productsInCart.map(product => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px"
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>S/{product.price}</p>
                  <p className="font-bold">Subtotal: S/{product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p>Bryan De La Cruz</p>
              <p>Jirón Cavallini 118 dpt 301</p>
              <p>Distrito: San Borja</p>
              <p>Provincia: Lima Metropolitana</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>N° Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">S/ 100.00</span>

              <span>Impuestos (18%)</span>
              <span className="text-right">S/ 18.00</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">S/ 118.00</span>
            </div>

            <div className="mt-5 mb-2 w-full">
            <div className={
              clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-boldt text-white mb-5",
              {
                "bg-red-500":false,
                "bg-green-700":true
              })
            }>
              <IoCardOutline size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}