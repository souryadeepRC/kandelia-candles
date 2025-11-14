export interface Fragrance {
  id: string;
  name: string;
  priceModifier: number;
}

export interface PricingTier {
  minQty: number;
  label: string;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
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
  pricePerUnit: number;
  qty: number;
}
