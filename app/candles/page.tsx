"use client";

import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";

export default function CandlesPage() {
  const { items } = useCart(); 

  return (
    <section className="relative overflow-hidden bg-white py-10 lg:py-10 md:py-10 sm:py-10">
      {/* Decorative blur elements */}
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-green/10 blur-3xl -z-10"></div>
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-green-600/10 blur-3xl -z-10"></div>

      <div className="mx-auto max-w-container px-4 relative z-10">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block">
            <span className="px-4 rounded-full bg-green/10 text-green-600 text-2xl md:text-4xl  font-bold tracking-wide">
              Premium Collection
            </span>
          </div>
          <p className="max-w-2xl mx-auto text-md text-text-primary/70 lg:text-base md:text-base sm:text-sm">
            Handcrafted premium candles with exotic fragrances inspired by
            Indian traditions
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 lg:gap-5 md:gap-4 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isAddedToCart={!!items.find((item) => item.productId === p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
