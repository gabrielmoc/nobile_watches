"use client";

import { ListingCard } from "@/components/user/ListingCard";
import { UserNav } from "@/components/user/UserNav";
import { useUserListings } from "@/hooks/useUserListings";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MyListingsPage() {
  const { listings, isLoading, error, deleteListing, pauseListing, activateListing } =
    useUserListings();

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
          <p className="text-red-600 mb-4">Erro ao carregar anúncios</p>
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
            <nav className="text-sm text-gray-600 mb-2">Home &gt; Meus anúncios</nav>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Meus anúncios</h1>

              {/* Botão criar anúncio */}
              <Link
                href="/vender-relogio"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Criar anúncio
              </Link>
            </div>
          </div>
          <UserNav />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas resumidas */}
        {listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Total de anúncios</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{listings.length}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {listings.filter(l => l.status === "ativo").length}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Vendidos</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {listings.filter(l => l.status === "vendido").length}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Pausados</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {listings.filter(l => l.status === "pausado").length}
              </p>
            </div>
          </div>
        )}

        {/* Lista de anúncios */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Você ainda não tem anúncios
              </h3>
              <p className="text-gray-600 mb-6">
                Comece a vender seus relógios de luxo criando seu primeiro anúncio.
              </p>
              <Link
                href="/vender-relogio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Criar primeiro anúncio
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onDelete={deleteListing}
                onPause={pauseListing}
                onActivate={activateListing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
