"use client";

import { FilterModal } from "@/components/products/FilterModal";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterOptions, Product } from "@/types/mock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BrandPageClientProps {
  brandName: string;
  products: Product[];
  filterOptions: FilterOptions;
}

export function BrandPageClient({
  brandName,
  products,
  filterOptions,
}: BrandPageClientProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

            {/* Header com título e botão de filtros */}
            <div className="">
              <div className="flex h-[44px] items-center justify-between mb-2">
                <h1 className="font-erstoria text-3xl md:text-[32px] text-[#141414]">
                  {brandName}
                </h1>
                {/* Botão Filtros - Rosa */}
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="cursor-pointer"
                  title="Abrir filtros"
                >
                  <Image
                    src="/icons/filter.svg"
                    alt="Abrir filtros"
                    width={44}
                    height={44}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-lato text-[#141414] text-sm md:text-base font-bold">
                  {products.length.toLocaleString("pt-BR")} anúncios
                </p>
              </div>
            </div>

            {/* Ações rápidas - Desktop */}
            <div className="hidden md:flex items-center gap-6 pb-0">
              <button
                className="hover:opacity-80 transition-opacity"
                title="Minha coleção"
              >
                <Image
                  src="/images/brand/minha-colecao.svg"
                  alt="Minha coleção"
                  width={150}
                  height={50}
                  className="h-[50px] w-auto"
                />
              </button>

              <button
                className="hover:opacity-80 transition-opacity"
                title="Meus anuncios"
              >
                <Image
                  src="/images/brand/meus-anuncios.svg"
                  alt="Meus anuncios"
                  width={150}
                  height={50}
                  className="h-[50px] w-auto"
                />
              </button>

              <button
                className="hover:opacity-80 transition-opacity"
                title="Minhas compras"
              >
                <Image
                  src="/images/brand/minhas-compras.svg"
                  alt="Minhas compras"
                  width={159}
                  height={50}
                  className="h-[50px] w-auto"
                />
              </button>

              <Link
                href="/carrinho"
                className="hover:opacity-80 transition-opacity"
                title="Meu carrinho"
              >
                <Image
                  src="/images/brand/meu-carrinho.svg"
                  alt="Meu carrinho"
                  width={143}
                  height={50}
                  className="h-[50px] w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
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

          {/* Paginação */}
          {/* {products.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button className="w-10 h-10 flex items-center justify-center bg-[#D5A60A] text-white rounded-lg font-lato font-medium">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-lato">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-lato">
                3
              </button>
              <span className="px-2 text-gray-400">...</span>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-lato">
                10
              </button>

              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )} */}
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
