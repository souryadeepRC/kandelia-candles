"use client";

import { use, useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getUnitPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { toast } from "sonner";
import Select from "@/components/Select";
import { Fragrance } from "@/types";
import QuantityCount from "@/components/QuantityCount";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Card from "@/components/Card";
import CartIcon from "@/icons/CartIcon";

const ProductImageBox = ({ image, name }: any) => {
  return (
    <div className="p-2 flex items-start justify-center">
      <div
        className="md:h-[50%] md:w-[90%] lg:h-[80%] lg:w-[95%] md:max-w-[400px] md:max-h-[300px] lg:max-w-[600px] lg:max-h-[600px] 
      flex items-center justify-center p-2 "
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};
const setFragranceTxt = (fragrance: Fragrance) => {
  if (!fragrance.priceModifier) return fragrance.name;
  return `${fragrance.name}  ${`(+${formatINR(fragrance.priceModifier)})`}`;
};

const ProductDetailPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ Fragrance: string }>;
}) => {
  const { items } = useCart();
  const { id } = use(params);
  const { Fragrance: activeFragranceId } = use(searchParams);

  const product = products.find((p) => p.id === id);
  const activeItemInCart = useMemo(() => {
    if (!activeFragranceId) {
      return items.find((item) => item.productId === id);
    }
    return items.find(
      (item) => item.productId === id && item.fragranceId === activeFragranceId
    );
  }, [id, activeFragranceId]);

  if (!product) notFound();

  const [fragrance, setFragrance] = useState<string>(product.fragrances[0].id);
  const [qty, setQty] = useState<number>(1);
  const [addBtnTxt, setAddBtnTxt] = useState<string>("Add to Cart");
  const { add } = useCart();

  const unitPrice = getUnitPrice(product, fragrance, qty);
  const totalPrice = unitPrice * qty;

  const fragranceOptions = useMemo(() => {
    return product.fragrances.map((fragrance) => ({
      id: fragrance.id,
      value: fragrance.id,
      displayText: setFragranceTxt(fragrance),
    }));
  }, [id]);

  const handleAddToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      fragranceId: fragrance,
      fragranceName:
        product.fragrances.find((f) => f.id === fragrance)?.name || "",
      pricePerUnit: unitPrice,
      qty,
    });
    toast.success(product.name + " Added to cart!");
  };

  useEffect(() => {
    if (!activeItemInCart) return;
    setQty(activeItemInCart.qty);
    setFragrance(activeItemInCart.fragranceId);
    setAddBtnTxt("Update Cart");
  }, [activeItemInCart]);

  const isInValidCart =
    (!!product?.maxQty && qty >= product.maxQty) ||
    qty <= 0 ||
    product.isOutOfStock;

  return (
    <div className="relative overflow-hidden bg-white p-5">
      <Link
        href="/candles"
        className="group inline-flex items-center gap-2 mb-8 text-green-800 
           hover:text-green-dark transition-colors duration-300"
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

      <div className="grid gap-5 lg:gap-10 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <ProductImageBox image={product.image} name={product.name} />

        <div className="flex flex-col justify-start">
          {product.isBestseller && (
            <div className="inline-flex items-center gap-1.5 w-fit rounded-full border border-green-700 bg-gradient-to-r from-green-600/10 to-green/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <span className="text-xs text-green-dark">⭐ Best Seller</span>
            </div>
          )}
          <h1 className="mb-4 font-bold text-primary-color text-3xl lg:text-4xl md:text-3xl sm:text-2xl">
            {product.name}
          </h1>
          <p className="text-sm text-secondary-color lg:text-base md:text-base sm:text-sm">
            {product.description}
          </p>
          <p className="my-4 text-lg font-semibold">🔥Burn time: {product.burnTime}</p>

          <div className="my-2 ">
            <p className="text-primary-color font-bold">
              <span className="text-3xl">{formatINR(totalPrice)}</span> ({" "}
              {formatINR(unitPrice)} / Candle)
            </p>
            <Select
              label="Select Fragrance"
              value={fragrance}
              onChange={setFragrance}
              options={fragranceOptions}
            />

            {product.isOutOfStock ? (
              <div className="text-sm text-red-500 pt-2 md:text-lg">
                Out of Stock
              </div>
            ) : (
              <QuantityCount
                label="Quantity"
                value={qty}
                onChange={setQty}
                onAdd={() => setQty((qty) => qty + 1)}
                onReduce={() => setQty((qty) => qty - 1)}
                isReduceDisabled={qty === 1}
                isAddDisabled={!!product?.maxQty && qty >= product.maxQty}
                errorMessage={
                  !!product?.maxQty && qty >= product.maxQty
                    ? `Maximum ${product.maxQty} ${product.name} candles can be ordered`
                    : undefined
                }
              />
            )}
          </div>
          {!isInValidCart && (
            <Button
              onClick={handleAddToCart}
              disabled={isInValidCart}
              label={addBtnTxt}
              startIcon={CartIcon}
            />
          )}
        </div>
      </div>

      <Divider />

      <Card
        title="Bulk Pricing Offer"
        description="This pricing is applicable for without fragrance candles. For
          Fragrance extra charges applicable"
        options={product.tiers.map((tier) => ({
          title: tier.label,
          description: tier.description || "",
        }))}
      />
      <Divider />
      <Card
        title="Shipping Information"
        description="Fast, safe, and eco-friendly delivery to your doorstep"
        options={[
          {
            title: "Courier Partner",
            description: "BlueDart / Delhivery / Ekart",
          },
          {
            title: "Dispatch",
            description: "Ships within 24-48 hours",
          },
          {
            title: "Delivery",
            description: "3-7 business days (depending on location)",
          },
          {
            title: "Tracking",
            description:
              "Tracking link shared via WhatsApp & email once shipped",
          },
          {
            title: "Packaging",
            description: "Damage-proof, eco-friendly packaging",
          },
        ]}
      />
    </div>
  );
};

export default ProductDetailPage;
