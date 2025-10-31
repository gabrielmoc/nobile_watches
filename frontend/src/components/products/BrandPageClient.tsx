"use client";

import { FilterModal } from "@/components/products/FilterModal";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterOptions, Product } from "@/types/mock";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { UserNav } from "../user/UserNav";

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
      <div className="min-h-screen bg-white brand">
        <div className="container mx-auto max-w-7xl px-5 lg:px-8 pt-4 pb-18 lg:pt-8 lg:pb-30">
          {/* Breadcrumb e Header */}
          <div className="mb-6 lg:mb-8">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: brandName }]} />

            {/* Header com título e controles */}
            <div className="flex lg:h-[44px] items-center justify-between">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-[32px]">{brandName}</h1>
              </div>

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
                    d="M23 7C23 7.26522 22.8946 7.51957 22.7071 7.70711C22.5196 7.89464 22.2652 8 22 8H6C5.73478 8 5.48043 7.89464 5.29289 7.70711C5.10536 7.51957 5 7.26522 5 7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H22C22.2652 6 22.5196 6.10536 22.7071 6.29289C22.8946 6.48043 23 6.73478 23 7ZM27 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H27C27.2652 2 27.5196 1.89464 27.7071 1.70711C27.8946 1.51957 28 1.26522 28 1C28 0.734784 27.8946 0.48043 27.7071 0.292893C27.5196 0.105357 27.2652 0 27 0ZM17 12H11C10.7348 12 10.4804 12.1054 10.2929 12.2929C10.1054 12.4804 10 12.7348 10 13C10 13.2652 10.1054 13.5196 10.2929 13.7071C10.4804 13.8946 10.7348 14 11 14H17C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            {/* Ações rápidas - Desktop */}
            <div className="hidden lg:flex items-center justify-between mt-3">
              <UserNav />
            </div>

            <div className="flex lg:h-[32px] items-center justify-between mt-3 lg:mt-6">
              <p className="text-[18px] font-bold">
                {products.length.toLocaleString("pt-BR")} anúncios
              </p>

              {/* Controles de ordenação e visualização - Desktop */}
              <div className="flex items-center gap-[14px]">
                {/* Botão de alternancia de visualização - Desktop */}
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-gray-50 transition-colors"
                  title={
                    viewMode === "grid" ? "Alternar para lista" : "Alternar para grade"
                  }
                  aria-label={
                    viewMode === "grid"
                      ? "Alternar para visualizaÃ§Ã£o em lista"
                      : "Alternar para visualizaÃ§Ã£o em grade"
                  }
                >
                  {viewMode === "grid" ? (
                    <svg
                      width="24"
                      height="20"
                      viewBox="0 0 24 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 11H2C1.46957 11 0.960859 11.2107 0.585786 11.5858C0.210714 11.9609 0 12.4696 0 13V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H22C22.5304 20 23.0391 19.7893 23.4142 19.4142C23.7893 19.0391 24 18.5304 24 18V13C24 12.4696 23.7893 11.9609 23.4142 11.5858C23.0391 11.2107 22.5304 11 22 11ZM22 18H2V13H22V18ZM22 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V7C0 7.53043 0.210714 8.03914 0.585786 8.41421C0.960859 8.78929 1.46957 9 2 9H22C22.5304 9 23.0391 8.78929 23.4142 8.41421C23.7893 8.03914 24 7.53043 24 7V2C24 1.46957 23.7893 0.960859 23.4142 0.585786C23.0391 0.210714 22.5304 0 22 0ZM22 7H2V2H22V7Z"
                        fill="#141414"
                      />
                    </svg>
                  ) : (
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
                  )}
                </button>

                {/* Botão de ordenação - Desktop */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-gray-50 transition-colors"
                    title="Ordenar"
                    aria-label="Ordenar produtos"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.70806 16.2923C9.80103 16.3852 9.87479 16.4955 9.92512 16.6169C9.97544 16.7383 10.0013 16.8684 10.0013 16.9998C10.0013 17.1312 9.97544 17.2614 9.92512 17.3828C9.87479 17.5042 9.80103 17.6144 9.70806 17.7073L5.70806 21.7073C5.61518 21.8003 5.50489 21.874 5.3835 21.9244C5.2621 21.9747 5.13197 22.0006 5.00056 22.0006C4.86914 22.0006 4.73901 21.9747 4.61762 21.9244C4.49622 21.874 4.38593 21.8003 4.29306 21.7073L0.293056 17.7073C0.200146 17.6144 0.126445 17.5041 0.0761628 17.3827C0.0258802 17.2613 0 17.1312 0 16.9998C0 16.8684 0.0258802 16.7383 0.0761628 16.6169C0.126445 16.4955 0.200146 16.3852 0.293056 16.2923C0.480697 16.1047 0.735192 15.9993 1.00056 15.9993C1.13195 15.9993 1.26206 16.0251 1.38345 16.0754C1.50485 16.1257 1.61515 16.1994 1.70806 16.2923L4.00056 18.5861V0.99981C4.00056 0.734594 4.10591 0.48024 4.29345 0.292704C4.48099 0.105167 4.73534 -0.000189781 5.00056 -0.000189781C5.26577 -0.000189781 5.52013 0.105167 5.70766 0.292704C5.8952 0.48024 6.00056 0.734594 6.00056 0.99981V18.5861L8.29306 16.2923C8.38593 16.1993 8.49622 16.1256 8.61762 16.0752C8.73901 16.0249 8.86914 15.999 9.00056 15.999C9.13197 15.999 9.2621 16.0249 9.3835 16.0752C9.50489 16.1256 9.61518 16.1993 9.70806 16.2923ZM21.7081 4.29231L17.7081 0.29231C17.6152 0.199334 17.5049 0.125575 17.3835 0.0752506C17.2621 0.0249263 17.132 -0.000976562 17.0006 -0.000976562C16.8691 -0.000976562 16.739 0.0249263 16.6176 0.0752506C16.4962 0.125575 16.3859 0.199334 16.2931 0.29231L12.2931 4.29231C12.1054 4.47995 12 4.73445 12 4.99981C12 5.26517 12.1054 5.51967 12.2931 5.70731C12.4807 5.89495 12.7352 6.00037 13.0006 6.00037C13.2659 6.00037 13.5204 5.89495 13.7081 5.70731L16.0006 3.41356V20.9998C16.0006 21.265 16.1059 21.5194 16.2934 21.7069C16.481 21.8945 16.7353 21.9998 17.0006 21.9998C17.2658 21.9998 17.5201 21.8945 17.7077 21.7069C17.8952 21.5194 18.0006 21.265 18.0006 20.9998V3.41356L20.2931 5.70731C20.4807 5.89495 20.7352 6.00037 21.0006 6.00037C21.2659 6.00037 21.5204 5.89495 21.7081 5.70731C21.8957 5.51967 22.0011 5.26517 22.0011 4.99981C22.0011 4.73445 21.8957 4.47995 21.7081 4.29231Z"
                        fill="#141414"
                      />
                    </svg>
                  </button>

                  {/* Dropdown de ordernação - Desktop */}
                  {isSortDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsSortDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`w-full text-left px-4 py-2.5 font-lato text-sm transition-colors flex items-center justify-between ${
                              sortBy === option.value
                                ? "bg-[#FFF9E6] text-[#D5A60A] font-medium"
                                : "text-[#141414] hover:bg-gray-50"
                            }`}
                          >
                            <span>{option.label}</span>
                            {sortBy === option.value && (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8"
                : "grid grid-cols-1 gap-4 md:gap-6 lg:flex lg:flex-col"
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

          {/* Mensagem quando não existem produtos */}
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
