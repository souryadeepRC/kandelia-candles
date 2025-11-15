import Link from "next/link";
import type { Product } from "@/types";
import { formatINR } from "@/lib/currency";

export default function ProductCard({
  product,
  isAddedToCart,
}: {
  product: Product;
  isAddedToCart: boolean;
}) {
  const initials = product.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="group relative h-full">
      {/* Glowing background on hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-green-600/40 via-green/30 to-green-600/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 -z-10"></div>

      {/* Card */}
      <div className="relative h-full p-5 overflow-hidden rounded-2xl border border-green-200 bg-white/80 backdrop-blur-2xl transition-all duration-500 hover:border-green-600/40 hover:shadow-2xl flex flex-col">
        {/* Image Container */}
        <Link href={`/candles/${product.id}`}>
          <div className="relative overflow-hidden">
            {product.image ? (
              <img
                className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={product.image}
                alt={product.name}
              />
            ) : (
              <div className="aspect-square flex items-center justify-center bg-gradient-to-b from-green-900 to-green-600 text-4xl font-bold text-white">
                {initials}
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="relative flex flex-col gap-3 p-5 sm:p-4 flex-grow">
          {/* Badge */}
          {product.isBestseller ? (
            <div className="inline-flex items-center gap-1.5 w-fit rounded-full border border-green-700 bg-gradient-to-r from-green-600/10 to-green/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <span className="text-xs text-green-dark">⭐ Best Seller</span>
            </div>
          ) : (
            <div className="h-1/7">&nbsp;</div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold text-text-primary transition-colors duration-300 group-hover:text-green-dark md:text-2xl sm:text-2xl">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-muted group-hover:text-text-primary/70 transition-colors duration-300 line-clamp-2 flex-grow md:text-xs sm:text-xs">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div>
            <span className="text-xs">Starting from</span>
            <div className="bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-2xl font-black text-transparent md:text-3xl sm:text-xl">
              {formatINR(product.basePrice)} <span className="text-sm"> / Candle</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            className="group/btn inline-flex items-center justify-center gap-2 rounded-lg mt-4
             bg-gradient-to-r from-green-900 to-green-600 px-4 py-4 text-center text-xl
               text-white shadow-lg hover:shadow-xl transition-all duration-300 
              hover:scale-105 active:scale-95 md:px-3 md:py-4 md:text-lg sm:w-full"
            href={`/candles/${product.id}`}
          >
            {isAddedToCart ? "Update Quantity" : "View Details"}
            <svg
              className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-transform duration-700 group-hover:translate-x-full"></div>
      </div>
    </article>
  );
}
