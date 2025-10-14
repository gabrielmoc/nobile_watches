"use client";

import { Product } from "@/types/mock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  if (viewMode === "list") {
    return (
      <div className="group transition-all duration-300 rounded-lg hover:shadow-md hover:border-gray-200 overflow-hidden">
        <div className="flex gap-6 p-0">
          {/* Imagem */}
          <Link
            href={`/produto/${product.id}`}
            className="flex-shrink-0 w-[281px] h-[269px] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A60A] focus-visible:ring-offset-2 rounded-lg"
          >
            <div className="relative w-full h-full rounded-lg bg-[#EFEFEF] overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.brand} ${product.model}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col justify-between py-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Link href={`/produto/${product.id}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-erstoria text-base md:text-lg text-[#D5A60A] leading-[140%]">
                        {product.brand}
                      </p>
                      {product.verified && (
                        <div className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]">
                          <Image
                            src="/icons/verified-badge.svg"
                            alt="Verificado"
                            width={22}
                            height={22}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                    <h3 className="font-erstoria text-xl md:text-2xl text-[#141414] font-normal leading-[120%] mb-2">
                      {product.model}
                    </h3>
                    <p className="font-lato text-sm md:text-base font-normal text-gray-400 leading-[140%] line-clamp-2">
                      {product.description}
                    </p>
                  </Link>
                </div>

                {/* Botão de favoritar */}
                <button
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform ml-4"
                  aria-label={
                    isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
                  }
                  onClick={handleToggleFavorite}
                >
                  <Image
                    src={
                      isFavorited ? "/icons/heart-filled.svg" : "/icons/heart-outline.svg"
                    }
                    alt={isFavorited ? "Favoritado" : "Favoritar"}
                    width={24}
                    height={24}
                    className="w-full h-full"
                  />
                </button>
              </div>

              {/* Informações adicionais */}
              {/* <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                {product.year && (
                  <div className="flex items-center gap-1">
                    <span className="font-lato">Ano:</span>
                    <span className="font-lato font-medium">{product.year}</span>
                  </div>
                )}
                {product.condition && (
                  <div className="flex items-center gap-1">
                    <span className="font-lato">Estado:</span>
                    <span className="font-lato font-medium">{product.condition}</span>
                  </div>
                )}
                {product.caseMaterial && (
                  <div className="flex items-center gap-1">
                    <span className="font-lato">Material:</span>
                    <span className="font-lato font-medium">{product.caseMaterial}</span>
                  </div>
                )}
                {product.diameter && (
                  <div className="flex items-center gap-1">
                    <span className="font-lato">Diâmetro:</span>
                    <span className="font-lato font-medium">{product.diameter}mm</span>
                  </div>
                )}
              </div> */}
            </div>

            {/* Preço */}
            <div className="mt-4">
              <Link href={`/produto/${product.id}`}>
                <p className="font-lato text-2xl md:text-3xl font-medium leading-[120%] text-[#141414]">
                  R$ {product.price.toLocaleString("pt-BR")}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout em grade (original)
  return (
    <div className="group transition-all duration-300">
      <Link
        href={`/produto/${product.id}`}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A60A] focus-visible:ring-offset-2 rounded-lg block"
      >
        <div className="relative aspect-square rounded-lg bg-[#EFEFEF] overflow-hidden mb-4">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </Link>

      <div className="relative min-h-[116px]">
        {/* Badge de verificado */}
        {product.verified && (
          <div className="absolute top-0 right-0 w-[18px] h-[18px] md:w-[22px] md:h-[22px]">
            <Image
              src="/icons/verified-badge.svg"
              alt="Verificado"
              width={22}
              height={22}
              className="w-full h-full"
            />
          </div>
        )}

        <Link href={`/produto/${product.id}`}>
          <p className="font-erstoria text-sm md:text-base text-[#D5A60A] leading-[140%] mb-2 md:mb-3">
            {product.brand}
          </p>
          <h3 className="font-erstoria text-lg md:text-[22px] text-[#141414] font-normal leading-[120%] line-clamp-1 mb-2">
            {product.model}
          </h3>
          <p className="font-lato text-xs md:text-[15px] font-normal text-gray-400 leading-[120%] mb-3 md:mb-4 line-clamp-1">
            {product.description}
          </p>
          <p className="font-lato text-lg md:text-xl font-medium leading-[120%] text-[#141414]">
            R$ {product.price.toLocaleString("pt-BR")}
          </p>
        </Link>

        {/* Botão de favoritar */}
        <button
          className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={handleToggleFavorite}
        >
          <Image
            src={isFavorited ? "/icons/heart-filled.svg" : "/icons/heart-outline.svg"}
            alt={isFavorited ? "Favoritado" : "Favoritar"}
            width={24}
            height={24}
            className="w-full h-full"
          />
        </button>
      </div>
    </div>
  );
}
