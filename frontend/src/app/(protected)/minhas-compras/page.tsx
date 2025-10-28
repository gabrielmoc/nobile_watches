"use client";

import { OrderCard } from "@/components/user/OrderCard";
import { UserNav } from "@/components/user/UserNav";
import { useUserOrders } from "@/hooks/useUserOrders";
import { useState } from "react";

type OrderFilter = "em_andamento" | "finalizados";

export default function MyPurchasesPage() {
  const { orders, isLoading, error } = useUserOrders();
  const [filter, setFilter] = useState<OrderFilter>("em_andamento");

  const filteredOrders = orders.filter(order => {
    if (filter === "finalizados") {
      return order.status === "entregue" || order.status === "cancelado";
    }
    return order.status !== "entregue" && order.status !== "cancelado";
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar compras</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <nav className="text-sm text-gray-600 mb-2">Home &gt; Minhas compras</nav>
            <h1 className="text-3xl font-bold text-gray-900">Minhas compras</h1>
          </div>
          <UserNav />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter("em_andamento")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === "em_andamento"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            A caminho
          </button>
          <button
            onClick={() => setFilter("finalizados")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === "finalizados"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Finalizados
          </button>
        </div>

        {/* Lista de pedidos */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">
              {filter === "finalizados"
                ? "Você ainda não tem pedidos finalizados"
                : "Você ainda não tem pedidos em andamento"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
