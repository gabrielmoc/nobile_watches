"use client";

import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductsHeaderProps {
  searchQuery: string;
  activeFiltersCount: number;
}

export function ProductsHeader({ searchQuery, activeFiltersCount }: ProductsHeaderProps) {
  const [query, setQuery] = useState(searchQuery);
  const router = useRouter();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    params.delete("pagina"); // Reset página na busca
    router.push(`/produtos?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/produtos");
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Produtos</span>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar por marca, modelo, referência..."
                className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-md flex items-center justify-center transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="w-4 h-4" />
              <span>Limpar Filtros ({activeFiltersCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
