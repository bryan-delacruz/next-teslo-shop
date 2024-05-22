'use server'

import { v2 as cloudinary } from 'cloudinary';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: number, imageUrl: string) => {

  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'No se pueden borrar imágenes de FS'
    }
  }

  const imageName = imageUrl
    .split('/')
    .pop()
    ?.split('.')[0] ?? ''

  try {

    await cloudinary.uploader.destroy(imageName)

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/products/${deletedImage.product.slug}`)

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo eliminar la imagen'
    }
  }

}