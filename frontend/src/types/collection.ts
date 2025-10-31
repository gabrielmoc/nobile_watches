// Tipos relacionados à coleção de relógios do usuário

export interface CollectionItem {
  id: number;
  userId: number;
  watchId: number;
  estimatedValue?: number;
  addedAt: string;
  watch: CollectionWatch;
  priceChange?: {
    percentage: number;
    trend: "up" | "down" | "stable";
  };
}

export interface CollectionWatch {
  id: number;
  brand: string;
  model: string;
  referenceNumber?: string;
  movement?: string;
  year?: number;
  condition: string;
  price: number;
  description?: string;
  images: string[];
  caseMaterial?: string;
  caseDiameter?: number;
  waterResistance?: string;
  glassType?: string;
  dialColor?: string;
  braceletMaterial?: string;
  braceletColor?: string;
  claspType?: string;
  gender?: string;
}

export interface CollectionStats {
  totalItems: number;
  totalValue: number;
  totalInvestment: number;
  profitLoss: number;
  profitLossPercentage: number;
  mostValuableBrand: string;
}

export interface BrandFilter {
  name: string;
  slug: string;
  icon: string;
  count: number;
}
