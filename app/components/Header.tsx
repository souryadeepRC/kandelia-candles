"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Header() {
  const { items } = useCart() || { items: [] };
  const count = items.reduce((s: number, it) => s + it.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-transform duration-200 hover:scale-105">
          <div className="relative">
            <Image 
              src="/images/logo.jpg" 
              alt="Kandelia Logo" 
              width={48} 
              height={48}
              className="rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-black text-text-primary">Kandelia</h1>
            <p className="text-xs text-muted">Premium Candles</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 ml-auto">
          <Link
            href="/candles"
            className="relative text-sm font-semibold text-text-primary
             transition-all duration-300 hover:text-green-600 after:absolute 
             after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r 
             after:from-green-600 after:to-green after:transition-all after:duration-300
              hover:after:w-full"
          >
            Candles
          </Link>

          <Link
            href="/cart"
            className="group relative flex items-center gap-2.5 
            text-sm font-semibold text-text-primary transition-all 
            duration-300 hover:text-green-600"
          >
            <p>Cart</p>
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full 
              bg-gradient-to-r from-green-500 to-green-600 text-xs font-bold text-white shadow-lg animate-pulse">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
