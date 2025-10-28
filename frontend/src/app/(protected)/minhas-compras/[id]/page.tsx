"use client";

import { OrderTimelineComponent } from "@/components/user/OrderTimeline";
import { UserNav } from "@/components/user/UserNav";
import { useOrderDetails } from "@/hooks/useUserOrders";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const { order, isLoading, error, contactSeller } = useOrderDetails(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar detalhes do pedido</p>
          <Link
            href="/minhas-compras"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg inline-block"
          >
            Voltar para compras
          </Link>
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
            <Link
              href="/minhas-compras"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Minhas compras
            </Link>
            <nav className="text-sm text-gray-600 mb-2">
              Home &gt; Minhas compras &gt; Detalhes do pedido
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">Detalhes do pedido</h1>
          </div>
          <UserNav />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna esquerda: Informações do pedido */}
          <div className="space-y-6">
            {/* Card do produto */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex gap-6">
                {/* Imagem */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={order.watch.images[0] || "/placeholder-watch.jpg"}
                    alt={`${order.watch.brand} ${order.watch.model}`}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Informações */}
                <div className="flex-1 space-y-2">
                  {/* Vendedor */}
                  {order.seller && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {order.seller.name}
                      </span>
                      {order.seller.isVerified && (
                        <span className="text-xs text-blue-600">✓ Verificado</span>
                      )}
                    </div>
                  )}

                  {/* Nome do produto */}
                  <h3 className="font-semibold text-lg">
                    {order.watch.brand} {order.watch.model}
                  </h3>

                  {/* Condição */}
                  <p className="text-sm text-gray-600">{order.watch.condition}</p>

                  {/* Preço */}
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">Total:</p>
                    <p className="text-2xl font-bold">
                      R$ {order.watch.price.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão de contato com vendedor */}
            <button
              onClick={contactSeller}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com vendedor
            </button>
          </div>

          {/* Coluna direita: Timeline do pedido */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {order.timeline && order.timeline.length > 0 ? (
              <OrderTimelineComponent timeline={order.timeline} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Timeline do pedido não disponível</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
