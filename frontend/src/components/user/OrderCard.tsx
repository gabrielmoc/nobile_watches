import { OrderListItem } from "@/types/order";
import Image from "next/image";
import Link from "next/link";

interface OrderCardProps {
  order: OrderListItem;
  showTrackButton?: boolean;
}

export function OrderCard({ order, showTrackButton = true }: OrderCardProps) {
  const statusLabels = {
    pendente: "Pendente",
    pago: "Pago",
    em_preparacao: "Em preparação",
    enviado: "Enviado",
    em_transito: "Em trânsito",
    entregue: "Entregue",
    cancelado: "Cancelado",
  };

  const statusColors = {
    pendente: "text-yellow-600 bg-yellow-50",
    pago: "text-green-600 bg-green-50",
    em_preparacao: "text-blue-600 bg-blue-50",
    enviado: "text-purple-600 bg-purple-50",
    em_transito: "text-purple-600 bg-purple-50",
    entregue: "text-green-700 bg-green-100",
    cancelado: "text-red-600 bg-red-50",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagem do relógio */}
        <div className="relative w-full md:w-32 h-32 flex-shrink-0">
          <Image
            src={order.watch.image}
            alt={`${order.watch.brand} ${order.watch.model}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Informações do pedido */}
        <div className="flex-1 space-y-3">
          {/* Vendedor */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{order.seller.name}</span>
            {order.seller.isVerified && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verificado
              </span>
            )}
          </div>

          {/* Modelo do relógio */}
          <div>
            <h3 className="font-semibold text-lg">
              {order.watch.brand} {order.watch.model}
            </h3>
            <p className="text-sm text-gray-600">{order.watch.condition}</p>
          </div>

          {/* Preço */}
          <div>
            <p className="text-2xl font-bold">R$ {order.total.toLocaleString("pt-BR")}</p>
          </div>

          {/* Status */}
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[order.status]
              }`}
            >
              {statusLabels[order.status]}
            </span>
          </div>
        </div>

        {/* Ações */}
        {showTrackButton && (
          <div className="flex md:flex-col justify-center items-center gap-2">
            <Link
              href={`/minhas-compras/${order.id}`}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Acompanhar pedido
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
