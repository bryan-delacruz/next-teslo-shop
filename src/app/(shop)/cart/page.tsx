import { QuantitySelector, Title } from "@/components";
import Link from "next/link";
import { initialData } from '@/seed/seed';
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-start gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>
            {/* Items */}
            {productsInCart.map(product => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width:"100px",
                    height:"100px"
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                    <p>{product.title}</p>
                    <p>S/{product.price}</p>
                    <QuantitySelector quantity={3}/>
                    <button className="underline mt-3">
                      Remover
                    </button>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
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
              <Link 
                href="/checkout/address"
                className="flex btn-primary justify-center"
              >
                  Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}