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
    <div className="">
      {/* <h3 className="font-lato text-lg font-medium">Status do pedido</h3> */}

      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Items da timeline */}
        <div className="space-y-8">
          {timeline.map((item, index) => {
            const Icon = iconMap[item.icon || "clock"];
            const isLast = index === timeline.length - 1;

            return (
              <div key={item.id} className="h-[52px] relative flex gap-4">
                {/* Ícone */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#F8F2DC] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D5A60A]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className={`flex-1 py-2.5 ${!isLast ? "pb-8" : ""}`}>
                  <div className="">
                    <h4 className="font-lato text-base font-semibold">{item.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-400">{item.description}</p>
                      <p className="text-xs text-gray-400">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
