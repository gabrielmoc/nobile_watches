"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Slider from "react-slick";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const sliderRef = useRef<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: process.env.NODE_ENV !== "development",
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const featuredSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const marcas = [
    { img: "/assets/marca1.svg", nome: "Rolex", href: "/marcas/rolex" },
    { img: "/assets/marca2.svg", nome: "Tag Heuer", href: "/marcas/tag-heuer" },
    { img: "/assets/marca3.svg", nome: "Breitling", href: "/marcas/breitling" },
    {
      img: "/assets/marca4.svg",
      nome: "Audemars Piguet",
      href: "/marcas/audemars-piguet",
    },
    { img: "/assets/marca5.svg", nome: "Patek Philippe", href: "/marcas/patek-philippe" },
    { img: "/assets/marca6.svg", nome: "Hublot", href: "/marcas/hublot" },
    { img: "/assets/marca7.svg", nome: "Cartier", href: "/marcas/cartier" },
    { img: "/assets/marca8.svg", nome: "Seiko", href: "/marcas/seiko" },
    { img: "/assets/marca9.svg", nome: "Omega", href: "/marcas/omega" },
    { img: "/assets/marca10.svg", nome: "IWC", href: "/marcas/iwc" },
    // { img: "/assets/marca11.svg", nome: "Panerai", href: "/marcas/panerai" },
    // { img: "/assets/marca12.svg", nome: "Tissot", href: "/marcas/tissot" },
  ];

  const sugestoes = [
    {
      marca: "Rolex",
      modelo: "GMT-Master II",
      descricao: "40mm Stainless Steel Bl...",
      preco: "R$ 75.300",
      imagem: "/images/hero/sugestao1.svg",
    },
    {
      marca: "Hublot",
      modelo: "Classic Fusion",
      descricao: "581.NX.7071.LR Quart...",
      preco: "R$ 75.300",
      imagem: "/images/hero/sugestao2.svg",
    },
    {
      marca: "Omega",
      modelo: "De Ville Prestige",
      descricao: "Chronometer C.O.S.C. Au...",
      preco: "R$ 75.300",
      imagem: "/images/hero/sugestao3.svg",
    },
    {
      marca: "Audemars Piguet",
      modelo: "Royal Oak Offsho...",
      descricao: "25940OK.OO.D002CA.01",
      preco: "R$ 75.300",
      imagem: "/images/hero/sugestao4.svg",
    },
  ];

  const vendedores = [
    {
      nome: "Cordial Watches",
      logo: "/assets/vend1.svg",
      descricao: "Vendedor verificado",
    },
    {
      nome: "TMG Time gateways",
      logo: "/assets/vend2.svg",
      descricao: "Vendedor verificado",
    },
    {
      nome: "Fist Wear.TM",
      logo: "/assets/vend3.svg",
      descricao: "Vendedor verificado",
    },
    {
      nome: "Linksor Joias",
      logo: "/assets/vend4.svg",
      descricao: "Vendedor verificado",
    },
  ];

  return (
    <div className="mt-5 sm:mt-12">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        {/* Banner Slider */}
        <div className="relative">
          <div className="h-[222px] md:h-[518px] overflow-hidden rounded-[16px] md:rounded-[48px]">
            <Slider {...bannerSettings}>
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="h-full relative">
                  <Link href={`/promocoes/banner-${num}`} className="block h-full">
                    <Image
                      src={`/assets/banner${num}.svg`}
                      alt={`Promoção ${num}`}
                      className="w-full h-full object-cover rounded-[16px] md:rounded-[48px]"
                      width={1200}
                      height={518}
                      priority={num === 1}
                    />
                  </Link>
                  <button className="absolute bottom-32 left-22 bg-white hover:bg-gray-50 font-lato text-[#141414] rounded-full flex items-center justify-center gap-2 text-md font-bold transition-colors w-[200px] h-[56px]">
                    Garanta o seu
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D5A60A"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Marcas */}
        <section aria-label="Marcas de relógios" className="my-8 md:my-12">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-6 lg:gap-8 py-0">
            {marcas.map((marca, index) => (
              <Link
                href={marca.href}
                key={index}
                className="flex flex-col items-center justify-center group transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 bg-[#EFEFEF] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={marca.img}
                    alt={`Logo ${marca.nome}`}
                    width={32}
                    height={32}
                    className="md:w-10 md:h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <p className="font-erstoria mt-2 text-sm md:text-sm text-gray-600 text-center font-medium group-hover:text-gray-900 transition-colors">
                  {marca.nome}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Sugestões para você */}
        <section aria-label="Sugestões de relógios" className="mb-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-8">
            <h2 className="font-erstoria text-[28px] text-slate-900 sm:text-[28px]">
              Sugestões para você
            </h2>
            <Link
              href="/relogios"
              className="font-lato text-[#D5A60A] hover:text-[#C09609] transition-colors font-medium"
            >
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sugestoes.map((produto, index) => (
              <Link
                key={index}
                href={`/produto/${index}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-[#F7F7F7] relative overflow-hidden">
                  <Image
                    src={produto.imagem}
                    alt={`${produto.marca} ${produto.modelo}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-lato text-sm text-gray-500 mb-1">{produto.marca}</p>
                  <h3 className="font-erstoria text-lg text-[#141414] mb-1 line-clamp-1">
                    {produto.modelo}
                  </h3>
                  <p className="font-lato text-sm text-gray-400 mb-3 line-clamp-1">
                    {produto.descricao}
                  </p>
                  <p className="font-lato text-xl font-bold text-[#141414]">
                    {produto.preco}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Seguro do Comprador */}
        <section aria-label="Seguro do comprador" className="my-22">
          <Image
            src="/images/hero/prot-dsk.png"
            alt="Proteção completa na compra com seguro e garantia de autenticidade"
            width={1300}
            height={500}
          />
        </section>
      </div>

      {/* Relógios em Destaque - Largura Total */}
      <section aria-label="Relógios em destaque" className="bg-[#141414] py-24 px-4">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <h2 className="font-lato text-3xl text-center text-[#D5A60A] mb-22 uppercase tracking-wider">
            Relógios em destaque
          </h2>

          <div className="relative">
            <div className="featured-slider">
              <Slider ref={sliderRef} {...featuredSettings}>
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="px-4">
                    <div className="relative aspect-square max-w-md mx-auto">
                      <Image
                        src={`/images/hero/featured-watch${num}.svg`}
                        alt={`Relógio em destaque ${num}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Info with navigation arrows */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#D5A60A] transition-colors group"
              aria-label="Relógio anterior"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-[#D5A60A] transition-colors"
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

            <div className="text-center min-w-[200px]">
              <p className="font-erstoria text-white text-2xl mb-2">Nautilus</p>
              <p className="font-lato text-gray-400">R$ 76.094,00</p>
            </div>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#D5A60A] transition-colors group"
              aria-label="Próximo relógio"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-[#D5A60A] transition-colors"
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

          {/* Custom dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3, 4].map(index => (
              <button
                key={index}
                onClick={() => sliderRef.current?.slickGoTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-[#D5A60A] w-8"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Ir para relógio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          {/* Vendedores Destaque */}
          <section aria-label="Vendedores destaque" className="py-[150px]">
            <h2 className="font-erstoria text-5xl mb-8">Vendedores destaque</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {vendedores.map((vendedor, index) => (
                <Link
                  key={index}
                  href={`/vendedor/${index}`}
                  className="group bg-[#141414] rounded-2xl p-6 text-center hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                    <Image
                      src={vendedor.logo}
                      alt={vendedor.nome}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-lato text-white font-medium mb-1">
                    {vendedor.nome}
                  </h3>
                  <p className="font-lato text-sm text-gray-400">{vendedor.descricao}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/vendedores"
                className="font-lato text-[#D5A60A] hover:text-[#C09609] transition-colors font-medium"
              >
                Ver todos vendedores
              </Link>
            </div>
          </section>

          {/* Torne-se um Vendedor */}
          <section
            aria-label="Torne-se um vendedor"
            className="mb-[150px] rounded-[24px] overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center bg-[#F7F7F7]">
              <div className="flex-1 relative h-[300px] md:h-[400px] w-full">
                <Image
                  src="/images/hero/become-seller.svg"
                  alt="Torne-se um vendedor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-8 md:p-12">
                <h2 className="font-erstoria text-3xl md:text-5xl mb-4">
                  Torne-se
                  <br />
                  um <span className="text-[#D5A60A]">vendedor</span>
                </h2>
                <p className="font-lato text-gray-400 mb-6 leading-[140%] max-w-[374px] ">
                  Oferecemos uma plataforma segura, elegante e com visibilidade
                  internacional para que você possa vender suas peças com confiança.
                </p>
                <Link
                  href="/vender"
                  className="inline-flex items-center justify-center gap-2 bg-[#141414] hover:bg-[#C09609] text-white font-lato font-bold rounded-full px-8 py-4 transition-colors"
                >
                  Comece a vender
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D5A60A"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Como Funciona */}
          <section aria-label="Como funciona" className="py-[124px]">
            <div className="text-center mb-[64px] flex flex-col items-center">
              <p className="font-erstoria text-[20px] text-[#D5A60A] text-center mb-4">
                Como funciona
              </p>
              <h2 className="font-erstoria  text-center text-3xl md:text-5xl max-w-[707px]">
                Entregamos com segurança e garantia de qualidade
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#D5A60A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-erstoria text-xl mb-2">Você escolhe o seu relógio</h3>
                <p className="font-lato text-gray-600 text-sm">
                  Explore nossa coleção e encontre o relógio perfeito para você.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#D5A60A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-erstoria text-xl mb-2">Realiza o pagamento</h3>
                <p className="font-lato text-gray-600 text-sm">
                  Finalize sua compra com segurança e diversas opções de pagamento.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#D5A60A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="font-erstoria text-xl mb-2">Vendedor envia o relógio</h3>
                <p className="font-lato text-gray-600 text-sm">
                  O vendedor despacha seu relógio com cuidado e segurança.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#D5A60A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-erstoria text-xl mb-2">
                  Certificamos a autenticidade
                </h3>
                <p className="font-lato text-gray-600 text-sm">
                  Nosso time de especialistas verifica cada detalhe para garantir a
                  originalidade.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#D5A60A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h3 className="font-erstoria text-xl mb-2">Seu relógio é entregue</h3>
                <p className="font-lato text-gray-600 text-sm">
                  Receba seu relógio com toda a segurança e proteção que você merece.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#D5A60A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-erstoria text-xl mb-2">Vendedor recebe o valor</h3>
                <p className="font-lato text-gray-600 text-sm">
                  O pagamento é liberado ao vendedor após a confirmação da entrega.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
