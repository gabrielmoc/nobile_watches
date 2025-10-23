"use client";

import { stringToSlug } from "@/lib/utils/stringUtils";
import { Product } from "@/types/mock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PriceEvolutionChart } from "./PriceEvolutionChart";
import { ProductCard } from "./ProductCard";
import { ProductSpecs } from "./ProductSpecs";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Prepara array de imagens
  const images =
    product.images && product.images.length > 0 ? product.images : [product.image];

  // Imagens visíveis na galeria
  const visibleImages = showAllImages ? images : images.slice(0, 5);
  const hasMoreImages = images.length > 5;

  // Dados mock para evolução do valor
  const priceEvolution = {
    current: product.price,
    change: 24938,
    percentChange: 2.4,
    history: [
      { date: "30/02/24", value: product.price - 24938 },
      { date: "30/05/24", value: product.price - 15000 },
      { date: "30/08/24", value: product.price - 10000 },
      { date: "30/11/24", value: product.price - 5000 },
      { date: "30/02/25", value: product.price },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-[48px]">
        {/* Layout principal - Grid 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,_1fr)_minmax(400px,_550px)] gap-6 lg:gap-8 xl:gap-12 mb-16">
          {/* Coluna Esquerda: Galeria de Imagens */}
          <div className="space-y-4">
            {/* Imagem principal */}
            <div className="relative w-full aspect-square rounded-lg bg-[#F5F5F5] overflow-hidden border border-gray-200">
              <Image
                src={images[selectedImage] || product.image}
                alt={`${product.brand} ${product.model}`}
                fill
                className="object-contain p-4"
                priority
              />

              {/* Ícones de ação sobre a imagem */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {visibleImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-md bg-[#F5F5F5] overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-[#D5A60A] ring-1 ring-[#D5A60A]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.brand} ${product.model} - ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}

              {/* Botão +N se houver mais imagens */}
              {!showAllImages && hasMoreImages && (
                <button
                  onClick={() => setShowAllImages(true)}
                  className="relative aspect-square rounded-md bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 transition-colors border-2 border-gray-200"
                >
                  <span className="font-erstoria text-base font-medium text-[#141414]">
                    +{images.length - 5}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Coluna Direita: Informações do Produto */}
          <div className="pt-10 space-y-8">
            {/* Breadcrumb - Movido para o topo */}
            <nav className="flex items-center gap-2 text-[18px] font-erstoria">
              <Link
                href="/"
                className="text-[#141414] hover:text-[#D5A60A] transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-400">&gt;</span>
              <Link
                href={`/${stringToSlug(product.brand)}`}
                className="text-[#141414] hover:text-[#D5A60A] transition-colors"
              >
                {product.brand}
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-[#D5A60A]">{product.model}</span>
            </nav>

            <div className="space-y-6">
              {/* Cabeçalho com marca */}
              <div className="flex items-center justify-between h-[28px]">
                <span className="font-erstoria text-[18px] text-[#D5A60A] tracking-wide">
                  {product.brand}
                </span>
                {product.verified && (
                  <div className="flex items-center gap-1 bg-[#EFEFEF] px-2 py-1 rounded-[4px]">
                    <div className="w-[18px] h-[18px]">
                      <Image
                        src="/icons/verified-badge.svg"
                        alt="Verificado"
                        width={16}
                        height={16}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-sm text-pb-500">Vendedor verificado</span>
                  </div>
                )}
              </div>

              {/* Título do produto */}
              <div>
                <h1 className="font-erstoria text-2xl lg:text-[32px] font-medium text-[#141414] mb-2">
                  {product.brand} {product.model}
                </h1>
                <p className="font-lato text-base text-gray-400 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Referência e WebID */}
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="font-lato">REF: {product.reference}</span>
                  <span className="font-lato">|</span>
                  <span className="font-lato">WEBID: {product.id}</span>
                </div>
              </div>

              {/* Preço */}
              <div className="flex items-center justify-between gap-2 h-[32px]">
                <span className="text-2xl lg:text-[28px] font-bold text-[#141414] leading-[140%]">
                  R$ {product.price.toLocaleString("pt-BR")}
                </span>

                <button className="w-8 h-8" aria-label="Adicionar aos favoritos">
                  <Image
                    src="/icons/heart-outline.svg"
                    alt="Favoritar"
                    width={32}
                    height={32}
                  />
                </button>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="">
              <button className="w-full h-[56px] bg-[#D5A60A] hover:bg-[#C09509] text-white text-base font-bold py-3.5 px-6 rounded-full transition-colors">
                Comprar
              </button>
              {/* <button className="w-full border-2 border-[#D5A60A] text-[#D5A60A] hover:bg-[#D5A60A] hover:text-white font-erstoria text-base font-medium py-3.5 px-6 rounded-lg transition-colors">
                Adicionar ao carrinho
              </button> */}
              {/* <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-lato text-sm font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Tem dúvidas?
              </button> */}
            </div>

            {/* Badges de Garantia */}
            <div>
              <div className="flex gap-6 mb-[18px] flex-wrap">
                <div className="h-5 flex items-center gap-2">
                  <div className="w-5 h-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.475 5.16841L10.6 1.40669C10.4163 1.30519 10.2099 1.25195 10 1.25195C9.79013 1.25195 9.58369 1.30519 9.4 1.40669L2.525 5.16997C2.32866 5.2774 2.16477 5.43557 2.05043 5.62796C1.93609 5.82035 1.87551 6.03992 1.875 6.26372V13.7356C1.87551 13.9594 1.93609 14.179 2.05043 14.3714C2.16477 14.5638 2.32866 14.7219 2.525 14.8293L9.4 18.5926C9.58369 18.6941 9.79013 18.7474 10 18.7474C10.2099 18.7474 10.4163 18.6941 10.6 18.5926L17.475 14.8293C17.6713 14.7219 17.8352 14.5638 17.9496 14.3714C18.0639 14.179 18.1245 13.9594 18.125 13.7356V6.2645C18.1249 6.0403 18.0645 5.82025 17.9502 5.62741C17.8358 5.43456 17.6717 5.27603 17.475 5.16841ZM10 2.50044L16.2766 5.93794L13.9508 7.21138L7.67344 3.77388L10 2.50044ZM10 9.37544L3.72344 5.93794L6.37187 4.48794L12.6484 7.92544L10 9.37544ZM3.125 7.03169L9.375 10.452V17.1543L3.125 13.7364V7.03169ZM16.875 13.7333L10.625 17.1543V10.4551L13.125 9.08716V11.8754C13.125 12.0412 13.1908 12.2002 13.3081 12.3174C13.4253 12.4346 13.5842 12.5004 13.75 12.5004C13.9158 12.5004 14.0747 12.4346 14.1919 12.3174C14.3092 12.2002 14.375 12.0412 14.375 11.8754V8.40278L16.875 7.03169V13.7325V13.7333Z"
                        fill="#141414"
                      />
                    </svg>
                  </div>
                  <span className="font-lato text-sm whitespace-nowrap text-pb-500">
                    Entrega Segura
                  </span>
                </div>
                <div className="h-5 flex items-center gap-2">
                  <div className="w-5 h-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.25 3.125H3.75C3.41848 3.125 3.10054 3.2567 2.86612 3.49112C2.6317 3.72554 2.5 4.04348 2.5 4.375V8.75C2.5 12.8688 4.49375 15.3648 6.16641 16.7336C7.96797 18.207 9.76016 18.707 9.83828 18.7281C9.9457 18.7573 10.059 18.7573 10.1664 18.7281C10.2445 18.707 12.0344 18.207 13.8383 16.7336C15.5062 15.3648 17.5 12.8688 17.5 8.75V4.375C17.5 4.04348 17.3683 3.72554 17.1339 3.49112C16.8995 3.2567 16.5815 3.125 16.25 3.125ZM16.25 8.75C16.25 11.6461 15.1828 13.9969 13.0781 15.7359C12.1619 16.4904 11.12 17.0775 10 17.4703C8.89469 17.0843 7.86558 16.5077 6.95937 15.7664C4.82969 14.0242 3.75 11.6641 3.75 8.75V4.375H16.25V8.75ZM6.43281 11.0672C6.31554 10.9499 6.24965 10.7909 6.24965 10.625C6.24965 10.4591 6.31554 10.3001 6.43281 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04085 9.99965 7.19991 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7503 8.04288 13.7503 8.125C13.7503 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719L9.19219 12.9422C9.13414 13.0003 9.06521 13.0464 8.98934 13.0779C8.91346 13.1093 8.83213 13.1255 8.75 13.1255C8.66786 13.1255 8.58654 13.1093 8.51066 13.0779C8.43479 13.0464 8.36586 13.0003 8.30781 12.9422L6.43281 11.0672Z"
                        fill="#141414"
                      />
                    </svg>
                  </div>
                  <span className="font-lato text-sm whitespace-nowrap text-pb-500">
                    Autenticidade Garantida
                  </span>
                </div>
                <div className="h-5 flex items-center gap-2">
                  <div className="w-5 h-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.6453 8.03281C17.3508 7.725 17.0461 7.40781 16.9312 7.12891C16.825 6.87344 16.8187 6.45 16.8125 6.03984C16.8008 5.27734 16.7883 4.41328 16.1875 3.8125C15.5867 3.21172 14.7227 3.19922 13.9602 3.1875C13.55 3.18125 13.1266 3.175 12.8711 3.06875C12.593 2.95391 12.275 2.64922 11.9672 2.35469C11.4281 1.83672 10.8156 1.25 10 1.25C9.18437 1.25 8.57266 1.83672 8.03281 2.35469C7.725 2.64922 7.40781 2.95391 7.12891 3.06875C6.875 3.175 6.45 3.18125 6.03984 3.1875C5.27734 3.19922 4.41328 3.21172 3.8125 3.8125C3.21172 4.41328 3.20312 5.27734 3.1875 6.03984C3.18125 6.45 3.175 6.87344 3.06875 7.12891C2.95391 7.40703 2.64922 7.725 2.35469 8.03281C1.83672 8.57188 1.25 9.18437 1.25 10C1.25 10.8156 1.83672 11.4273 2.35469 11.9672C2.64922 12.275 2.95391 12.5922 3.06875 12.8711C3.175 13.1266 3.18125 13.55 3.1875 13.9602C3.19922 14.7227 3.21172 15.5867 3.8125 16.1875C4.41328 16.7883 5.27734 16.8008 6.03984 16.8125C6.45 16.8187 6.87344 16.825 7.12891 16.9312C7.40703 17.0461 7.725 17.3508 8.03281 17.6453C8.57188 18.1633 9.18437 18.75 10 18.75C10.8156 18.75 11.4273 18.1633 11.9672 17.6453C12.275 17.3508 12.5922 17.0461 12.8711 16.9312C13.1266 16.825 13.55 16.8187 13.9602 16.8125C14.7227 16.8008 15.5867 16.7883 16.1875 16.1875C16.7883 15.5867 16.8008 14.7227 16.8125 13.9602C16.8187 13.55 16.825 13.1266 16.9312 12.8711C17.0461 12.593 17.3508 12.275 17.6453 11.9672C18.1633 11.4281 18.75 10.8156 18.75 10C18.75 9.18437 18.1633 8.57266 17.6453 8.03281ZM16.743 11.1023C16.3687 11.493 15.9812 11.8969 15.7758 12.393C15.5789 12.8695 15.5703 13.4141 15.5625 13.9414C15.5547 14.4883 15.5461 15.0609 15.3031 15.3031C15.0602 15.5453 14.4914 15.5547 13.9414 15.5625C13.4141 15.5703 12.8695 15.5789 12.393 15.7758C11.8969 15.9812 11.493 16.3687 11.1023 16.743C10.7117 17.1172 10.3125 17.5 10 17.5C9.6875 17.5 9.28516 17.1156 8.89766 16.743C8.51016 16.3703 8.10313 15.9812 7.60703 15.7758C7.13047 15.5789 6.58594 15.5703 6.05859 15.5625C5.51172 15.5547 4.93906 15.5461 4.69687 15.3031C4.45469 15.0602 4.44531 14.4914 4.4375 13.9414C4.42969 13.4141 4.42109 12.8695 4.22422 12.393C4.01875 11.8969 3.63125 11.493 3.25703 11.1023C2.88281 10.7117 2.5 10.3125 2.5 10C2.5 9.6875 2.88437 9.28516 3.25703 8.89766C3.62969 8.51016 4.01875 8.10313 4.22422 7.60703C4.42109 7.13047 4.42969 6.58594 4.4375 6.05859C4.44531 5.51172 4.45391 4.93906 4.69687 4.69687C4.93984 4.45469 5.50859 4.44531 6.05859 4.4375C6.58594 4.42969 7.13047 4.42109 7.60703 4.22422C8.10313 4.01875 8.50703 3.63125 8.89766 3.25703C9.28828 2.88281 9.6875 2.5 10 2.5C10.3125 2.5 10.7148 2.88437 11.1023 3.25703C11.4898 3.62969 11.8969 4.01875 12.393 4.22422C12.8695 4.42109 13.4141 4.42969 13.9414 4.4375C14.4883 4.44531 15.0609 4.45391 15.3031 4.69687C15.5453 4.93984 15.5547 5.50859 15.5625 6.05859C15.5703 6.58594 15.5789 7.13047 15.7758 7.60703C15.9812 8.10313 16.3687 8.50703 16.743 8.89766C17.1172 9.28828 17.5 9.6875 17.5 10C17.5 10.3125 17.1156 10.7148 16.743 11.1023ZM13.5672 7.68281C13.6253 7.74086 13.6714 7.80979 13.7029 7.88566C13.7343 7.96154 13.7505 8.04287 13.7505 8.125C13.7505 8.20713 13.7343 8.28846 13.7029 8.36434C13.6714 8.44021 13.6253 8.50914 13.5672 8.56719L9.19219 12.9422C9.13414 13.0003 9.06521 13.0464 8.98934 13.0779C8.91346 13.1093 8.83213 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51066 13.0779C8.43479 13.0464 8.36586 13.0003 8.30781 12.9422L6.43281 11.0672C6.31554 10.9499 6.24965 10.7909 6.24965 10.625C6.24965 10.4591 6.31554 10.3001 6.43281 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04085 9.99965 7.19991 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.6247 12.8098 7.5786 12.8857 7.54715C12.9615 7.5157 13.0429 7.49951 13.125 7.49951C13.2071 7.49951 13.2885 7.5157 13.3643 7.54715C13.4402 7.5786 13.5091 7.6247 13.5672 7.68281Z"
                        fill="#141414"
                      />
                    </svg>
                  </div>
                  <span className="font-lato text-sm whitespace-nowrap text-pb-500">
                    Vendedor Certificado
                  </span>
                </div>
              </div>{" "}
              <div className="h-5 flex items-center gap-2">
                <div className="w-5 h-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 3.75H2.5C2.16848 3.75 1.85054 3.8817 1.61612 4.11612C1.3817 4.35054 1.25 4.66848 1.25 5V15C1.25 15.3315 1.3817 15.6495 1.61612 15.8839C1.85054 16.1183 2.16848 16.25 2.5 16.25H17.5C17.8315 16.25 18.1495 16.1183 18.3839 15.8839C18.6183 15.6495 18.75 15.3315 18.75 15V5C18.75 4.66848 18.6183 4.35054 18.3839 4.11612C18.1495 3.8817 17.8315 3.75 17.5 3.75ZM17.5 5V6.875H2.5V5H17.5ZM17.5 15H2.5V8.125H17.5V15ZM16.25 13.125C16.25 13.2908 16.1842 13.4497 16.0669 13.5669C15.9497 13.6842 15.7908 13.75 15.625 13.75H13.125C12.9592 13.75 12.8003 13.6842 12.6831 13.5669C12.5658 13.4497 12.5 13.2908 12.5 13.125C12.5 12.9592 12.5658 12.8003 12.6831 12.6831C12.8003 12.5658 12.9592 12.5 13.125 12.5H15.625C15.7908 12.5 15.9497 12.5658 16.0669 12.6831C16.1842 12.8003 16.25 12.9592 16.25 13.125ZM11.25 13.125C11.25 13.2908 11.1842 13.4497 11.0669 13.5669C10.9497 13.6842 10.7908 13.75 10.625 13.75H9.375C9.20924 13.75 9.05027 13.6842 8.93306 13.5669C8.81585 13.4497 8.75 13.2908 8.75 13.125C8.75 12.9592 8.81585 12.8003 8.93306 12.6831C9.05027 12.5658 9.20924 12.5 9.375 12.5H10.625C10.7908 12.5 10.9497 12.5658 11.0669 12.6831C11.1842 12.8003 11.25 12.9592 11.25 13.125Z"
                      fill="#141414"
                    />
                  </svg>
                </div>
                <span className="font-lato text-sm whitespace-nowrap text-pb-500">
                  Pagamento Seguro
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div className="mb-12">
          <h2 className="font-erstoria text-xl text-pb-500 tracking-[-0.01em] mb-[16px]">
            Descrição
          </h2>

          {/* Status do produto */}
          <div className="flex flex-wrap gap-[6px] mb-[16px]">
            {product.hasBox && (
              <span className="px-2 py-[3px] bg-[#D9D9D9] rounded-[32px] font-lato text-sm text-pb-500 tracking-[-0.01em]">
                Possui Caixa
              </span>
            )}
            {product.hasDocuments && (
              <span className="px-2 py-[3px] bg-[#D9D9D9] rounded-[32px] font-lato text-sm text-pb-500 tracking-[-0.01em]">
                Possui Documentação
              </span>
            )}
            {product.condition && (
              <span className="px-2 py-[3px] bg-[#D9D9D9] rounded-[32px] font-lato text-sm text-pb-500 tracking-[-0.01em]">
                {product.condition}
              </span>
            )}
          </div>

          <div className="space-y-2 font-lato text-gray-400 tracking-[-0.01em] leading-normal">
            <p>
              With its limited production run, the Patek Philippe Perpetual Calendar
              Chronograph Ref. 5970P in platinum stands as an exceptional find for serious
              collectors. It is estimated that fewer than 400 pieces of this model were
              produced in platinum between 2009 and 2010. This watch features a
              substantial yet balanced case measuring 40mm in diameter, with sapphire
              crystals on both front and back. It is worn on a classic black leather strap
              and features an elegantly complex yet legible dial in black. Displayed on
              the dial are the day and month at 12 o’clock, 30-minute chronograph counter
              with leap year at 3, moon phase and date at 6, and a continuous seconds
              counter with 24-hour display at 9.
            </p>
            <p>
              This coveted timepiece is powered by the hand-wound CH 27-70 Q movement with
              a power reserve of approximately 60 hours.This pre-owned Patek Philippe
              Perpetual Calendar Chronograph Platinum Watch 5970P-001 is presented in the
              manufacturer’s wooden box, inclusive of papers and a bifold leather wallet.
            </p>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <ProductSpecs product={product} />

        {/* Seção Evolução do Valor - Grid 2 colunas */}
        <div className="mb-16">
          <h2 className="font-erstoria text-[24px] font-medium text-pb-500 mb-6">
            Evolução do valor
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,_1fr)_minmax(400px,_550px)] gap-6 lg:gap-8">
            {/* Coluna Esquerda: Gráfico */}
            <div>
              <PriceEvolutionChart
                data={priceEvolution.history}
                currentPrice={priceEvolution.current}
                change={priceEvolution.change}
                percentChange={priceEvolution.percentChange}
              />
            </div>

            {/* Coluna Direita: Card do Produto */}
            <div className="bg-[#F7F7F7] rounded-lg p-8 h-[458px]">
              <div className="flex gap-8 h-[302px]">
                {/* Imagem do produto */}
                <div className="relative flex-1 rounded-[13.62px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Informações do produto */}
                <div className="flex-1 py-8">
                  {/* Marca */}
                  <div className="mb-5">
                    <p className="text-sm text-pb-500 tracking-[-0.01em] mb-3">
                      {product.brand}
                    </p>
                    <div className="h-[88px]">
                      <h3 className="text-[22px] font-medium tracking-[-0.01em] mb-1">
                        {product.model}
                      </h3>
                      <p className="text-sm">{product.reference}</p>
                    </div>
                  </div>

                  {/* Especificações */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="font-lato text-sm">Caixa:</span>
                      <span className="font-lato text-sm">
                        {product.caseMaterial || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="font-lato text-sm">Mostrador:</span>
                      <span className="font-lato text-sm">
                        {product.dialColor || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="font-lato text-sm">Estado:</span>
                      <span className="font-lato text-sm">
                        {product.condition || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Botão Adicionar a coleção */}
              <button className="w-full h-[56px] mt-8 py-3 border-1 border-[#141414] rounded-full font-lato font-bold text-[#141414] hover:bg-[#141414] hover:text-white transition-colors duration-200">
                Adicionar a coleção
              </button>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados / Sugestões */}
        {relatedProducts.length > 0 && (
          <div className="mb-[160px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-erstoria text-[28px] text-[#141414]">
                Sugestões para você
              </h2>
              <Link
                href={`/${stringToSlug(product.brand)}`}
                className="font-lato text-sm text-[#D5A60A] hover:underline"
              >
                Ver tudo
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
