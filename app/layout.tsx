import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ArtEcommerce - Premium Art Store",
  description: "Discover exclusive art pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased text-gray-900 bg-white`}>
        <AuthProvider>
          <ProductProvider>
            <OrderProvider>
              <CartProvider>
                <WishlistProvider>
                  {children}
                </WishlistProvider>
              </CartProvider>
            </OrderProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
