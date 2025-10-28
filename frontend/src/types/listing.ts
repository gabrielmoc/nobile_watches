/**
 * Tipos relacionados aos anúncios do vendedor
 */

export interface WatchListing {
  id: number;
  brand: string;
  model: string;
  referenceNumber?: string;
  price: number;
  condition: string;
  description?: string;
  images: string[];
  sellerId: number;
  status: "ativo" | "vendido" | "pausado" | "removido";
  views?: number;
  favorites?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ListingStats {
  views: number;
  favorites: number;
  messages: number;
}

export interface WatchListingWithStats extends WatchListing {
  stats?: ListingStats;
}
