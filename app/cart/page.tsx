"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { products } from "@/lib/products";
import { toast } from "sonner";
import OrderProcessSteps from "@/components/OrderProcessSteps";

export default function CartPage() {
  const { items, remove, total } = useCart();

  // Function to generate cart message for WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "*Kandelia Candles - Order Details*\n\n";
    message += " *Products:*\n";

    items.forEach((item) => {
      message += `• ${item.name} (${item.fragranceId})\n`;
      message += `  Qty: ${item.qty} x ${formatINR(
        item.pricePerUnit
      )} = ${formatINR(item.pricePerUnit * item.qty)}\n`;
      message += " -------------------------------------------- \n";
    });

    message += `\n*Total: ${formatINR(total)}*\n`;
    message += `\nPlease send this message and proceed with payment via UPI. Thank you!`;

    return encodeURIComponent(message);
  };

  // Function to open WhatsApp with cart data
  const handleProceedToCheckout = () => {
    const whatsappNumber = "919163555744"; // Replace with your WhatsApp number
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/+${whatsappNumber}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp to complete your order!");
  };

  if (items.length === 0) {
    return (
      <div className="relative overflow-hidden bg-white   flex items-center justify-center">
        <div className="mx-auto max-w-container px-4 py-10 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-6 rounded-full bg-green/10 mb-6">
              <svg
                className="w-16 h-16 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-2xl font-black bg-gradient-to-r from-green-900 via-green to-green-700 bg-clip-text text-transparent lg:text-4xl md:text-3xl sm:text-2xl">
              Your Cart is Empty
            </h1>
            <p className="mb-8 max-w-xl mx-auto text-md text-text-primary/70 lg:text-base md:text-base sm:text-sm">
              No items yet. Let's add some premium candles to your collection!
            </p>
            <Link
              href="/candles"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-900 to-green-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Continue Shopping
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white py-12 lg:py-10 md:py-8 sm:py-6">
      <div className="mx-auto max-w-container px-4 relative z-10">
        {/* Cart Layout */}
        <div className="grid gap-8 lg:gap-6 grid-cols-1 md:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}:${item.fragranceId}`}
                  className="group relative rounded-2xl border border-green-400 bg-white/80 backdrop-blur-2xl p-6 transition-all duration-500 hover:border-green-600/40 hover:shadow-lg"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-green-600/20 to-green/10 opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-text-primary mb-2 md:text-lg sm:text-base">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold mb-3">
                        Quantity: {item.qty}
                      </p>
                      <p className="text-text-primary/60 text-sm">
                        {formatINR(item.pricePerUnit)} per unit
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-4 md:gap-3">
                      {/* Price */}
                      <div className="text-right min-w-24">
                        <p className="text-2xl font-black bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent md:text-xl sm:text-lg">
                          {formatINR(item.pricePerUnit * item.qty)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => remove(item.productId, item.fragranceId)}
                        className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300 ml-2"
                        title="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <OrderProcessSteps />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-green-600/5 backdrop-blur-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-text-primary mb-6 lg:text-xl md:text-lg sm:text-lg">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-text-primary/70 font-semibold">
                    Subtotal
                  </span>
                  <span className="font-bold text-text-primary">
                    {formatINR(total)}
                  </span>
                </div>
                <div className="flex items-center justify-between ">
                  <span className="text-text-primary/70 font-semibold">
                    Shipping
                  </span>
                  <span className="text-xs md:text-lg text-green-600">
                    Based on your location
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-green-600/30 to-transparent my-4"></div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-text-primary">
                    Total
                  </span>
                  <span className="text-3xl font-black bg-gradient-to-r from-green-900 via-green to-green-600 bg-clip-text text-transparent lg:text-2xl md:text-xl">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button - Now triggers WhatsApp */}
              <button
                onClick={handleProceedToCheckout}
                className="group relative w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-900 via-green to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden mb-3 flex items-center justify-center gap-2"
              >
                <span className="relative z-10">Place Order</span>
              </button>

              {/* Continue Shopping */}
              <Link
                href="/candles"
                className="block text-center py-3 px-4 rounded-lg border border-green-600/40 text-green-600 font-bold hover:bg-green-600/5 transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
          {/* Decorative blur elements */}
        </div>
      </div>
    </div>
  );
}
