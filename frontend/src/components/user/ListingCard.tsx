import { WatchListingWithStats } from "@/types/listing";
import Image from "next/image";
import Link from "next/link";

interface ListingCardProps {
  listing: WatchListingWithStats;
  onDelete?: (id: number) => void;
  onPause?: (id: number) => void;
  onActivate?: (id: number) => void;
}

export function ListingCard({
  listing,
  onDelete,
  onPause,
  onActivate,
}: ListingCardProps) {
  const statusLabels = {
    ativo: "Ativo",
    vendido: "Vendido",
    pausado: "Pausado",
    removido: "Removido",
  };

  const statusColors = {
    ativo: "text-green-600 bg-green-50",
    vendido: "text-blue-600 bg-blue-50",
    pausado: "text-yellow-600 bg-yellow-50",
    removido: "text-red-600 bg-red-50",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagem do relógio */}
        <div className="relative w-full md:w-32 h-32 flex-shrink-0">
          <Image
            src={listing.images[0] || "/placeholder-watch.jpg"}
            alt={`${listing.brand} ${listing.model}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Informações do anúncio */}
        <div className="flex-1 space-y-3">
          {/* Marca e Modelo */}
          <div>
            <h3 className="font-semibold text-lg">
              {listing.brand} {listing.model}
            </h3>
            <p className="text-sm text-gray-600">{listing.condition}</p>
            {listing.referenceNumber && (
              <p className="text-xs text-gray-500 mt-1">Ref: {listing.referenceNumber}</p>
            )}
          </div>

          {/* Preço */}
          <div>
            <p className="text-2xl font-bold">
              R$ {listing.price.toLocaleString("pt-BR")}
            </p>
          </div>

          {/* Status e Estatísticas */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[listing.status]
              }`}
            >
              {statusLabels[listing.status]}
            </span>

            {listing.stats && (
              <div className="flex gap-4 text-sm text-gray-600">
                <span title="Visualizações">👁 {listing.stats.views}</span>
                <span title="Favoritos">❤️ {listing.stats.favorites}</span>
                <span title="Mensagens">💬 {listing.stats.messages}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex md:flex-col justify-center items-center gap-2">
          <Link
            href={`/produto/${listing.id}`}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap w-full md:w-auto text-center"
          >
            Visualizar anúncio
          </Link>

          {listing.status === "ativo" && onPause && (
            <button
              onClick={() => onPause(listing.id)}
              className="px-6 py-2 border border-yellow-300 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-50 transition-colors whitespace-nowrap w-full md:w-auto"
            >
              Pausar
            </button>
          )}

          {listing.status === "pausado" && onActivate && (
            <button
              onClick={() => onActivate(listing.id)}
              className="px-6 py-2 border border-green-300 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors whitespace-nowrap w-full md:w-auto"
            >
              Ativar
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir este anúncio?")) {
                  onDelete(listing.id);
                }
              }}
              className="px-6 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors whitespace-nowrap w-full md:w-auto"
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
