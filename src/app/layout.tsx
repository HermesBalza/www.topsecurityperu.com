import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import Link from 'next/link';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: 'swap',
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.topsecurityperu.com'),
  title: {
    default: "Top Security Perú | Seguridad de Altura",
    template: "%s | Top Security Perú"
  },
  description: "Líderes en seguridad electrónica, cámaras CCTV, y sistemas de vigilancia en Perú. Tecnología de punta para tu tranquilidad.",
  keywords: ["seguridad electrónica", "cámaras de seguridad", "CCTV", "alarmas", "control de acceso", "Perú", "videovigilancia"],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://www.topsecurityperu.com',
    siteName: 'Top Security Perú',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Top Security Perú - Soluciones de Seguridad'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@topsecurityperu',
    creator: '@topsecurityperu'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${roboto.variable}`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
