# Teslo Shop

[🇺🇸 Read in English](./README.md)

Tienda de ropa full stack inspirada en la Tesla Shop: catálogo, carrito, checkout con PayPal y panel de administración de productos, órdenes y usuarios.

**Demo en vivo:** [teslo-shop-bdlc.vercel.app](https://teslo-shop-bdlc.vercel.app/)

![Página de inicio de Teslo Shop](./public/imgs/teslo-shop-home.png)

## Qué hace

- **Catálogo.** Grilla de productos paginada, con filtro por género (hombres, mujeres, niños) y una página por producto con selector de tallas y stock en vivo.
- **Carrito y checkout.** Carrito guardado en un store de Zustand; checkout con dirección de envío guardada.
- **Órdenes.** Crear una orden corre en una transacción de Prisma que valida y descuenta el stock, así una orden nunca vende más de lo disponible.
- **Pagos.** Checkout con PayPal. El servidor consulta a PayPal el estado de la orden y solo la marca como pagada cuando está `COMPLETED`.
- **Cuentas.** Registro e inicio de sesión con email y contraseña (NextAuth v5, contraseñas con hash bcrypt). Historial de órdenes por usuario.
- **Panel de administración.** Protegido por rol en el middleware: crear y editar productos, subir imágenes a Cloudinary, ver todas las órdenes y cambiar el rol de los usuarios.

## Cómo está construido

| Área | Elección |
| --- | --- |
| App | Next.js 14 (App Router, Server Actions), React 18, TypeScript |
| Datos | PostgreSQL con Prisma; Docker Compose para la base de datos local |
| Auth | NextAuth v5 con el proveedor de credenciales; roles `user` y `admin` |
| Formularios | React Hook Form y Zod |
| Estado | Zustand para el carrito, la dirección del checkout y la UI |
| Pagos | PayPal JS SDK en el cliente, API REST de PayPal para verificar en el servidor |
| Imágenes | Cloudinary |
| UI | Tailwind CSS, Swiper para las galerías de producto |

## Correrlo en local

Necesitas Node.js (LTS) y Docker.

```bash
git clone https://github.com/bryan-delacruz/next-teslo-shop.git
cd next-teslo-shop
cp .env.template .env      # completa la URL de la base de datos, el secret de auth y las llaves de PayPal y Cloudinary
npm install
docker compose up -d       # PostgreSQL
npx prisma migrate dev
npm run seed               # productos y usuarios de ejemplo
npm run dev
```

Abre [localhost:3000](http://localhost:3000). Si el carrito muestra productos viejos de una ejecución anterior, limpia el localStorage del navegador.
