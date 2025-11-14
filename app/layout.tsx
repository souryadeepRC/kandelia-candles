import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

export const inter = Poppins({ weight: "500", subsets: ["latin"] });

export const viewport =
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

export const metadata: Metadata = {
  title: "Kandelia Candles | Premium Indian Candles",
  description:
    "Luxury candles with premium fragrances inspired by Indian traditions. Handcrafted with care.",
  //viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Toaster richColors position="top-right" />
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
