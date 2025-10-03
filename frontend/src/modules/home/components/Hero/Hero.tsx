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
    autoplay: true,
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
      descricao: "Cordial Watches",
      bgColor: "bg-[#141414]",
    },
    {
      nome: "TMG Time gateways",
      logo: "/assets/vend2.svg",
      descricao: "Time gateways",
      bgColor: "bg-[#6B2C2C]",
    },
    {
      nome: "Fist Wear.TM",
      logo: "/assets/vend3.svg",
      descricao: "Fist wear",
      bgColor: "bg-[#2C4A3A]",
    },
    {
      nome: "Linksor Joias",
      logo: "/assets/vend4.svg",
      descricao: "Linksor joias",
      bgColor: "bg-[#1A2638]",
    },
  ];

  const protectionFeatures = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Entrega Segura",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Autenticidade Garantida",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Vendedor Certificado",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Pagamento Seguro",
    },
  ];

  return (
    <div className="mt-5 sm:mt-12">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Banner Slider */}
        <div className="relative">
          <div className="h-[170px] md:h-[518px] overflow-hidden rounded-[16px] md:rounded-[48px]">
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
                  <button className="absolute bottom-8 left-5 md:bottom-32 md:left-22 bg-white hover:bg-gray-50 font-lato text-[#141414] rounded-full flex items-center justify-center gap-2 text-sm md:text-md font-bold transition-colors w-[160px] h-[48px] md:w-[200px] md:h-[56px]">
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
        <section aria-label="Marcas de relógios" className="py-6 md:py-12">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#f7f7f7] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#f7f7f7] to-transparent z-10 pointer-events-none" />

            <div
              className="overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="h-auto md:h-[116px] flex items-center gap-4 md:gap-6 lg:gap-[30px] px-4 md:px-8 min-w-max">
                {marcas.map((marca, index) => (
                  <Link
                    href={marca.href}
                    key={index}
                    className="h-auto md:h-full flex flex-col items-center justify-between gap-2 group transition-all duration-300 hover:scale-105 flex-shrink-0"
                  >
                    <div className="w-12 h-12 md:w-22 md:h-22 bg-[#EFEFEF] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={marca.img}
                        alt={`Logo ${marca.nome}`}
                        width={32}
                        height={32}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <p className="font-erstoria mt-2 text-xs md:text-sm text-[#0F0F0F] text-center font-medium group-hover:text-gray-900 transition-colors whitespace-nowrap">
                      {marca.nome}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sugestões para você */}
        <section
          aria-label="Sugestões de relógios"
          className="mb-8 md:mb-12 mt-[22px] md:mt-0"
        >
          <div className="flex flex-col items-start md:items-center justify-between gap-4 md:flex-row mb-6 md:mb-8">
            <h2 className="font-erstoria text-2xl md:text-[28px] text-slate-900">
              Sugestões para você
            </h2>
            <Link
              href="/relogios"
              className="font-lato text-sm text-[#D5A60A] hover:text-[#C09609] transition-colors font-normal underline"
            >
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sugestoes.map((produto, index) => (
              <div key={index} className="group overflow-hidden transition-all">
                <Link href={`/produto/${index}`} className="block">
                  <div className="aspect-square rounded-lg bg-[#EFEFEF] relative overflow-hidden">
                    <Image
                      src={produto.imagem}
                      alt={`${produto.marca} ${produto.modelo}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="mt-3 md:mt-4 h-auto md:h-[116px] relative">
                  <div className="absolute top-0 right-0 w-auto h-auto flex items-center justify-center">
                    <Image
                      src="/icons/verified-badge.svg"
                      alt="Verified"
                      width={18}
                      height={18}
                      className="md:w-[22px] md:h-[22px]"
                    />
                  </div>
                  <Link href={`/produto/${index}`}>
                    <p className="font-erstoria text-sm md:text-base text-[#D5A60A] leading-[140%] mb-2 md:mb-3">
                      {produto.marca}
                    </p>
                    <h3 className="font-erstoria text-lg md:text-[22px] text-[#141414] font-normal leading-[120%] line-clamp-1">
                      {produto.modelo}
                    </h3>
                    <p className="font-lato text-xs md:text-[15px] font-normal text-gray-400 leading-[120%] mb-3 md:mb-4 line-clamp-1">
                      {produto.descricao}
                    </p>
                    <p className="font-lato text-lg md:text-xl font-medium leading-[120%] text-[#141414]">
                      {produto.preco}
                    </p>
                  </Link>
                  <button
                    className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Adicionar aos favoritos"
                    onClick={e => {
                      e.preventDefault();
                      console.log("Favoritar produto:", produto.modelo);
                    }}
                  >
                    <Image
                      src="/icons/heart-outline.svg"
                      alt="Favoritar"
                      width={20}
                      height={20}
                      className="md:w-[24px] md:h-[24px]"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seguro do Comprador - NOVO */}
        <section aria-label="Seguro do comprador" className="py-[20px] lg:py-[150px]">
          <div className="relative min-h-[400px] md:min-h-[600px]">
            {/*  Desktop */}
            <div className="hidden lg:flex items-center justify-center relative md:min-h-[600px]">
              <Image
                src="/images/hero/watch-box-bg.svg"
                alt="Caixa Rolex com relógio e documentação"
                width={1200}
                height={660}
                className="absolute"
                priority
              />

              {/* Conteúdo - Mobile e Desktop */}
              <div className="flex flex-col justify-center relative z-20 max-w-[500px] ml-auto mr-[88px]">
                <div className="space-y-6 md:space-y-8 relative">
                  <div>
                    <p className="font-erstoria text-[#D5A60A] text-sm mb-3 md:mb-3 tracking-wider">
                      Seguro do comprador
                    </p>
                    <h2 className="font-erstoria text-2xl md:text-3xl lg:text-[52px] text-white leading-[102%] mb-4 md:mb-6">
                      Proteção completa em cada etapa da sua compra
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {protectionFeatures.map((feature, index) => (
                      <div key={index} className="h-[24px] flex items-center gap-2.5">
                        <div className="flex-shrink-0 w-10 h-10 md:w-[24px] md:h-[24px] flex items-center justify-center font-normal text-[#ffffff]">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-lato text-white text-sm md:text-base font-light">
                            {feature.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/*  Mobile */}
            <div>
              <div className="lg:hidden flex items-center justify-center">
                <div className="relative z-10 w-full min-h-[572px]">
                  <Image
                    src="/images/hero/watch-box.svg"
                    alt="Caixa Rolex com relógio e documentação"
                    fill
                    className="object-fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Relógios em Destaque - Largura Total */}
      <section
        aria-label="Relógios em destaque"
        className="bg-[#141414] py-16 md:py-24 px-4"
      >
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <h2 className="font-lato text-2xl md:text-3xl text-center text-[#D5A60A] mb-12 md:mb-22 uppercase tracking-wider">
            Relógios em destaque
          </h2>

          <div className="relative">
            <div className="featured-slider">
              <Slider ref={sliderRef} {...featuredSettings}>
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="px-2 md:px-4">
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

          <div className="flex items-center justify-center gap-4 md:gap-8 mt-6 md:mt-8">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#D5A60A] transition-colors group"
              aria-label="Relógio anterior"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D5A60A] transition-colors"
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

            <div className="text-center min-w-[160px] md:min-w-[200px]">
              <p className="font-erstoria text-white text-xl md:text-2xl mb-2">
                Nautilus
              </p>
              <p className="font-lato text-gray-400 text-sm md:text-base">R$ 76.094,00</p>
            </div>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#D5A60A] transition-colors group"
              aria-label="Próximo relógio"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D5A60A] transition-colors"
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
          <section aria-label="Vendedores destaque" className="py-12 md:py-[150px]">
            <h2 className="font-erstoria text-3xl md:text-[54px] text-[#141414] mb-6 md:mb-8">
              Vendedores destaque
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {vendedores.map((vendedor, index) => (
                <div key={index} className="flex flex-col">
                  <Link
                    href={`/vendedor/${index}`}
                    className={`group ${vendedor.bgColor} rounded-[14px] p-4 md:p-6 text-center hover:opacity-90 transition-opacity relative overflow-hidden min-h-[100px] md:min-h-[126px] flex items-center justify-center mb-3 md:mb-4`}
                  >
                    <div className="absolute top-2 right-2 md:top-2.5 md:right-2.5 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                      <Image
                        src="/icons/verified-badge.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                        className="md:w-[20px] md:h-[20px]"
                      />
                    </div>

                    <Image
                      src={vendedor.logo}
                      alt={vendedor.nome}
                      width={100}
                      height={50}
                      className="md:w-[120px] md:h-[60px] object-contain max-h-[50px] md:max-h-[60px]"
                    />
                  </Link>

                  <p className="font-erstoria text-base md:text-[20px] text-[#000000]">
                    {vendedor.descricao}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 md:mt-8">
              <Link
                href="/vendedores"
                className="font-lato text-sm md:text-base text-[#D5A60A] hover:text-[#C09609] transition-colors font-medium"
              >
                Ver todos vendedores
              </Link>
            </div>
          </section>

          {/* Torne-se um Vendedor */}
          <section
            aria-label="Torne-se um vendedor"
            className="mb-12 md:mb-[150px] rounded-[16px] md:rounded-[24px] overflow-hidden relative h-[400px] md:h-[580px] xl:h-[680px]"
          >
            <Image
              src="/images/hero/become-seller.svg"
              alt="Torne-se um vendedor"
              fill
              className="object-cover"
              priority
            />

            <div className="relative z-10 h-full flex items-end justify-start md:justify-end p-5 md:p-0">
              <div className="bg-[#F7F7F7]/95 md:bg-transparent max-w-[374px] md:mr-8 lg:mr-16 mb-8 md:mb-[56px] p-5 md:p-0 rounded-lg md:rounded-none">
                <h2 className="font-erstoria text-2xl md:text-3xl lg:text-5xl mb-3 md:mb-4 text-[#141414]">
                  Torne-se
                  <br />
                  um <span className="text-[#D5A60A]">vendedor</span>
                </h2>
                <p className="font-lato text-sm md:text-base text-[#777777] mb-6 md:mb-8 leading-[140%] max-w-[374px]">
                  Oferecemos uma plataforma segura, elegante e com visibilidade
                  internacional para que você possa vender suas peças com confiança.
                </p>
                <Link
                  href="/vender"
                  className="inline-flex items-center justify-center gap-2 bg-[#141414] hover:bg-[#C09609] text-white font-lato font-bold rounded-full px-6 py-3 md:px-8 md:py-4 transition-colors text-sm md:text-base"
                >
                  Comece a vender
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D5A60A"
                    strokeWidth="2"
                    className="w-5 h-5 md:w-[26px] md:h-[26px]"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Como Funciona */}
          <section aria-label="Como funciona" className="py-12 md:py-[124px]">
            <div className="text-center mb-12 md:mb-[64px] flex flex-col items-center px-4">
              <p className="font-erstoria text-base md:text-[20px] text-[#D5A60A] text-center mb-3 md:mb-4">
                Como funciona
              </p>
              <h2 className="font-erstoria text-center text-2xl md:text-3xl lg:text-5xl max-w-[707px]">
                Entregamos com segurança e garantia de qualidade
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#D5A60A]"
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
                <h3 className="font-erstoria text-lg md:text-xl mb-2">
                  Você escolhe o seu relógio
                </h3>
                <p className="font-lato text-gray-600 text-sm">
                  Explore nossa coleção e encontre o relógio perfeito para você.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#D5A60A]"
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
                <h3 className="font-erstoria text-lg md:text-xl mb-2">
                  Realiza o pagamento
                </h3>
                <p className="font-lato text-gray-600 text-sm">
                  Finalize sua compra com segurança e diversas opções de pagamento.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#D5A60A]"
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
                <h3 className="font-erstoria text-lg md:text-xl mb-2">
                  Vendedor envia o relógio
                </h3>
                <p className="font-lato text-gray-600 text-sm">
                  O vendedor despacha seu relógio com cuidado e segurança.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#D5A60A]"
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
                <h3 className="font-erstoria text-lg md:text-xl mb-2">
                  Certificamos a autenticidade
                </h3>
                <p className="font-lato text-gray-600 text-sm">
                  Nosso time de especialistas verifica cada detalhe para garantir a
                  originalidade.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#D5A60A]"
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
                <h3 className="font-erstoria text-lg md:text-xl mb-2">
                  Seu relógio é entregue
                </h3>
                <p className="font-lato text-gray-600 text-sm">
                  Receba seu relógio com toda a segurança e proteção que você merece.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#D5A60A]"
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
                <h3 className="font-erstoria text-lg md:text-xl mb-2">
                  Vendedor recebe o valor
                </h3>
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
