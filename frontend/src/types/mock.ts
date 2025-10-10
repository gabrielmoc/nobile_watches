// src/types/product.ts

export interface Product {
  id: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  reference: string;
  verified: boolean;

  // Dados básicos
  year?: number;
  gender?: "Masculino" | "Feminino" | "Unissex";
  serialNumber?: string;
  condition?: "Novo" | "Muito bom" | "Bom" | "Usado";
  hasBox: boolean;
  hasDocuments: boolean;

  // Movimento
  movement?: "Automático" | "Quartzo" | "Manual";
  caliber?: string;
  powerReserve?: number;
  jewels?: number;

  // Caixa
  caseMaterial?: string;
  diameter?: number;
  waterResistance?: string;
  bezelMaterial?: string;
  crystal?: string;
  dialColor?: string;
  dialNumbers?: string;

  // Pulseira/Bracelete
  strapMaterial?: string;
  strapColor?: string;
  clasp?: string;
  claspMaterial?: string;

  // Localização e disponibilidade
  location?: string;
  availability?: "Disponível" | "Reservado" | "Vendido";

  // Vendedor
  seller?: {
    name: string;
    verified: boolean;
    logo?: string;
  };
}

export interface FilterOptions {
  brands: string[];
  models: string[];
  caseMaterials: string[];
  strapMaterials: string[];
  dialColors: string[];
  movements: string[];
  conditions: string[];
  priceRange: {
    min: number;
    max: number;
  };
}
