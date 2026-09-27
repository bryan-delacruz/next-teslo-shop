import { ImageResponse } from 'next/og';

// Imagen que representa la tienda al compartir el link (LinkedIn, WhatsApp, etc.).
export const alt = 'Teslo Shop — Full stack e-commerce';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          color: '#111827',
          fontFamily: 'sans-serif',
          background: 'linear-gradient(150deg, #ffffff 0%, #f3f4f6 60%, #e5e7eb 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 40 }}>
          <span style={{ fontWeight: 700 }}>Teslo</span>
          <span>| Shop</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, maxWidth: 960 }}>
            Full stack e-commerce.
          </div>
          <div style={{ fontSize: 30, color: '#4b5563', maxWidth: 900 }}>
            Catalog, cart, PayPal checkout, orders and an admin panel.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#6b7280', fontFamily: 'monospace' }}>
          Next.js · TypeScript · Prisma · PostgreSQL
        </div>
      </div>
    ),
    size,
  );
}
