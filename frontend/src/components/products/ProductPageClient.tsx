// src/components/products/ProductPageClient.tsx
"use client";

import { stringToSlug } from "@/lib/utils/stringUtils";
import { Product } from "@/types/mock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

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
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            {/* Imagem principal */}
            <div className="relative aspect-square rounded-lg bg-[#EFEFEF] overflow-hidden">
              <Image
                src={images[selectedImage] || product.image}
                alt={`${product.brand} ${product.model}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {visibleImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg bg-[#EFEFEF] overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-[#D5A60A]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.brand} ${product.model} - ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}

              {/* Botão +N se houver mais imagens */}
              {!showAllImages && hasMoreImages && (
                <button
                  onClick={() => setShowAllImages(true)}
                  className="relative aspect-square rounded-lg bg-[#EFEFEF] flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <span className="font-erstoria text-xl text-[#141414]">
                    +{images.length - 5}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="pt-10 space-y-8">
            {/* Breadcrumb */}
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
              <span className="text-[#D5A60A] font-medium">{product.model}</span>
            </nav>

            <div className="space-y-6">
              {/* Vendedor e Badge */}
              <div className="flex items-center justify-between h-[28px]">
                <span className="font-erstoria text-lg text-[#D5A60A]">
                  {product.brand}
                </span>
                {product.verified && (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/verified-badge.svg"
                      alt="Verificado"
                      width={18}
                      height={18}
                    />
                    <span className="font-lato text-sm text-gray-600">
                      Vendedor verificado
                    </span>
                  </div>
                )}
              </div>

              {/* <button className="w-8 h-8" aria-label="Adicionar aos favoritos">
                <Image
                  src="/icons/heart-outline.svg"
                  alt="Favoritar"
                  width={32}
                  height={32}
                />
              </button> */}

              {/* Título e Descrição */}
              <div>
                <h1 className="font-erstoria text-3xl lg:text-[32px] text-[#141414] mb-4">
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
              <div className="">
                <p className="font-lato text-[28px] font-semibold text-pb-500">
                  R$ {product.price.toLocaleString("pt-BR")}
                </p>
              </div>

              {/* Botão Comprar */}
              <button className="w-full h-[56px] bg-[#D5A60A] hover:bg-[#B88F08] text-white font-lato font-semibold rounded-full transition-colors">
                Comprar
              </button>
            </div>

            {/* Badges de Garantia */}
            <div className="grid grid-cols-3 gap-4 py-0">
              <div className="flex items-center gap-2 h-5">
                <div className="w-5 h-5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.475 4.16841L9.6 0.406691C9.41631 0.305193 9.20987 0.251953 9 0.251953C8.79013 0.251953 8.58369 0.305193 8.4 0.406691L1.525 4.16997C1.32866 4.2774 1.16477 4.43557 1.05043 4.62796C0.936094 4.82035 0.875508 5.03992 0.875 5.26372V12.7356C0.875508 12.9594 0.936094 13.179 1.05043 13.3714C1.16477 13.5638 1.32866 13.7219 1.525 13.8293L8.4 17.5926C8.58369 17.6941 8.79013 17.7474 9 17.7474C9.20987 17.7474 9.41631 17.6941 9.6 17.5926L16.475 13.8293C16.6713 13.7219 16.8352 13.5638 16.9496 13.3714C17.0639 13.179 17.1245 12.9594 17.125 12.7356V5.2645C17.1249 5.0403 17.0645 4.82025 16.9502 4.62741C16.8358 4.43456 16.6717 4.27603 16.475 4.16841ZM9 1.50044L15.2766 4.93794L12.9508 6.21138L6.67344 2.77388L9 1.50044ZM9 8.37544L2.72344 4.93794L5.37187 3.48794L11.6484 6.92544L9 8.37544ZM2.125 6.03169L8.375 9.452V16.1543L2.125 12.7364V6.03169ZM15.875 12.7333L9.625 16.1543V9.45513L12.125 8.08716V10.8754C12.125 11.0412 12.1908 11.2002 12.3081 11.3174C12.4253 11.4346 12.5842 11.5004 12.75 11.5004C12.9158 11.5004 13.0747 11.4346 13.1919 11.3174C13.3092 11.2002 13.375 11.0412 13.375 10.8754V7.40278L15.875 6.03169V12.7325V12.7333Z"
                      fill="#141414"
                    />
                  </svg>
                </div>
                <span className="font-lato text-xs text-pb-500">Entrega Segura</span>
              </div>
              <div className="flex items-center gap-2 h-5">
                <div className="w-5 h-5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 0.125H1.75C1.41848 0.125 1.10054 0.256696 0.866116 0.491116C0.631696 0.725537 0.5 1.04348 0.5 1.375V5.75C0.5 9.86875 2.49375 12.3648 4.16641 13.7336C5.96797 15.207 7.76016 15.707 7.83828 15.7281C7.9457 15.7573 8.05898 15.7573 8.16641 15.7281C8.24453 15.707 10.0344 15.207 11.8383 13.7336C13.5062 12.3648 15.5 9.86875 15.5 5.75V1.375C15.5 1.04348 15.3683 0.725537 15.1339 0.491116C14.8995 0.256696 14.5815 0.125 14.25 0.125ZM14.25 5.75C14.25 8.64609 13.1828 10.9969 11.0781 12.7359C10.1619 13.4904 9.11996 14.0775 8 14.4703C6.89469 14.0843 5.86558 13.5077 4.95937 12.7664C2.82969 11.0242 1.75 8.66406 1.75 5.75V1.375H14.25V5.75ZM4.43281 8.06719C4.31554 7.94991 4.24965 7.79085 4.24965 7.625C4.24965 7.45915 4.31554 7.30009 4.43281 7.18281C4.55009 7.06554 4.70915 6.99965 4.875 6.99965C5.04085 6.99965 5.19991 7.06554 5.31719 7.18281L6.75 8.61641L10.6828 4.68281C10.7409 4.62474 10.8098 4.57868 10.8857 4.54725C10.9616 4.51583 11.0429 4.49965 11.125 4.49965C11.2071 4.49965 11.2884 4.51583 11.3643 4.54725C11.4402 4.57868 11.5091 4.62474 11.5672 4.68281C11.6253 4.74088 11.6713 4.80982 11.7027 4.88569C11.7342 4.96156 11.7503 5.04288 11.7503 5.125C11.7503 5.20712 11.7342 5.28844 11.7027 5.36431C11.6713 5.44018 11.6253 5.50912 11.5672 5.56719L7.19219 9.94219C7.13414 10.0003 7.06521 10.0464 6.98934 10.0779C6.91346 10.1093 6.83213 10.1255 6.75 10.1255C6.66786 10.1255 6.58654 10.1093 6.51066 10.0779C6.43479 10.0464 6.36586 10.0003 6.30781 9.94219L4.43281 8.06719Z"
                      fill="#141414"
                    />
                  </svg>
                </div>
                <span className="font-lato text-xs text-pb-500">
                  Autenticidade Garantida
                </span>
              </div>
              <div className="flex items-center gap-2 h-5">
                <div className="w-5 h-5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6453 7.03281C16.3508 6.725 16.0461 6.40781 15.9313 6.12891C15.825 5.87344 15.8187 5.45 15.8125 5.03984C15.8008 4.27734 15.7883 3.41328 15.1875 2.8125C14.5867 2.21172 13.7227 2.19922 12.9602 2.1875C12.55 2.18125 12.1266 2.175 11.8711 2.06875C11.593 1.95391 11.275 1.64922 10.9672 1.35469C10.4281 0.836719 9.81562 0.25 9 0.25C8.18438 0.25 7.57266 0.836719 7.03281 1.35469C6.725 1.64922 6.40781 1.95391 6.12891 2.06875C5.875 2.175 5.45 2.18125 5.03984 2.1875C4.27734 2.19922 3.41328 2.21172 2.8125 2.8125C2.21172 3.41328 2.20312 4.27734 2.1875 5.03984C2.18125 5.45 2.175 5.87344 2.06875 6.12891C1.95391 6.40703 1.64922 6.725 1.35469 7.03281C0.836719 7.57187 0.25 8.18438 0.25 9C0.25 9.81562 0.836719 10.4273 1.35469 10.9672C1.64922 11.275 1.95391 11.5922 2.06875 11.8711C2.175 12.1266 2.18125 12.55 2.1875 12.9602C2.19922 13.7227 2.21172 14.5867 2.8125 15.1875C3.41328 15.7883 4.27734 15.8008 5.03984 15.8125C5.45 15.8187 5.87344 15.825 6.12891 15.9313C6.40703 16.0461 6.725 16.3508 7.03281 16.6453C7.57187 17.1633 8.18438 17.75 9 17.75C9.81562 17.75 10.4273 17.1633 10.9672 16.6453C11.275 16.3508 11.5922 16.0461 11.8711 15.9313C12.1266 15.825 12.55 15.8187 12.9602 15.8125C13.7227 15.8008 14.5867 15.7883 15.1875 15.1875C15.7883 14.5867 15.8008 13.7227 15.8125 12.9602C15.8187 12.55 15.825 12.1266 15.9313 11.8711C16.0461 11.593 16.3508 11.275 16.6453 10.9672C17.1633 10.4281 17.75 9.81562 17.75 9C17.75 8.18438 17.1633 7.57266 16.6453 7.03281ZM15.743 10.1023C15.3687 10.493 14.9812 10.8969 14.7758 11.393C14.5789 11.8695 14.5703 12.4141 14.5625 12.9414C14.5547 13.4883 14.5461 14.0609 14.3031 14.3031C14.0602 14.5453 13.4914 14.5547 12.9414 14.5625C12.4141 14.5703 11.8695 14.5789 11.393 14.7758C10.8969 14.9812 10.493 15.3687 10.1023 15.743C9.71172 16.1172 9.3125 16.5 9 16.5C8.6875 16.5 8.28516 16.1156 7.89766 15.743C7.51016 15.3703 7.10313 14.9812 6.60703 14.7758C6.13047 14.5789 5.58594 14.5703 5.05859 14.5625C4.51172 14.5547 3.93906 14.5461 3.69687 14.3031C3.45469 14.0602 3.44531 13.4914 3.4375 12.9414C3.42969 12.4141 3.42109 11.8695 3.22422 11.393C3.01875 10.8969 2.63125 10.493 2.25703 10.1023C1.88281 9.71172 1.5 9.3125 1.5 9C1.5 8.6875 1.88437 8.28516 2.25703 7.89766C2.62969 7.51016 3.01875 7.10313 3.22422 6.60703C3.42109 6.13047 3.42969 5.58594 3.4375 5.05859C3.44531 4.51172 3.45391 3.93906 3.69687 3.69687C3.93984 3.45469 4.50859 3.44531 5.05859 3.4375C5.58594 3.42969 6.13047 3.42109 6.60703 3.22422C7.10313 3.01875 7.50703 2.63125 7.89766 2.25703C8.28828 1.88281 8.6875 1.5 9 1.5C9.3125 1.5 9.71484 1.88437 10.1023 2.25703C10.4898 2.62969 10.8969 3.01875 11.393 3.22422C11.8695 3.42109 12.4141 3.42969 12.9414 3.4375C13.4883 3.44531 14.0609 3.45391 14.3031 3.69687C14.5453 3.93984 14.5547 4.50859 14.5625 5.05859C14.5703 5.58594 14.5789 6.13047 14.7758 6.60703C14.9812 7.10313 15.3687 7.50703 15.743 7.89766C16.1172 8.28828 16.5 8.6875 16.5 9C16.5 9.3125 16.1156 9.71484 15.743 10.1023ZM12.5672 6.68281C12.6253 6.74086 12.6714 6.80979 12.7029 6.88566C12.7343 6.96154 12.7505 7.04287 12.7505 7.125C12.7505 7.20713 12.7343 7.28846 12.7029 7.36434C12.6714 7.44021 12.6253 7.50914 12.5672 7.56719L8.19219 11.9422C8.13414 12.0003 8.06521 12.0464 7.98934 12.0779C7.91346 12.1093 7.83213 12.1255 7.75 12.1255C7.66787 12.1255 7.58654 12.1093 7.51066 12.0779C7.43479 12.0464 7.36586 12.0003 7.30781 11.9422L5.43281 10.0672C5.31554 9.94991 5.24965 9.79085 5.24965 9.625C5.24965 9.45915 5.31554 9.30009 5.43281 9.18281C5.55009 9.06554 5.70915 8.99965 5.875 8.99965C6.04085 8.99965 6.19991 9.06554 6.31719 9.18281L7.75 10.6164L11.6828 6.68281C11.7409 6.6247 11.8098 6.5786 11.8857 6.54715C11.9615 6.5157 12.0429 6.49951 12.125 6.49951C12.2071 6.49951 12.2885 6.5157 12.3643 6.54715C12.4402 6.5786 12.5091 6.6247 12.5672 6.68281Z"
                      fill="#141414"
                    />
                  </svg>
                </div>
                <span className="font-lato text-xs text-pb-500">
                  Vendedor Certificado
                </span>
              </div>

              <div className="flex items-center gap-2 h-5">
                <div className="w-5 h-5">
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 0.75H1.5C1.16848 0.75 0.850537 0.881696 0.616116 1.11612C0.381696 1.35054 0.25 1.66848 0.25 2V12C0.25 12.3315 0.381696 12.6495 0.616116 12.8839C0.850537 13.1183 1.16848 13.25 1.5 13.25H16.5C16.8315 13.25 17.1495 13.1183 17.3839 12.8839C17.6183 12.6495 17.75 12.3315 17.75 12V2C17.75 1.66848 17.6183 1.35054 17.3839 1.11612C17.1495 0.881696 16.8315 0.75 16.5 0.75ZM16.5 2V3.875H1.5V2H16.5ZM16.5 12H1.5V5.125H16.5V12ZM15.25 10.125C15.25 10.2908 15.1842 10.4497 15.0669 10.5669C14.9497 10.6842 14.7908 10.75 14.625 10.75H12.125C11.9592 10.75 11.8003 10.6842 11.6831 10.5669C11.5658 10.4497 11.5 10.2908 11.5 10.125C11.5 9.95924 11.5658 9.80027 11.6831 9.68306C11.8003 9.56585 11.9592 9.5 12.125 9.5H14.625C14.7908 9.5 14.9497 9.56585 15.0669 9.68306C15.1842 9.80027 15.25 9.95924 15.25 10.125ZM10.25 10.125C10.25 10.2908 10.1842 10.4497 10.0669 10.5669C9.94973 10.6842 9.79076 10.75 9.625 10.75H8.375C8.20924 10.75 8.05027 10.6842 7.93306 10.5669C7.81585 10.4497 7.75 10.2908 7.75 10.125C7.75 9.95924 7.81585 9.80027 7.93306 9.68306C8.05027 9.56585 8.20924 9.5 8.375 9.5H9.625C9.79076 9.5 9.94973 9.56585 10.0669 9.68306C10.1842 9.80027 10.25 9.95924 10.25 10.125Z"
                      fill="#141414"
                    />
                  </svg>
                </div>
                <span className="font-lato text-xs text-pb-500">Pagamento Seguro</span>
              </div>
            </div>

            {/* Status do produto */}
            <div className="flex flex-wrap gap-3">
              {product.hasBox && (
                <span className="px-4 py-2 bg-[#EFEFEF] rounded-full font-lato text-sm text-[#141414]">
                  Possui Caixa
                </span>
              )}
              {product.hasDocuments && (
                <span className="px-4 py-2 bg-[#EFEFEF] rounded-full font-lato text-sm text-[#141414]">
                  Possui Documentação
                </span>
              )}
              {product.condition && (
                <span className="px-4 py-2 bg-[#EFEFEF] rounded-full font-lato text-sm text-[#141414]">
                  {product.condition}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div className="mb-16">
          <h2 className="font-erstoria text-2xl text-[#141414] mb-6">Descrição</h2>
          <div className="space-y-4 font-lato text-gray-700 leading-relaxed">
            <p>
              With its limited production run, the {product.brand} {product.model} Ref.{" "}
              {product.reference} stands as an exceptional find for serious collectors.
              This watch features a substantial yet balanced case measuring{" "}
              {product.diameter}mm in diameter, with sapphire crystals on both front and
              back.
            </p>
            <p>
              This coveted timepiece is powered by the {product.movement?.toLowerCase()}{" "}
              {product.caliber} movement with a power reserve of approximately{" "}
              {product.powerReserve} hours.
            </p>
            <p>
              This pre-owned {product.brand} {product.model} is presented in the
              manufacturer&apos;s wooden box, inclusive of papers and accessories.
            </p>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <div className="mb-16">
          <h2 className="font-erstoria text-2xl text-[#141414] mb-8">
            Especificações Técnicas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dados Básicos */}
            <div>
              <h3 className="font-erstoria text-lg text-[#141414] mb-4 pb-2 border-b border-gray-200">
                Dados Básicos
              </h3>
              <div className="space-y-3">
                <DataRow label="Marca" value={product.brand} />
                <DataRow label="Modelo" value={product.model} />
                <DataRow label="Número de referência" value={product.reference} />
                {product.year && (
                  <DataRow label="Ano de fabricação" value={product.year.toString()} />
                )}
                {product.condition && (
                  <DataRow label="Estado" value={product.condition} />
                )}
                {product.gender && <DataRow label="Gênero" value={product.gender} />}
                {product.location && (
                  <DataRow label="Localização" value={product.location} />
                )}
                <DataRow
                  label="Preço"
                  value={`R$ ${product.price.toLocaleString("pt-BR")}`}
                />
                {product.availability && (
                  <DataRow label="Disponibilidade" value={product.availability} />
                )}
              </div>
            </div>

            {/* Movimento */}
            <div>
              <h3 className="font-erstoria text-lg text-[#141414] mb-4 pb-2 border-b border-gray-200">
                Movimento
              </h3>
              <div className="space-y-3">
                {product.movement && (
                  <DataRow label="Movimento" value={product.movement} />
                )}
                {product.caliber && <DataRow label="Calibre" value={product.caliber} />}
                {product.powerReserve && (
                  <DataRow label="Reserva de corda" value={`${product.powerReserve}h`} />
                )}
                {product.jewels && (
                  <DataRow label="Número de rubis" value={product.jewels.toString()} />
                )}
              </div>
            </div>

            {/* Caixa */}
            <div>
              <h3 className="font-erstoria text-lg text-[#141414] mb-4 pb-2 border-b border-gray-200">
                Caixa
              </h3>
              <div className="space-y-3">
                {product.caseMaterial && (
                  <DataRow label="Material da caixa" value={product.caseMaterial} />
                )}
                {product.diameter && (
                  <DataRow label="Diâmetro" value={`${product.diameter}mm`} />
                )}
                {product.waterResistance && (
                  <DataRow label="Estanqueidade" value={product.waterResistance} />
                )}
                {product.bezelMaterial && (
                  <DataRow label="Material da luneta" value={product.bezelMaterial} />
                )}
                {product.crystal && <DataRow label="Vidro" value={product.crystal} />}
                {product.dialColor && (
                  <DataRow label="Mostrador" value={product.dialColor} />
                )}
                {product.dialNumbers && (
                  <DataRow label="Algarismos do mostrador" value={product.dialNumbers} />
                )}
              </div>
            </div>
          </div>

          {/* Bracelete */}
          <div className="mt-8">
            <h3 className="font-erstoria text-lg text-[#141414] mb-4 pb-2 border-b border-gray-200">
              Bracelete
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3">
              {product.strapMaterial && (
                <DataRow label="Material do bracelete" value={product.strapMaterial} />
              )}
              {product.strapColor && (
                <DataRow label="Cor do bracelete" value={product.strapColor} />
              )}
              {product.clasp && <DataRow label="Fecho" value={product.clasp} />}
              {product.claspMaterial && (
                <DataRow label="Material do fecho" value={product.claspMaterial} />
              )}
            </div>
          </div>
        </div>

        {/* Evolução do Valor */}
        <div className="mb-16 p-8 bg-[#FAFAFA] rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-erstoria text-2xl text-[#141414]">Evolução do valor</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-lato text-sm text-gray-600">Desde 24/02/2025</span>
                <span className="font-lato text-lg font-semibold text-green-600">
                  +R$ {priceEvolution.change.toLocaleString("pt-BR")}
                </span>
                <span className="font-lato text-lg font-semibold text-green-600">
                  +{priceEvolution.percentChange}%
                </span>
              </div>
            </div>
          </div>

          {/* Gráfico simplificado */}
          <div className="relative h-64 bg-white rounded-lg p-6">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              {/* Grade de fundo */}
              <line x1="0" y1="0" x2="800" y2="0" stroke="#E5E5E5" strokeWidth="1" />
              <line x1="0" y1="50" x2="800" y2="50" stroke="#E5E5E5" strokeWidth="1" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="#E5E5E5" strokeWidth="1" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="#E5E5E5" strokeWidth="1" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#E5E5E5" strokeWidth="1" />

              {/* Linha do gráfico */}
              <polyline
                points="0,180 200,140 400,100 600,60 800,20"
                fill="none"
                stroke="#D5A60A"
                strokeWidth="3"
              />

              {/* Área abaixo da linha */}
              <polygon
                points="0,180 200,140 400,100 600,60 800,20 800,200 0,200"
                fill="#D5A60A"
                fillOpacity="0.1"
              />
            </svg>
          </div>

          {/* Filtros de tempo */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="px-4 py-2 bg-[#D5A60A] text-white rounded-lg font-lato text-sm">
              Máx.
            </button>
            <button className="px-4 py-2 bg-white text-[#141414] rounded-lg font-lato text-sm hover:bg-gray-100">
              6 mês.
            </button>
            <button className="px-4 py-2 bg-white text-[#141414] rounded-lg font-lato text-sm hover:bg-gray-100">
              3 mês.
            </button>
            <button className="px-4 py-2 bg-white text-[#141414] rounded-lg font-lato text-sm hover:bg-gray-100">
              1 mês.
            </button>
          </div>
        </div>

        {/* Produtos Relacionados / Sugestões */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-erstoria text-2xl text-[#141414]">
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

// Componente auxiliar para linhas de dados
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="font-lato text-sm text-gray-600">{label}:</span>
      <span className="font-lato text-sm text-[#141414] font-medium text-right">
        {value}
      </span>
    </div>
  );
}
