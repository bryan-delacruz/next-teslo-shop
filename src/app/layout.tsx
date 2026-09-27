import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../config/fonts";
import { Providers } from "@/components";


const DESCRIPTION =
  'Full stack e-commerce inspired by the Tesla Shop: catalog, cart, checkout with PayPal, order management and an admin panel. Built with Next.js, TypeScript and Prisma.';

export const metadata: Metadata = {
  metadataBase: new URL('https://teslo-shop-bdlc.vercel.app'),
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop'
  },
  description: DESCRIPTION,
  // Sin Open Graph, LinkedIn no genera la vista previa del link.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Teslo Shop',
    title: 'Teslo Shop — Full stack e-commerce',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teslo Shop — Full stack e-commerce',
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
