/**
 * Tipos relacionados a pedidos e compras
 */

export interface Watch {
  id: number;
  brand: string;
  model: string;
  referenceNumber?: string;
  price: number;
  images: string[];
  condition: string;
}

export interface Seller {
  id: number;
  name: string;
  email: string;
  isVerified?: boolean;
}

export type OrderStatus =
  | "pendente"
  | "pago"
  | "em_preparacao"
  | "enviado"
  | "em_transito"
  | "entregue"
  | "cancelado";

export interface OrderTimeline {
  id: string;
  title: string;
  description: string;
  date: string;
  status: OrderStatus;
  icon?: "package" | "truck" | "check" | "clock";
}

export interface Order {
  id: number;
  buyerId: number;
  watchId: number;
  status: OrderStatus;
  paymentInfo?: string;
  shippingInfo?: string;
  createdAt: string;
  updatedAt?: string;
  watch: Watch;
  seller?: Seller;
  timeline?: OrderTimeline[];
}

export interface OrderListItem {
  id: number;
  seller: {
    name: string;
    isVerified?: boolean;
  };
  watch: {
    id: number;
    brand: string;
    model: string;
    image: string;
    condition: string;
  };
  total: number;
  status: OrderStatus;
  createdAt: string;
}
