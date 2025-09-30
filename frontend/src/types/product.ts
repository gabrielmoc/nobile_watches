export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  condition: "novo" | "seminovo" | "usado";
  images: string[];
  specifications: {
    movement: string;
    caseMaterial: string;
    caseSize: string;
    waterResistance: string;
    complications: string[];
  };
  seller: {
    id: string;
    name: string;
    verified: boolean;
    rating: number;
    location: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  condition?: string[];
  movement?: string[];
  caseMaterial?: string[];
  caseSize?: string[];
}
