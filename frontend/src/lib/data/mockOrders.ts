import { Order, OrderTimeline } from "@/types/order";

/**
 * Dados mockados para detalhes de pedidos
 */
export const mockOrdersDetails: Record<string, Order> = {
  "1": {
    id: 1,
    buyerId: 1,
    watchId: 101,
    status: "em_transito",
    paymentInfo: "Cartão de crédito ****1234",
    shippingInfo: "Rua Exemplo, 123 - São Paulo, SP - CEP 01234-567",
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-03-12T10:15:00Z",
    watch: {
      id: 1,
      brand: "Patek Philippe",
      model: "Aquanaut",
      referenceNumber: "5167A-001",
      price: 80300,
      images: ["/images/mock/order1.svg"],
      condition: "Com caixa e documentos",
    },
    seller: {
      id: 201,
      name: "Cordial Watches",
      email: "contato@cordialwatches.com",
      isVerified: true,
    },
    timeline: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado com sucesso",
        date: "2024-03-10T14:30:00Z",
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento processado e aprovado",
        date: "2024-03-10T14:40:00Z",
        status: "pago",
        icon: "check",
      },
      {
        id: "3",
        title: "Em preparação",
        description: "Vendedor está preparando o envio do produto",
        date: "2024-03-11T09:20:00Z",
        status: "em_preparacao",
        icon: "package",
      },
      {
        id: "4",
        title: "Pedido enviado",
        description: "Produto despachado para entrega",
        date: "2024-03-12T10:15:00Z",
        status: "enviado",
        icon: "truck",
      },
    ],
  },
  "2": {
    id: 2,
    buyerId: 1,
    watchId: 2,
    status: "entregue",
    paymentInfo: "Pix",
    shippingInfo: "Av. Paulista, 1000 - São Paulo, SP - CEP 01310-100",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-08T16:30:00Z",
    watch: {
      id: 2,
      brand: "Omega",
      model: "De Ville Prestige",
      referenceNumber: "126610LN",
      price: 125000,
      images: ["/images/mock/order2.svg"],
      condition: "Novo com etiquetas",
    },
    seller: {
      id: 202,
      name: "Cordial Watches",
      email: "contato@luxurytimepieces.com",
      isVerified: true,
    },
    timeline: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado com sucesso",
        date: "2024-03-01T10:00:00Z",
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento via Pix confirmado",
        date: "2024-03-01T10:05:00Z",
        status: "pago",
        icon: "check",
      },
      {
        id: "3",
        title: "Em preparação",
        description: "Vendedor está preparando o envio",
        date: "2024-03-02T09:00:00Z",
        status: "em_preparacao",
        icon: "package",
      },
      {
        id: "4",
        title: "Pedido enviado",
        description: "Produto em rota de entrega",
        date: "2024-03-03T14:20:00Z",
        status: "enviado",
        icon: "truck",
      },
      {
        id: "5",
        title: "Pedido entregue",
        description: "Produto entregue com sucesso",
        date: "2024-03-08T16:30:00Z",
        status: "entregue",
        icon: "check",
      },
    ],
  },
  "3": {
    id: 3,
    buyerId: 1,
    watchId: 103,
    status: "pago",
    paymentInfo: "Boleto bancário",
    shippingInfo: "Rua das Flores, 456 - Rio de Janeiro, RJ - CEP 20000-000",
    createdAt: "2024-03-15T11:20:00Z",
    updatedAt: "2024-03-15T12:00:00Z",
    watch: {
      id: 103,
      brand: "Audemars Piguet",
      model: "Royal Oak Offshore",
      referenceNumber: "311.30.42.30.01.005",
      price: 45000,
      images: ["/images/mock/order3.svg"],
      condition: "Seminovo - excelente estado",
    },
    seller: {
      id: 203,
      name: "Premium Watches BR",
      email: "contato@premiumwatches.com.br",
      isVerified: true,
    },
    timeline: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Aguardando confirmação de pagamento",
        date: "2024-03-15T11:20:00Z",
        status: "pendente",
        icon: "clock",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Boleto compensado com sucesso",
        date: "2024-03-15T12:00:00Z",
        status: "pago",
        icon: "check",
      },
    ],
  },
};

/**
 * Função para buscar detalhes de um pedido por ID
 */
export function getMockOrderDetails(orderId: string): Order | null {
  return mockOrdersDetails[orderId] || null;
}

/**
 * Função para gerar timeline mockada baseada no status
 */
export function generateMockTimeline(status: string): OrderTimeline[] {
  const baseDate = new Date();
  const timelines: Record<string, OrderTimeline[]> = {
    pendente: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Aguardando confirmação de pagamento",
        date: new Date(baseDate.getTime() - 1000 * 60 * 30).toISOString(),
        status: "pendente",
        icon: "clock",
      },
    ],
    pago: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 2).toISOString(),
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento processado com sucesso",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60).toISOString(),
        status: "pago",
        icon: "check",
      },
    ],
    em_preparacao: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento processado com sucesso",
        date: new Date(
          baseDate.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10
        ).toISOString(),
        status: "pago",
        icon: "check",
      },
      {
        id: "3",
        title: "Em preparação",
        description: "Vendedor está preparando o envio",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
        status: "em_preparacao",
        icon: "package",
      },
    ],
    enviado: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento processado com sucesso",
        date: new Date(
          baseDate.getTime() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 15
        ).toISOString(),
        status: "pago",
        icon: "check",
      },
      {
        id: "3",
        title: "Em preparação",
        description: "Vendedor está preparando o envio",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        status: "em_preparacao",
        icon: "package",
      },
      {
        id: "4",
        title: "Pedido enviado",
        description: "Produto despachado para entrega",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
        status: "enviado",
        icon: "truck",
      },
    ],
    em_transito: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento processado com sucesso",
        date: new Date(
          baseDate.getTime() - 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 20
        ).toISOString(),
        status: "pago",
        icon: "check",
      },
      {
        id: "3",
        title: "Em preparação",
        description: "Vendedor está preparando o envio",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        status: "em_preparacao",
        icon: "package",
      },
      {
        id: "4",
        title: "Pedido enviado",
        description: "Produto em rota de entrega",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        status: "enviado",
        icon: "truck",
      },
    ],
    entregue: [
      {
        id: "1",
        title: "Pedido realizado",
        description: "Seu pedido foi confirmado",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        status: "pendente",
        icon: "package",
      },
      {
        id: "2",
        title: "Pagamento aprovado",
        description: "Pagamento processado com sucesso",
        date: new Date(
          baseDate.getTime() - 1000 * 60 * 60 * 24 * 10 + 1000 * 60 * 5
        ).toISOString(),
        status: "pago",
        icon: "check",
      },
      {
        id: "3",
        title: "Em preparação",
        description: "Vendedor está preparando o envio",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        status: "em_preparacao",
        icon: "package",
      },
      {
        id: "4",
        title: "Pedido enviado",
        description: "Produto em rota de entrega",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 8).toISOString(),
        status: "enviado",
        icon: "truck",
      },
      {
        id: "5",
        title: "Pedido entregue",
        description: "Produto entregue com sucesso",
        date: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        status: "entregue",
        icon: "check",
      },
    ],
  };
  //@ts-ignore
  return timelines[status] || timelines.pendente;
}
