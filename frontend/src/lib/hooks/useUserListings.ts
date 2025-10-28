import { WatchListingWithStats } from "@/types/listing";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Hook para buscar e gerenciar anúncios do vendedor
 */
export function useUserListings() {
  const [listings, setListings] = useState<WatchListingWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Buscar o usuário atual
      const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });

      if (!userResponse.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      const { user } = await userResponse.json();

      // Buscar relógios do vendedor
      const response = await fetch(`${API_BASE_URL}/watches`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar anúncios");
      }

      const allWatches = await response.json();

      // Filtrar apenas os relógios do usuário atual
      const userWatches = allWatches.filter((watch: any) => watch.sellerId === user.id);

      // Adicionar estatísticas mock (substituir por dados reais da API)
      const listingsWithStats: WatchListingWithStats[] = userWatches.map(
        (watch: any) => ({
          ...watch,
          status: watch.status || "ativo",
          stats: {
            views: Math.floor(Math.random() * 1000),
            favorites: Math.floor(Math.random() * 50),
            messages: Math.floor(Math.random() * 10),
          },
        })
      );

      setListings(listingsWithStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteListing = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/watches/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir anúncio");
      }

      // Atualizar lista localmente
      setListings(prev => prev.filter(listing => listing.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const pauseListing = async (id: number) => {
    try {
      // TODO: Implementar pausa de anúncio na API
      setListings(prev =>
        prev.map(listing =>
          listing.id === id ? { ...listing, status: "pausado" as const } : listing
        )
      );
    } catch (err) {
      throw err;
    }
  };

  const activateListing = async (id: number) => {
    try {
      // TODO: Implementar ativação de anúncio na API
      setListings(prev =>
        prev.map(listing =>
          listing.id === id ? { ...listing, status: "ativo" as const } : listing
        )
      );
    } catch (err) {
      throw err;
    }
  };

  return {
    listings,
    isLoading,
    error,
    refetch: fetchListings,
    deleteListing,
    pauseListing,
    activateListing,
  };
}
