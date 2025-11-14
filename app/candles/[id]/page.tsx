"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getUnitPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { toast } from "sonner";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { items } = useCart(); 
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const activeItemInCart = items.find((item) => item.productId === id)

  if (!product) notFound();

  const [fragrance, setFragrance] = useState(product.fragrances[0].id);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const unitPrice = getUnitPrice(product, fragrance, qty);
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      fragranceId: fragrance,
      pricePerUnit: unitPrice,
      qty,
    });
    toast.success("Added to cart!");
  };
  useEffect(() => {
    if(!activeItemInCart) return;
    setQty(activeItemInCart.qty);
    setFragrance(activeItemInCart.fragranceId)

  },[activeItemInCart])

  const isInValidCart =
    (!!product?.maxQty && qty >= product.maxQty) ||
    qty <= 0 ||
    product.isOutOfStock;
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative blur elements */}
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-green/10 blur-3xl -z-10"></div>
      <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-green-600/10 blur-3xl -z-10"></div>

      <div className="mx-auto max-w-container px-4 py-12 lg:py-10 md:py-8 sm:py-6 relative z-10">
        {/* Back Button */}
        <Link
          href="/candles"
          className="group inline-flex items-center gap-2 mb-8 text-green-800  hover:text-green-dark transition-colors duration-300"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Candles
        </Link>

        {/* Product Detail Section */}
        <div className="grid gap-12 lg:gap-10 md:gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Image Container */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-green-600/30 to-green/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <div className="aspect-square bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center text-9xl font-black bg-gradient-to-br from-green-900 to-green-700 bg-clip-text text-white">
                    {product.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Container */}
          <div className="flex flex-col justify-start">
            {/* Header */}
            <div className="mb-2">
              <h1 className="mb-4 text-4xl font-black bg-gradient-to-r from-green-600 via-green to-green-700 bg-clip-text text-transparent lg:text-4xl md:text-3xl sm:text-2xl">
                {product.name}
              </h1>
              <p className="text-sm text-text-primary/70 leading-relaxed lg:text-base md:text-base sm:text-sm">
                {product.description}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-2 mb-2">
              {/* Fragrance Selector */}
              <div>
                <label className="block text-sm  text-text-primary mb-3">
                  Select Fragrance
                </label>
                <select
                  value={fragrance}
                  onChange={(e) => setFragrance(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-green-500 bg-white/80 backdrop-blur-xl text-text-primary  transition-all duration-300 hover:border-green-600/40 focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:border-transparent"
                >
                  {product.fragrances.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}{" "}
                      {f.priceModifier
                        ? `(+${formatINR(f.priceModifier)})`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Selector */}
              {product.isOutOfStock ? (
                <div className="text-sm text-red-500 pt-2 md:text-lg">
                  Out of Stock
                </div>
              ) : (
                <div>
                  <label className="block text-sm  text-text-primary mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      disabled={qty === 1}
                      className="flex items-center justify-center h-10 w-10 disabled:bg-green-100/10 disabled:cursor-not-allowed
                     rounded-lg border border-green-600/40 bg-white hover:bg-green-600/5 transition-all duration-300
                       text-green-600"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) =>
                        setQty(Math.max(1, Number(e.target.value)))
                      }
                      className="w-1/4 md:w-1/6  px-4 py-3 rounded-xl border border-green-500 bg-white/80 backdrop-blur-xl text-center text-text-primary  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:border-transparent"
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      disabled={!!product?.maxQty && qty >= product.maxQty}
                      className="flex items-center justify-center h-10 w-10  disabled:bg-gray-100 disabled:cursor-not-allowed
                    rounded-lg border border-green-600/40 bg-white hover:bg-green-600/5 transition-all duration-300  text-green-600"
                    >
                      +
                    </button>
                  </div>
                  {!!product?.maxQty && qty >= product.maxQty && (
                    <p className="text-sm text-red-500 pt-2">
                      Maximum {product.maxQty} candles can be ordered
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Bulk Pricing Tiers */}
            <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-green/5 backdrop-blur-xl p-6">
              <h3 className="text-lg  text-text-primary mb-4">Bulk Pricing (for Without Fragrance)</h3>
              <div className="space-y-1 md:space-y-2">
                {product.tiers.map((t, idx) => {
                  return (
                    <div
                      key={t.minQty}
                      className="flex items-center justify-between p-0  rounded-lg bg-white/50 hover:bg-white/80 transition-colors duration-300"
                    >
                      <span className="text-xs md:text-sm  text-text-primary/70">
                        {t.label}
                      </span>
                      <span className="text-xs md:text-sm bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent">
                        {formatINR(t.pricePerUnit)} / Candle
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Pricing Info */}
            <div className="mb-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-green-600/5 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-primary/60 ">Unit Price:</span>
                <strong className="text-2xl bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent">
                  {formatINR(unitPrice)}
                </strong>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-green-600/30 to-transparent my-4"></div>
              <div className="flex items-center justify-between">
                <span className="text-text-primary  text-lg">Total Price:</span>
                <strong className="text-3xl bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent">
                  {formatINR(totalPrice)}
                </strong>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isInValidCart}
              className="w-full md:w-1/2 group relative mb-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-lg 
                text-white 
                bg-gradient-to-r from-green-900 to-green-600 
                rounded-xl shadow-lg hover:shadow-2xl 
                disabled:from-gray-300 disabled:to-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
                transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-transform duration-700 group-hover:translate-x-full"></div>

              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="relative z-10">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
