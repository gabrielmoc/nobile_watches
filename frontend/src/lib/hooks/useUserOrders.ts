import { Order, OrderListItem } from "@/types/order";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Hook para buscar e gerenciar pedidos do usuário
 */
export function useUserOrders() {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/orders`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos");
      }

      const data = await response.json();

      // Transformar dados da API para o formato esperado
      const formattedOrders: OrderListItem[] = data.map((order: any) => ({
        id: order.id,
        seller: {
          name: order.watch?.seller?.name || "Vendedor",
          isVerified: order.watch?.seller?.isVerified || false,
        },
        watch: {
          id: order.watch?.id || 0,
          brand: order.watch?.brand || "",
          model: order.watch?.model || "",
          image: order.watch?.images?.[0] || "/placeholder-watch.jpg",
          condition: order.watch?.condition || "",
        },
        total: order.watch?.price || 0,
        status: order.status,
        createdAt: order.createdAt,
      }));

      setOrders(formattedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
  };
}

/**
 * Hook para buscar detalhes de um pedido específico
 */
export function useOrderDetails(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do pedido");
      }

      const data = await response.json();

      // Gerar timeline do pedido
      const timeline = generateOrderTimeline(data);

      setOrder({
        ...data,
        timeline,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const contactSeller = () => {
    // TODO: Implementar chat/mensagem com vendedor
    console.log("Contatar vendedor");
  };

  const cancelOrder = async () => {
    // TODO: Implementar cancelamento de pedido
    console.log("Cancelar pedido");
  };

  return {
    order,
    isLoading,
    error,
    refetch: fetchOrderDetails,
    contactSeller,
    cancelOrder,
  };
}

/**
 * Gera timeline do pedido baseado no status
 */
function generateOrderTimeline(order: any) {
  const baseTimeline = [
    {
      id: "1",
      title: "Pedido realizado",
      description: "Seu pedido foi confirmado",
      date: order.createdAt,
      status: "pendente" as const,
      icon: "clock" as const,
    },
    {
      id: "2",
      title: "Pagamento confirmado",
      description: "Pagamento processado com sucesso",
      date: order.updatedAt || order.createdAt,
      status: "pago" as const,
      icon: "check" as const,
    },
    {
      id: "3",
      title: "Em preparação",
      description: "Vendedor está preparando o envio",
      date: order.updatedAt || order.createdAt,
      status: "em_preparacao" as const,
      icon: "package" as const,
    },
    {
      id: "4",
      title: "Enviado",
      description: "Pedido despachado para entrega",
      date: order.updatedAt || order.createdAt,
      status: "enviado" as const,
      icon: "truck" as const,
    },
  ];

  return baseTimeline;
}
