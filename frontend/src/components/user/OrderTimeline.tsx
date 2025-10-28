import { OrderTimeline } from "@/types/order";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

interface OrderTimelineProps {
  timeline: OrderTimeline[];
}

export function OrderTimelineComponent({ timeline }: OrderTimelineProps) {
  const iconMap = {
    package: Package,
    truck: Truck,
    check: CheckCircle,
    clock: Clock,
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Status do pedido</h3>

      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Items da timeline */}
        <div className="space-y-8">
          {timeline.map((item, index) => {
            const Icon = iconMap[item.icon || "clock"];
            const isLast = index === timeline.length - 1;

            return (
              <div key={item.id} className="relative flex gap-6">
                {/* Ícone */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className={`flex-1 ${!isLast ? "pb-8" : ""}`}>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
