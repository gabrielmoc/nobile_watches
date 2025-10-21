"use client";

import { FilterModal } from "@/components/products/FilterModal";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterOptions, Product } from "@/types/mock";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BrandPageClientProps {
  brandName: string;
  products: Product[];
  filterOptions: FilterOptions;
}

type ViewMode = "grid" | "list";

export function BrandPageClient({
  brandName,
  products,
  filterOptions,
}: BrandPageClientProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const sortOptions = [
    { value: "relevance", label: "Mais relevantes" },
    { value: "price-asc", label: "Menor preço" },
    { value: "price-desc", label: "Maior preço" },
    { value: "newest", label: "Mais recentes" },
    { value: "oldest", label: "Mais antigos" },
  ];

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsSortDropdownOpen(false);
    // TODO: Implementar lógica de ordenação
  };

  // Fecha o dropdown ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSortDropdownOpen(false);
      }
    };

    if (isSortDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isSortDropdownOpen]);

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb e Header */}
          <div className="space-y-6 mb-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[18px] font-erstoria">
              <Link
                href="/"
                className="text-[#141414] hover:text-[#D5A60A] transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-[#D5A60A] font-medium">{brandName}</span>
            </nav>

            {/* Header com título e controles */}
            <div className="">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h1 className="font-erstoria text-3xl md:text-[32px] text-[#141414]">
                    {brandName}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botão de ordenação - Mobile */}
                  <div className="relative">
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="md:hidden flex items-center justify-center w-11 h-11 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Ordenar produtos"
                      aria-label="Abrir menu de ordenação"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Mobile */}
                    {isSortDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsSortDropdownOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          {sortOptions.map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleSortChange(option.value)}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                                sortBy === option.value
                                  ? "bg-gray-50 text-[#D5A60A] font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Select de ordenação - Desktop */}
                  <div className="hidden md:block">
                    <select
                      value={sortBy}
                      onChange={e => handleSortChange(e.target.value)}
                      className="font-lato text-[14px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D5A60A] focus:border-transparent cursor-pointer"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Botão de alternar visualização - Mobile */}
                  <button
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    className="md:hidden flex items-center justify-center w-11 h-11 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title={
                      viewMode === "grid" ? "Alternar para lista" : "Alternar para grade"
                    }
                    aria-label={
                      viewMode === "grid"
                        ? "Alternar para visualização em lista"
                        : "Alternar para visualização em grade"
                    }
                  >
                    {viewMode === "grid" ? (
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Botão Filtros */}
                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center justify-center w-[44px] h-[44px] bg-[#D5A60A] rounded-lg cursor-pointer"
                    title="Abrir filtros"
                  >
                    <svg
                      width="28"
                      height="14"
                      viewBox="0 0 28 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 7C23 7.26522 22.8946 7.51957 22.7071 7.70711C22.5196 7.89464 22.2652 8 22 8H6C5.73478 8 5.48043 7.89464 5.29289 7.70711C5.10536 7.51957 5 7.26522 5 7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H22C22.2652 6 22.5196 6.10536 22.7071 6.29289C22.8946 6.48043 23 6.73478 23 7ZM27 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H27C27.2652 2 27.5196 1.89464 27.7071 1.70711C27.8946 1.51957 28 1.26522 28 1C28 0.734784 27.8946 0.48043 27.7071 0.292893C27.5196 0.105357 27.2652 0 27 0ZM16 12H12C11.7348 12 11.4804 12.1054 11.2929 12.2929C11.1054 12.4804 11 12.7348 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14H16C16.2652 14 16.5196 13.8946 16.7071 13.7071C16.8946 13.5196 17 13.2652 17 13C17 12.7348 16.8946 12.4804 16.7071 12.2929C16.5196 12.1054 16.2652 12 16 12Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Botões de visualização - Desktop */}
              <div className="hidden md:flex items-center gap-2 justify-end">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center justify-center w-11 h-11 border rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-100 border-gray-400"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  title="Visualização em grade"
                  aria-label="Alternar para visualização em grade"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V8C0 8.53043 0.210714 9.03914 0.585786 9.41421C0.960859 9.78929 1.46957 10 2 10H8C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V2C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0ZM8 8H2V2H8V8ZM20 0H14C13.4696 0 12.9609 0.210714 12.5858 0.585786C12.2107 0.960859 12 1.46957 12 2V8C12 8.53043 12.2107 9.03914 12.5858 9.41421C12.9609 9.78929 13.4696 10 14 10H20C20.5304 10 21.0391 9.78929 21.4142 9.41421C21.7893 9.03914 22 8.53043 22 8V2C22 1.46957 21.7893 0.960859 21.4142 0.585786C21.0391 0.210714 20.5304 0 20 0ZM20 8H14V2H20V8ZM8 12H2C1.46957 12 0.960859 12.2107 0.585786 12.5858C0.210714 12.9609 0 13.4696 0 14V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H8C8.53043 22 9.03914 21.7893 9.41421 21.4142C9.78929 21.0391 10 20.5304 10 20V14C10 13.4696 9.78929 12.9609 9.41421 12.5858C9.03914 12.2107 8.53043 12 8 12ZM8 20H2V14H8V20ZM20 12H14C13.4696 12 12.9609 12.2107 12.5858 12.5858C12.2107 12.9609 12 13.4696 12 14V20C12 20.5304 12.2107 21.0391 12.5858 21.4142C12.9609 21.7893 13.4696 22 14 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V14C22 13.4696 21.7893 12.9609 21.4142 12.5858C21.0391 12.2107 20.5304 12 20 12ZM20 20H14V14H20V20Z"
                      fill="#141414"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center justify-center w-11 h-11 border rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-100 border-gray-400"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  title="Visualização em lista"
                  aria-label="Alternar para visualização em lista"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 4H7C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5C6 5.26522 6.10536 5.51957 6.29289 5.70711C6.48043 5.89464 6.73478 6 7 6H21C21.2652 6 21.5196 5.89464 21.7071 5.70711C21.8946 5.51957 22 5.26522 22 5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM21 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12H21C21.2652 12 21.5196 11.8946 21.7071 11.7071C21.8946 11.5196 22 11.2652 22 11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10ZM21 16H7C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM2 4C1.46957 4 0.960859 4.21071 0.585786 4.58579C0.210714 4.96086 0 5.46957 0 6C0 6.53043 0.210714 7.03914 0.585786 7.41421C0.960859 7.78929 1.46957 8 2 8C2.53043 8 3.03914 7.78929 3.41421 7.41421C3.78929 7.03914 4 6.53043 4 6C4 5.46957 3.78929 4.96086 3.41421 4.58579C3.03914 4.21071 2.53043 4 2 4ZM2 10C1.46957 10 0.960859 10.2107 0.585786 10.5858C0.210714 10.9609 0 11.4696 0 12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14C2.53043 14 3.03914 13.7893 3.41421 13.4142C3.78929 13.0391 4 12.5304 4 12C4 11.4696 3.78929 10.9609 3.41421 10.5858C3.03914 10.2107 2.53043 10 2 10ZM2 16C1.46957 16 0.960859 16.2107 0.585786 16.5858C0.210714 16.9609 0 17.4696 0 18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20C2.53043 20 3.03914 19.7893 3.41421 19.4142C3.78929 19.0391 4 18.5304 4 18C4 17.4696 3.78929 16.9609 3.41421 16.5858C3.03914 16.2107 2.53043 16 2 16Z"
                      fill="#141414"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8"
                : "flex flex-col gap-6"
            }`}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 20}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </div>
            ))}
          </div>

          {/* Mensagem quando não há produtos */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <p className="font-lato text-gray-400 text-lg">
                Nenhum produto encontrado para esta marca.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Filtros */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filterOptions={filterOptions}
      />
    </>
  );
}
