"use client";

import { Product } from "@/types/mock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="group transition-all">
      <Link href={`/produto/${product.id}`}>
        <div className="relative aspect-square rounded-lg bg-[#EFEFEF] overflow-hidden mb-4">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
