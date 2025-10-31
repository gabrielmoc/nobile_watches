"use client";

import { CollectionItem, CollectionStats } from "@/types/collection";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Dados mockados para desenvolvimento
 * Usado quando o mock login está ativo
 */
const MOCK_COLLECTION_DATA: CollectionItem[] = [
  {
    id: 1,
    userId: 1,
    watchId: 1,
    estimatedValue: 63752.89,
    addedAt: "2024-10-15T10:30:00.000Z",
    watch: {
      id: 1,
      brand: "Rolex",
      model: "Datejust 36",
      referenceNumber: "126234",
      movement: "Automático",
      year: 2023,
      condition: "Novo",
      price: 63752.89,
      description:
        "With its limited production run, the Patek Philippe Perpetual Calendar Chronograph Ref. 5970P in platinum stands as an exceptional find for serious collectors. It is estimated that fewer than 400 pieces of this model were produced in platinum between 2009 and 2010. This watch features a substantial yet balanced case measuring 40mm in diameter, with sapphire crystals on both front and back. It is worn on a classic black leather strap and features an elegantly complex yet legible dial in black. Displayed on the dial are the day and month at 12 o'clock, 30-minute chronograph counter with leap year at 3, moon phase and date at 6, and a continuous seconds counter with 24-hour display at 9. This coveted timepiece is powered by the hand-wound CH 27-70 Q movement with a power reserve of approximately 60 hours. This pre-owned Patek Philippe Perpetual Calendar Chronograph Platinum Watch 5970P-001 is presented in the manufacturer's wooden box, inclusive of papers and a bifold leather wallet.",
      images: [
        "/images/mock/rolex-datejust-36.jpg",
        "/images/mock/rolex-datejust-36-2.jpg",
      ],
      caseMaterial: "Ouro Branco",
      caseDiameter: 31,
      waterResistance: "100m",
      glassType: "Oystersteel",
      dialColor: "Verde",
      braceletMaterial: "Ouro Branco",
      braceletColor: "Prata",
      claspType: "Fecho dobrado",
      gender: "Masculino",
    },
    priceChange: {
      percentage: 21,
      trend: "up",
    },
  },
  {
    id: 2,
    userId: 1,
    watchId: 2,
    estimatedValue: 87392.3,
    addedAt: "2024-09-20T14:20:00.000Z",
    watch: {
      id: 2,
      brand: "Patek Philippe",
      model: "Patek Philippe Nautilus",
      referenceNumber: "5968R-001",
      movement: "Automático",
      year: 2022,
      condition: "Seminovo",
      price: 87392.3,
      description:
        "With its limited production run, the Patek Philippe Perpetual Calendar Chronograph Ref. 5970P in platinum stands as an exceptional find for serious collectors. It is estimated that fewer than 400 pieces of this model were produced in platinum between 2009 and 2010. This watch features a substantial yet balanced case measuring 40mm in diameter, with sapphire crystals on both front and back. It is worn on a classic black leather strap and features an elegantly complex yet legible dial in black. Displayed on the dial are the day and month at 12 o'clock, 30-minute chronograph counter with leap year at 3, moon phase and date at 6, and a continuous seconds counter with 24-hour display at 9. This coveted timepiece is powered by the hand-wound CH 27-70 Q movement with a power reserve of approximately 60 hours. This pre-owned Patek Philippe Perpetual Calendar Chronograph Platinum Watch 5970P-001 is presented in the manufacturer's wooden box, inclusive of papers and a bifold leather wallet.",
      images: ["/images/mock/patek-nautilus.png", "/images/mock/nautilus2.jpg"],
      caseMaterial: "Ouro rosa",
      caseDiameter: 22,
      waterResistance: "120m",
      glassType: "Vidro safira",
      dialColor: "Marrom",
      braceletMaterial: "Borracha",
      braceletColor: "Marrom",
      claspType: "Fecho pin",
      gender: "Masculino",
    },
    priceChange: {
      percentage: 24,
      trend: "up",
    },
  },
  {
    id: 3,
    userId: 1,
    watchId: 3,
    estimatedValue: 45250.0,
    addedAt: "2024-08-10T09:15:00.000Z",
    watch: {
      id: 3,
      brand: "Omega",
      model: "De Ville Prestige",
      referenceNumber: "310.30.42.50.01.001",
      movement: "Manual",
      year: 2021,
      condition: "Novo",
      price: 45250.0,
      description:
        "The legendary Omega Speedmaster Professional Moonwatch, the first watch worn on the moon. Features a black dial with three chronograph subdials, tachymeter bezel, and manual-winding movement. Complete with box and papers.",
      images: ["/images/mock/omega1.jpg", "/images/mock/omega3.jpg"],
      caseMaterial: "Aço inoxidável",
      caseDiameter: 42,
      waterResistance: "50m",
      glassType: "Hesalita",
      dialColor: "Preto",
      braceletMaterial: "Aço inoxidável",
      braceletColor: "Prata",
      claspType: "Fecho dobrado",
      gender: "Masculino",
    },
    priceChange: {
      percentage: 8,
      trend: "up",
    },
  },
];

/**
 * Hook para buscar e gerenciar a coleção de relógios do usuário
 * Suporta modo mock para desenvolvimento quando API não está disponível
 */
