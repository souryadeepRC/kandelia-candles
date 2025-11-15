export interface Fragrance {
  id: string;
  name: string;
  priceModifier: number;
}

export interface PricingTier {
  minQty: number;
  label: string;
  description?: string;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  burnTime?: string;
  fragrances: Fragrance[];
  tiers: PricingTier[];
  image?: string;
  isBestseller?: boolean;
  maxQty?: number;
  isOutOfStock?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  fragranceId: string;
  fragranceName: string;
  pricePerUnit: number;
  qty: number;
}
