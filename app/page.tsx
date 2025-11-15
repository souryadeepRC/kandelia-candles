import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Image from "next/image";
import { formatINR } from "./lib/currency";
import OrderProcessSteps from "./components/OrderProcessSteps";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-600/15 via-green/5 to-white pt-10 lg:pt-16 md:pt-12 sm:pt-10">
      {/* Decorative blur elements */}
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-green/10 blur-3xl -z-10"></div>
      <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-green-600/10 blur-3xl -z-10"></div>

      <div className="mx-auto max-w-container px-4 text-center relative z-10">
        {/* Logo with glow effect */}
        <div className="mb-4 inline-block relative group md:mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-green/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          <Image
            src="/images/logo.jpg"
            alt="Kandelia Logo"
            className="relative mx-auto rounded-2xl shadow-lg group-hover:shadow-2xl 
             transition-all duration-300 
             w-24 sm:w-28 md:w-36 lg:w-44 h-auto"
            width={180}
            height={180}
          />
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-3xl font-black bg-gradient-to-r from-green-900 via-green to-green-600 bg-clip-text text-transparent lg:text-5xl md:text-4xl sm:text-3xl">
          Kandelia Candles
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-2xl mx-auto text-sm text-text-primary/80 leading-relaxed lg:text-xl md:text-base sm:text-sm">
          Discover the art of premium candle making. Each candle is handcrafted
          with exotic fragrances inspired by Indian traditions.
        </p>

        {/* CTA Button */}
        <Link
          href="/candles"
          className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-900 to-green-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Explore Our Collection
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
    </section>
  );
};
const FeaturedSection = () => {
  const featuredProducts = products.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-white   ">
      {/* Gradient background with animated elements */}

      {/* Animated blob decorations */}

      <div className="relative z-10 mx-auto max-w-container px-4">
        {/* Main heading with gradient */}
        <div className="mb-8">
          <h2 className="my-5 text-center text-3xl font-bold lg:text-3xl md:text-2xl sm:text-xl">
            Bestseller Candles
          </h2>
          <p className="w-l text-sm leading-relaxed text-center lg:text-lg md:text-base sm:text-sm">
            Discover the premium collection loved by thousands
          </p>
          <p className="w-l text-md leading-relaxed text-center lg:text-lg md:text-base sm:text-sm">
            Handcrafted with rare ingredients and timeless elegance
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-20 grid gap-8 lg:gap-6 md:gap-4 sm:gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="group relative"
              style={{
                animation: `slideInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  idx * 0.12
                }s both`,
              }}
            >
              {/* Glowing background on hover */}
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br 
              from-green-600/40 via-green/30 to-green-600/20 opacity-0 blur-xl
               transition-all duration-500 group-hover:opacity-100"
              ></div>

              {/* Card */}
              <div
                className="relative p-4 h-full overflow-hidden rounded-2xl border
               bg-white/80 backdrop-blur-2xl transition-all duration-500
                hover:border-green-600/40 hover:shadow-2xl"
              >
                {/* Image container with overlay */}
                <div className="relative overflow-hidden  bg-green">
                  <img
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-48"
                    src={product.image}
                    alt={product.name}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                {/* Content */}
                <div className="relative px-6 py-5 sm:px-5 sm:py-4">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-1.5 border border-green-400 rounded-full bg-gradient-to-r from-green-600/10 to-green/10 px-3 py-1.5 backdrop-blur-sm">
                    {/* <span className="h-2 w-2 rounded-full bg-green-600"></span> */}
                    <span className="text-xs ">⭐ Best Seller</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 text-2xl font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-green-dark lg:text-2xl md:text-2xl sm:text-base">
                    {product.name}
                  </h3>

                  {/* Description */}
                  {product.description && (
                    <p className="mb-4 text-xs group-hover:text-text-primary/70 transition-colors duration-300 line-clamp-2 lg:text-xs md:text-xs sm:text-xs">
                      {product.description}
                    </p>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="to-green bg-clip-text 
                    text-4xl font-black text-green lg:text-4xl md:text-5xl sm:text-xl"
                    >
                      {formatINR(product.basePrice)} <span className="text-sm"> / Candle</span>
                    </div>
                  </div>
                  <Link
                    className="mt-8 w-full inline-block rounded-lg  bg-gradient-to-r from-green-900 to-green-600
         px-5 py-4 text-center text-xl text-white 
         shadow-brand-sm transition-all duration-160 hover:translate-y-[-2px] 
         hover:shadow-brand-md active:translate-y-0"
                    href={`/candles/${product.id}`}
                  >
                    See Details
                  </Link>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-transform duration-700 group-hover:translate-x-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-green-600 to-green p-0 shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0">
            <div className="absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-white/5 blur-3xl"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};
export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Shipping & Details Section */}
      <section className=" pt-10 text-center lg:pt-10 md:pt-12 sm:pt-10">
        <div className="mx-auto max-w-container px-4 py-8">
          <h2 className="text-center text-2xl font-bold lg:text-2xl md:text-2xl sm:text-xl">
            Why Choose Kandelia?
          </h2>

          <div className="grid gap-6 lg:gap-4 md:gap-3 sm:gap-3 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] my-10 mx-10">
             <ShippingCard
              icon="✨"
              title="Premium Quality"
              description="Long-lasting Burn Time. 100% cotton wick. Made with soy wax. Smooth flame"
            />
             <ShippingCard
              icon="🔥"
              title="Clean & Safe"
              description="Smokeless flame. Dripless burn. Consistent, steady performance"
            />
            <ShippingCard
              icon="✈️"
              title="Fast Shipping"
              description="Delivery across India within 3-5 business days. Free shipping on
                orders above ₹2000"
            />

            <ShippingCard
              icon="🛡️"
              title="100% Authentic"
              description="Premium quality candles handcrafted with natural wax and finest
                fragrances"
            />
            <ShippingCard
              icon="💚"
              title="Eco-Friendly"
              description="Sustainable packaging and environmentally conscious production
                methods"
            />
            <ShippingCard
              icon="📦"
              title="Secure Packaging"
              description="Each candle is carefully wrapped to ensure it arrives in perfect
                condition"
            />
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="bg-gradient-to-b from-green-600/15 via-green/5 to-white py-16 text-center lg:py-14 md:py-12 sm:py-10">
        <h2 className="text-center text-2xl font-bold lg:text-3xl md:text-2xl sm:text-xl">
          Connect With Us
        </h2>

        <div
          className="mt-10 mx-8 
        grid gap-6 lg:gap-4 md:gap-3 sm:gap-3 grid-cols-[repeat(auto-fit,minmax(250px,2fr))]"
        >
          {/* Instagram */}
          <div
            className="w-full mx-auto rounded-[12px] border border-subtle bg-white p-5 text-center shadow-card
             transition-all duration-200 hover:translate-y-[-6px] hover:shadow-card-lg lg:p-15 md:p-10 sm:p-5"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[12px] text-4xl lg:h-14 lg:w-14 md:h-12 md:w-12 sm:h-12 sm:w-12 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700 text-white">
              <svg
                className="fill-white"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.694.27-1.285.645-1.863 1.223-.578.578-.953 1.17-1.223 1.864-.267.788-.468 1.658-.527 2.936C.039 8.333.024 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.27.694.645 1.286 1.223 1.864.578.578 1.17.953 1.864 1.223.788.267 1.658.468 2.936.528 1.28.058 1.689.072 4.947.072s3.668-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.528.694-.27 1.286-.645 1.864-1.223.578-.578.953-1.17 1.223-1.864.267-.788.468-1.658.528-2.936.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.27-.694-.645-1.286-1.223-1.864-.578-.578-1.17-.953-1.864-1.223-.788-.267-1.658-.468-2.936-.528C15.667.048 15.26.035 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.17.054 1.805.244 2.227.408.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849 0 3.203-.009 3.585-.07 4.849-.054 1.17-.244 1.805-.408 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07-3.203 0-3.585-.009-4.849-.07-1.17-.054-1.805-.244-2.227-.408-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849 0-3.203.009-3.585.07-4.849.054-1.17.244-1.805.408-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z" />
                <circle cx="12" cy="12" r="3.56" />
                <circle cx="18.406" cy="5.594" r="0.83" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold lg:text-xl md:text-lg sm:text-base">
              Instagram
            </h3>
            <p className="mb-5 text-sm text-muted lg:mb-3 md:mb-3 sm:mb-4">
              Follow us for daily inspiration & updates
            </p>
            <a
              href="https://www.instagram.com/kand_elia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-6 py-3 text-center text-sm text-white transition-all duration-200 hover:translate-y-[-2px]
                md:px-5 md:py-5 md:text-lg sm:w-full sm:px-4 sm:py-2.5 sm:text-xs bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_4px_12px_rgba(240,148,51,0.2)] hover:shadow-[0_6px_16px_rgba(240,148,51,0.3)]"
            >
              Follow @kandeliacandles
            </a>
          </div>

          {/* WhatsApp */}
          <div
            className="w-full mx-auto rounded-[12px] border border-subtle bg-white p-5 text-center shadow-card
             transition-all duration-200 hover:translate-y-[-6px] hover:shadow-card-lg lg:p-15 md:p-10 sm:p-5"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[12px] text-4xl lg:h-14 lg:w-14 md:h-12 md:w-12 sm:h-12 sm:w-12 bg-gradient-to-br from-emerald-400 to-teal-600 text-white">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.15-1.739-.861-2.015-.96-.276-.099-.476-.15-.673.15-.197.299-.76.959-.929 1.157-.168.198-.337.223-.634.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.673-1.612-.922-2.207-.243-.579-.487-.5-.673-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.537 0-2.852-.666-2.852-2.666 0-2 1.315-2.666 2.852-2.666 1.537 0 2.852.666 2.852 2.666 0 2-1.315 2.666-2.852 2.666" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold lg:text-xl md:text-lg sm:text-base">
              WhatsApp
            </h3>
            <p className="mb-5 text-sm text-muted lg:mb-3 md:mb-3 sm:mb-4">
              Chat with us for quick support
            </p>
            <a
              href="https://wa.me/+919163555744?text=Hi%20Kandelia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-6 py-3 text-center text-sm   text-white transition-all duration-200 hover:translate-y-[-2px]
                md:px-5 md:py-5 md:text-lg sm:w-full sm:px-4 sm:py-2.5 sm:text-xs
                bg-gradient-to-r from-emerald-500 to-teal-600 shadow-[0_4px_12px_rgba(37,211,102,0.2)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.3)]"
            >
              Connect with Whatsapp
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedSection />

      {/* Order Process Information */}
      <OrderProcessSteps />
    </>
  );
}
const ShippingCard = ({ title, description, icon }: any) => {
  return (
    <div
      className="rounded-[12px] border border-subtle bg-card p-7 text-center
     transition-all duration-200 hover:translate-y-[-4px] hover:shadow-card-lg
     lg:p-5 md:p-4 sm:p-4"
    >
      <div className="mb-4 inline-block text-5xl lg:text-4xl md:text-4xl sm:text-4xl">
        {icon}
      </div>
      <h3
        className="mb-3 text-lg font-bold text-text-primary lg:text-base md:text-base sm:text-base
           "
      >
        {title}
      </h3>
      <p
        className="text-sm text-muted lg:text-xs md:text-xs sm:text-xs
        leading-relaxed text-muted "
      >
        {description}
      </p>
    </div>
  );
};