export function useUserCollection() {
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    fetchCollection();
  }, []);

  /**
   * Verifica se o mock login está ativo
   */
  const isMockActive = (): boolean => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("mock_auth_token") === "mock_token_active";
  };

  const fetchCollection = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Se mock está ativo, retornar dados mockados
      if (isMockActive()) {
        console.log("📊 Usando dados mockados da coleção");
        // Simula delay de rede para realismo
        await new Promise(resolve => setTimeout(resolve, 500));
        setCollection(MOCK_COLLECTION_DATA);
        setIsLoading(false);
        return;
      }

      // Caso contrário, buscar dados reais da API
      const response = await fetch(`${API_BASE_URL}/collections`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar coleção");
      }

      const data = await response.json();

      // Mapear dados da API para o formato do CollectionItem
      const collectionItems: CollectionItem[] = data.map((item: any) => ({
        id: item.id,
        userId: item.userId,
        watchId: item.watchId,
        estimatedValue: item.estimatedValue || item.watch?.price,
        addedAt: item.createdAt || new Date().toISOString(),
        watch: {
          id: item.watch.id,
          brand: item.watch.brand,
          model: item.watch.model,
          referenceNumber: item.watch.referenceNumber,
          movement: item.watch.movement,
          year: item.watch.year,
          condition: item.watch.condition,
          price: item.watch.price,
          description: item.watch.description,
          images: item.watch.images || [],
          caseMaterial: item.watch.caseMaterial,
          caseDiameter: item.watch.caseDiameter,
          waterResistance: item.watch.waterResistance,
          glassType: item.watch.glassType,
          dialColor: item.watch.dialColor,
          braceletMaterial: item.watch.braceletMaterial,
          braceletColor: item.watch.braceletColor,
          claspType: item.watch.claspType,
          gender: item.watch.gender,
        },
        // Calcular mudança de preço (pode ser obtido de histórico de preços)
        priceChange: calculatePriceChange(item),
      }));

      setCollection(collectionItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao buscar coleção:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Calcula a mudança de preço de um item
   * TODO: Integrar com endpoint de histórico de preços
   */
  const calculatePriceChange = (item: any) => {
    // Por enquanto, retorna valores mockados
    // No futuro, deve buscar do histórico de preços
    return {
      percentage: Math.floor(Math.random() * 30) + 5,
      trend: "up" as const,
    };
  };

  /**
   * Adiciona um relógio à coleção
   */
  const addToCollection = async (watchId: number, estimatedValue?: number) => {
    try {
      if (isMockActive()) {
        console.log("📊 Mock: Adicionando relógio à coleção");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/collections`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ watchId, estimatedValue }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar à coleção");
      }

      await fetchCollection(); // Recarrega a coleção
    } catch (err) {
      throw err;
    }
  };

  /**
   * Remove um relógio da coleção
   */
  const removeFromCollection = async (watchId: number) => {
    try {
      if (isMockActive()) {
        console.log("📊 Mock: Removendo relógio da coleção");
        setCollection(prev => prev.filter(item => item.watchId !== watchId));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/collections/${watchId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao remover da coleção");
      }

      setCollection(prev => prev.filter(item => item.watchId !== watchId));
    } catch (err) {
      throw err;
    }
  };

  /**
   * Atualiza o valor estimado de um item
   */
  const updateEstimatedValue = async (collectionId: number, estimatedValue: number) => {
    try {
      if (isMockActive()) {
        console.log("📊 Mock: Atualizando valor estimado");
        setCollection(prev =>
          prev.map(item =>
            item.id === collectionId ? { ...item, estimatedValue } : item
          )
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/collections/${collectionId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ estimatedValue }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar valor estimado");
      }

      setCollection(prev =>
        prev.map(item => (item.id === collectionId ? { ...item, estimatedValue } : item))
      );
    } catch (err) {
      throw err;
    }
  };

  /**
   * Calcula estatísticas da coleção
   */
  const getStats = (): CollectionStats => {
    const totalItems = collection.length;
    const totalValue = collection.reduce(
      (sum, item) => sum + (item.estimatedValue || item.watch.price),
      0
    );
    const totalInvestment = collection.reduce((sum, item) => sum + item.watch.price, 0);
    const profitLoss = totalValue - totalInvestment;
    const profitLossPercentage =
      totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;

    // Encontrar marca mais valiosa
    const brandValues = collection.reduce(
      (acc, item) => {
        const brand = item.watch.brand;
        const value = item.estimatedValue || item.watch.price;
        acc[brand] = (acc[brand] || 0) + value;
        return acc;
      },
      {} as Record<string, number>
    );

    const mostValuableBrand = Object.entries(brandValues).reduce(
      (max, [brand, value]) => (value > max.value ? { brand, value } : max),
      { brand: "", value: 0 }
    ).brand;

    return {
      totalItems,
      totalValue,
      totalInvestment,
      profitLoss,
      profitLossPercentage,
      mostValuableBrand,
    };
  };

  /**
   * Filtra a coleção por marca
   */
  const filteredCollection = selectedBrand
    ? collection.filter(item => item.watch.brand === selectedBrand)
    : collection;

  /**
   * Obtém lista de marcas disponíveis com contagem
   */
  const getBrands = () => {
    const brandCounts = collection.reduce(
      (acc, item) => {
        const brand = item.watch.brand;
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(brandCounts).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      icon: `/icons/brands/${name.toLowerCase().replace(/\s+/g, "-")}.svg`,
      count,
    }));
  };

  return {
    collection: filteredCollection,
    allCollection: collection,
    isLoading,
    error,
    selectedBrand,
    setSelectedBrand,
    addToCollection,
    removeFromCollection,
    updateEstimatedValue,
    getStats,
    getBrands,
    refetch: fetchCollection,
  };
}
