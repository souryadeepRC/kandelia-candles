import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "4918319881ec9a9668cd88f3",
    name: "Whismal Bubble",
    description:
      "A soft, floral-themed collection that captures the beauty and serenity of daisies in bloom",
    basePrice: 90,
    image: "/images/Bubble_Candles.png",
    fragrances: [
      {
        id: "4918319881ek9a9668cd88f3",
        name: "Without Fragrance",
        priceModifier: 0,
      },
      {
        id: "4918319881ec9a9664cd88f3",
        name: "Lavender + Vanilla",
        priceModifier: 50,
      },
    ],
    burnTime: "5 - 6 Hours Each",
    tiers: [
      {
        minQty: 1,
        label: "Base Price",
        description: "Purchase at ₹90 per candle for orders up to 10 candles",
        pricePerUnit: 90,
      },
      {
        minQty: 11,
        label: "12% OFF",
        description: "Purchase at ₹82 per candle for orders above 10 candles",
        pricePerUnit: 80,
      },
      {
        minQty: 31,
        label: "23% OFF",
        description: "Purchase at ₹70 per candle for orders above 30 candles",
        pricePerUnit: 70,
      },
      {
        minQty: 51,
        label: "28% OFF",
        description: "Purchase at ₹65 per candle for orders above 50 candles",
        pricePerUnit: 65,
      },
    ],
    isBestseller: true,
  },
  {
    id: "6918319881ec9a9668cd88f3",
    name: "Blooming Daisy",
    description:
      "Elegant, nature-inspired candles designed to bring the calm of blooming daisies into your space",
    basePrice: 20,
    image: "/images/Dazy_candles.png?w=500&h=500&fit=crop",
    fragrances: [
      {
        id: "6918319881ec9a9668cd98f3",
        name: "Without Fragrance",
        priceModifier: 0,
      },
      { id: "6918319881ec9a9668cd78f3", name: "Rose + Oud", priceModifier: 10 },
    ],
    burnTime: "1.5 - 2 Hours Each",
    tiers: [
      {
        minQty: 1,
        label: "Base Price",
        description: "Purchase at ₹20 per candle for orders up to 10 candles",
        pricePerUnit: 20,
      },
      {
        minQty: 11,
        label: "10% OFF",
        description: "Purchase at ₹18 per candle for orders above 10 candles",
        pricePerUnit: 18,
      },
      {
        minQty: 31,
        label: "20% OFF",
        description: "Purchase at ₹16 per candle for orders above 30 candles",
        pricePerUnit: 16,
      },
      {
        minQty: 51,
        label: "30% OFF",
        description: "Purchase at ₹14 per candle for orders above 50 candles",
        pricePerUnit: 14,
      },
    ],
    maxQty: 100,
    isBestseller: true,
  },
  {
    id: "4918319881eh9a9668cd88f3",
    name: "Tea Light",
    description:
      "A soothing collection that blends minimalist style with the gentle essence of blooming daisies",
    basePrice: 3,
    image: "/images/tea_light.png",
    fragrances: [
      {
        id: "4917319881eh9a9668cd88f3",
        name: "Without Fragrance",
        priceModifier: 0,
      },
    ],
    burnTime: "1.5 - 2 Hours Each",
    tiers: [
      {
        minQty: 1,
        label: "Base Price",
        description: "Purchase at ₹3 per candle for orders up to 10 candles",
        pricePerUnit: 3,
      },
      {
        minQty: 51,
        label: "15% OFF",
        description: "Purchase at ₹2.5 per candle for orders above 50 candles",
        pricePerUnit: 2.5,
      },
      {
        minQty: 101,
        label: "25% OFF",
        description: "Purchase at ₹2.25 per candle for orders above 100 candles",
        pricePerUnit: 2.25,
      },
    ],
    isBestseller: true,
  },
  {
    id: "4918319881ec9a9667cd88f3",
    name: "Small Bubble",
    description:
      "A charming candle collection inspired by the freshness and purity of blooming daisies",
    basePrice: 50,
    image: "/images/Single_small_bubble.png",
    fragrances: [
      {
        id: "4918319881ek9a9668cd88f4",
        name: "Without Fragrance",
        priceModifier: 0,
      },
      {
        id: "4918319881ec9a9664cd88f7",
        name: "Lavender + Vanilla",
        priceModifier: 50,
      },
    ],
    burnTime: "3 - 4 Hours Each",
    tiers: [
      {
        minQty: 1,
        label: "Base Price",
        description: "Purchase at ₹50 per candle for orders up to 10 candles",
        pricePerUnit: 50,
      },
      {
        minQty: 11,
        label: "4% OFF",
        description: "Purchase at ₹82 per candle for orders above 10 candles",
        pricePerUnit: 48,
      },
      {
        minQty: 31,
        label: "10% OFF",
        description: "Purchase at ₹70 per candle for orders above 30 candles",
        pricePerUnit: 45,
      },
      {
        minQty: 51,
        label: "20% OFF",
        description: "Purchase at ₹65 per candle for orders above 50 candles",
        pricePerUnit: 40,
      },
    ],
    isBestseller: true,
  },
];

export function getUnitPrice(
  product: Product,
  fragranceId: string,
  qty: number
): number {
  const fragrance = product.fragrances.find((f) => f.id === fragranceId);
  const baseWithModifier = product.basePrice + (fragrance?.priceModifier || 0);

  const tier = product.tiers.reduce((best, t) => {
    return t.minQty <= qty ? t : best;
  }, product.tiers[0]);

  return tier.pricePerUnit + (fragrance?.priceModifier || 0);
}
