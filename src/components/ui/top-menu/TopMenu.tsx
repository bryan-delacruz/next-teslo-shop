"use client"
import { titleFont } from "@/config/fonts"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import Link from "next/link"
import { useUIStore } from "@/store"

export const TopMenu = () => {

  const openMenu = useUIStore(state => state.openSideMenu)

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <span>Habitaciones de:</span>
        <Link href="/category/1-pers" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">1 pers</Link>
        <Link href="/category/2-pers" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">2 pers</Link>
        <Link href="/category/3-pers" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">3 pers</Link>
      </div>
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openMenu()}>
          Menú
        </button>
      </div>
    </nav>
  )
}
