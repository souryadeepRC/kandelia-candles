import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Lavender Dreams",
    description: "Calming lavender blend for peaceful evenings",
    basePrice: 499,
    image: "/images/Bubble_Candles.png?w=500&h=500&fit=crop",
    fragrances: [
      { id: "lav-1", name: "Pure Lavender", priceModifier: 0 },
      { id: "lav-2", name: "Lavender + Vanilla", priceModifier: 50 },
    ],
    tiers: [
      { minQty: 1, label: "From 1 - 5 Units", pricePerUnit: 449 },
      { minQty: 6, label: "From 6 - 12 Units", pricePerUnit: 399 },
      { minQty: 12, label: "More than 12 Units", pricePerUnit: 349 },
    ],
    isBestseller: true,
  },
  {
    id: "2",
    name: "Rose Elegance",
    description: "Premium rose fragrance for luxury spaces",
    basePrice: 599,
    image: "/images/Dazy_candles.png?w=500&h=500&fit=crop",
    fragrances: [
      { id: "rose-1", name: "Without Fragrance", priceModifier: 0 },
      { id: "rose-2", name: "Rose + Oud", priceModifier: 100 },
    ],
    tiers: [
      { minQty: 1, label: "From 1 - 5 Units", pricePerUnit: 449 },
      { minQty: 6, label: "From 6 - 12 Units", pricePerUnit: 399 },
      { minQty: 12, label: "More than 12 Units", pricePerUnit: 349 },
    ],
    maxQty: 10,
    isBestseller: false,
  },
  {
    id: "3",
    name: "Sandalwood Serenity",
    description: "Traditional Indian sandalwood, aromatic and warm",
    basePrice: 699,
    image: "/images/Single_bubble_candle.png?w=500&h=500&fit=crop",
    fragrances: [
      { id: "sand-1", name: "Without Fragrance", priceModifier: 0 },
      { id: "sand-2", name: "Sandalwood + Jasmine", priceModifier: 75 },
    ],
    tiers: [
      { minQty: 1, label: "From 1 - 5 Units", pricePerUnit: 449 },
      { minQty: 6, label: "From 6 - 12 Units", pricePerUnit: 399 },
      { minQty: 12, label: "More than 12 Units", pricePerUnit: 349 },
    ],
    maxQty: 50,
    isBestseller: true,
  },
  {
    id: "4",
    name: "Citrus Bliss",
    description: "Fresh citrus notes to energize your space",
    basePrice: 449,
    image: "/images/Single_small_bubble.png?w=500&h=500&fit=crop",
    fragrances: [
      { id: "cit-1", name: "Without Fragrance", priceModifier: 0 },
      { id: "cit-2", name: "Orange Blend", priceModifier: 25 },
    ],
    tiers: [
      { minQty: 1, label: "From 1 - 5 Units", pricePerUnit: 449 },
      { minQty: 6, label: "From 6 - 12 Units", pricePerUnit: 399 },
      { minQty: 12, label: "More than 12 Units", pricePerUnit: 349 },
    ],
    isBestseller: true,
    isOutOfStock: true,
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
