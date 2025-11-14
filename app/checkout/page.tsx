'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatINR } from '@/lib/currency'

export default function CheckoutPage() {
  const { items, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-container px-4 py-8">
        <div className="empty-cart">
          <h1 className="mb-4 text-3xl font-bold lg:text-2xl md:text-2xl sm:text-2xl">Checkout</h1>
          <p>Your cart is empty. Please add items before checking out.</p>
          <Link href="/candles" className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-center font-semibold text-white no-underline transition-all duration-200">
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-container px-4 py-8">
      <h1 className="page-title">Checkout</h1>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 rounded-[12px] border border-subtle bg-card p-6 lg:p-5 md:p-4 sm:p-4">
          <h2 className="mb-4 text-xl font-bold lg:text-lg md:text-base sm:text-base">Order Summary</h2>

          <div className="mb-5 border-b border-subtle pb-4">
            {items.map((item) => (
              <div key={`${item.productId}:${item.fragranceId}`} className="mb-2 flex justify-between text-sm last:mb-0">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>{formatINR(item.pricePerUnit * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xl font-bold text-brand-dark lg:text-lg md:text-base sm:text-base">
            <span>Total:</span>
            <span>{formatINR(total)}</span>
          </div>
        </div>

        <div className="mb-6 rounded-[12px] border border-subtle bg-[rgba(122,210,159,0.05)] p-5 lg:p-4 md:p-4 sm:p-4">
          <h3 className="mb-3 text-lg font-bold lg:text-base md:text-base sm:text-base">Shipping & Delivery Information</h3>
          <p className="text-sm leading-relaxed text-muted lg:text-xs md:text-xs sm:text-xs">
            We offer delivery across India. Shipping costs and estimated delivery dates will be calculated at the next step.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Order placed successfully! (Demo) - Integrate with payment gateway here.')
          }}
          className="flex flex-col gap-4"
        >
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your full name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" required />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Street address" required />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-3 md:gap-3 sm:gap-3">
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="City" required />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input type="text" placeholder="XXXXXX" required />
            </div>
          </div>

          <button type="submit" className="add-to-cart-btn mt-5">
            Complete Order - {formatINR(total)}
          </button>

          <Link href="/cart" className="text-center text-sm font-semibold text-brand no-underline transition-colors duration-200 hover:text-brand-600">
            Back to Cart
          </Link>
        </form>
      </div>
    </div>
  )
}
