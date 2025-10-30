"use client";

import { Button } from "@/components/ui/Button";
import { OrderTimelineComponent } from "@/components/user/OrderTimeline";
import { UserNav } from "@/components/user/UserNav";
import { getMockOrderDetails } from "@/lib/data/mockOrders";
import { Order } from "@/types/order";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      const orderData = getMockOrderDetails(orderId);
      setOrder(orderData);
      setIsLoading(false);
    }, 300);
  }, [orderId]);

  const handleContactSeller = () => {
    // TODO: Implementar chat com vendedor
    console.log("Contatar vendedor");
  };

  const handleCancelOrder = () => {
    // TODO: Implementar cancelamento de pedido
    if (window.confirm("Tem certeza que deseja cancelar este pedido?")) {
      console.log("Cancelar pedido");
      router.push("/minhas-compras");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Pedido não encontrado</h2>
            <p className="text-gray-600 mb-6">
              Não foi possível encontrar os detalhes deste pedido.
            </p>
            <Button onClick={() => router.push("/minhas-compras")}>
              Ver todos os pedidos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white lg:py-8">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-3 px-5 h-14.5">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-[26px] h-[26px] text-pb-500" strokeWidth={1.5} />
          </button>
          <h1 className="font-erstoria text-[20px] text-pb-500 font-medium">
            Acompanhar pedido
          </h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center gap-2 text-[18px] leading-[100%] font-erstoria mb-2 lg:mb-3">
                <Link
                  href="/"
                  className="text-pb-500 hover:text-[#D5A60A] transition-colors"
                >
                  Home
                </Link>
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.18322 3.20867V3.80067L-0.000781178 7.01667V5.99267C-0.000781178 5.90734 0.0205522 5.83001 0.0632188 5.76067C0.105886 5.69134 0.180552 5.63001 0.287219 5.57667L3.87922 3.76067C3.98589 3.70201 4.09789 3.65401 4.21522 3.61667C4.33789 3.574 4.46589 3.53667 4.59922 3.50467C4.32722 3.44601 4.08722 3.36334 3.87922 3.25667L0.287219 1.43267C0.180552 1.37934 0.105886 1.32067 0.0632188 1.25667C0.0205522 1.18734 -0.000781178 1.10734 -0.000781178 1.01667V0.000671387L6.18322 3.20867Z"
                    fill="#141414"
                  />
                </svg>
                <Link
                  href="/minhas-compras"
                  className="text-pb-500 hover:text-[#D5A60A] transition-colors"
                >
                  Minhas compras
                </Link>
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.18322 3.20867V3.80067L-0.000781178 7.01667V5.99267C-0.000781178 5.90734 0.0205522 5.83001 0.0632188 5.76067C0.105886 5.69134 0.180552 5.63001 0.287219 5.57667L3.87922 3.76067C3.98589 3.70201 4.09789 3.65401 4.21522 3.61667C4.33789 3.574 4.46589 3.53667 4.59922 3.50467C4.32722 3.44601 4.08722 3.36334 3.87922 3.25667L0.287219 1.43267C0.180552 1.37934 0.105886 1.32067 0.0632188 1.25667C0.0205522 1.18734 -0.000781178 1.10734 -0.000781178 1.01667V0.000671387L6.18322 3.20867Z"
                    fill="#141414"
                  />
                </svg>
                <span className="text-[#D5A60A]">Detalhes do pedido</span>
              </nav>
              <h1 className="text-3xl lg:text-[32px] leading-[100%]">
                Detalhes do pedido
              </h1>
            </div>
            <UserNav />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto lg:mt-8 px-5 lg:px-8 lg:pb-[150px]">
        <div className="rounded-[12px] lg:border border-[#EFEFEF] py-4 lg:py-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card do Produto */}
            <div className="lg:bg-[#F7F7F7] rounded-[24px] lg:p-6">
              <div className="flex gap-4 mb-4 lg:mb-6">
                {/* Imagem do produto */}
                <div className="w-[116px] h-[116px] lg:w-[140px] lg:h-[140px] relative bg-[#EFEFEF] rounded-[8px] overflow-hidden flex-shrink-0">
                  <Image
                    src={order.watch.images[0] || "/images/mock/order1.svg"}
                    alt={`${order.watch.brand} ${order.watch.model}`}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Informações do produto */}
                <div className="flex-1 min-w-0 py-1">
                  {/* Vendedor */}
                  <div className="flex items-center gap-2 mb-2">
                    {order.seller?.isVerified && (
                      <div className="w-4 h-4 relative flex-shrink-0">
                        <Image
                          src="/icons/verified-badge.svg"
                          alt="Verificado"
                          width={16}
                          height={16}
                        />
                      </div>
                    )}
                    <span className="font-erstoria text-sm text-[#D5A60A] leading-[140%] tracking-[-1%]">
                      {order.seller?.name}
                    </span>
                  </div>

                  {/* Nome do relógio */}
                  <h2 className="text-[18px] leading-[140%] tracking-[-1%] truncate">
                    {order.watch.brand} {order.watch.model}
                  </h2>
                  <p className="text-sm text-gray-400 mb-2">{order.watch.condition}</p>

                  {/* Total */}
                  <div className="">
                    <div className="flex justify-between items-center">
                      <span className="text-sm lg:text-base text-gray-400">Total:</span>
                      <p className="text-[18px] font-medium">
                        R$ {order.watch.price.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline do pedido */}
            <div className="lg:bg-[#F7F7F7] rounded-[24px] lg:p-6">
              {order.timeline && order.timeline.length > 0 && (
                <OrderTimelineComponent timeline={order.timeline} />
              )}
            </div>
          </div>

          {/* Botões de ação - Mobile */}
          <div className="lg:hidden block p-4 space-y-3 mt-12">
            <button
              onClick={handleContactSeller}
              className="w-full h-[52px] rounded-full border-2 border-[#141414] bg-[#141414] text-white text-base font-bold active:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2"
            >
              Falar com vendedor
            </button>

            {order.status !== "cancelado" && order.status !== "entregue" && (
              <button
                onClick={handleCancelOrder}
                className="w-full h-[52px] rounded-full border-2 border-gray-300 text-gray-600 text-base font-semibold active:bg-gray-50 transition-colors"
              >
                Cancelar compra
              </button>
            )}
          </div>

          {/* Botões de ação - Desktop */}
          <div className="hidden lg:flex mt-8 gap-3 justify-end">
            {order.status !== "cancelado" && order.status !== "entregue" && (
              <button
                onClick={handleCancelOrder}
                className="w-[240px] h-[52px] px-8 rounded-full border-2 border-gray-300 text-gray-600 text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar compra
              </button>
            )}

            <button
              onClick={handleContactSeller}
              className="w-[240px] h-[52px] px-8 rounded-full border-2 border-[#141414] text-pb-500 text-base font-bold hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2"
            >
              Falar com vendedor
            </button>
          </div>

          {/* Spacer para botões fixos mobile */}
          <div className="lg:hidden h-32"></div>
        </div>
      </div>
    </div>
  );
}
