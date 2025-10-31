"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";

const watches = [
  { name: "Nautilus", price: "R$ 76.094,00", image: "/images/mock/nautilus.png" },
  { name: "Claratrava", price: "R$ 54.094,00", image: "/images/mock/claratrava.png" },
  { name: "Aquanaut", price: "R$ 62.890,00", image: "/images/mock/aquanaut.png" },
  { name: "Complications", price: "R$ 84.990,00", image: "/images/mock/claratrava.png" },
  { name: "Golden Ellipse", price: "R$ 71.450,00", image: "/images/mock/aquanaut.png" },
];

// Custom arrows
function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-60 bottom-8 md:bottom-12 lg:bottom-16 z-20 w-[46px] h-[46px] rounded-full bg-white/10 backdrop-blur-sm hidden lg:flex items-center justify-center hover:scale-110 transition-transform group border border-white/20"
      aria-label="Anterior"
    >
      <Image
        src="/icons/arrow-left-glow.png"
        alt="Anterior"
        width={46}
        height={46}
        className="w-full h-full"
      />
    </button>
  );
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-60 bottom-8 md:bottom-12 lg:bottom-16 z-20 w-[46px] h-[46px] rounded-full bg-white/10 backdrop-blur-sm hidden lg:flex items-center justify-center hover:scale-110 transition-transform group border border-white/20"
      aria-label="Próximo"
    >
      <Image
        src="/icons/arrow-right-glow.png"
        alt="Próximo"
        width={46}
        height={46}
        className="w-full h-full"
      />
    </button>
  );
}

export default function FeaturedWatches() {
  const [centerSlide, setCenterSlide] = useState(1);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    speed: 500,
    initialSlide: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => setCenterSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <section className="w-full bg-[#141414] py-12 lg:py-16 relative overflow-hidden lg:min-h-screen lg:flex flex-col justify-center">
      <div className="flex items-center justify-center relative w-[182px] lg:w-[363px] h-[21px] lg:h-[41px] mx-auto mb-8 md:mb-12">
        <Image
          src="/images/hero/destaques.svg"
          alt="Relógios em destaque"
          fill
          className="object-cover"
        />
        <h2 className="font-lato text-xs lg:text-[26px] text-center text-[#D5A60A] font-bold uppercase">
          Relógios em destaque
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl px-4 md:px-8 min-h-[450px] md:min-h-[500px] lg:min-h-[650px] mx-auto flex items-center">
        <Slider ref={sliderRef} {...settings} className="featured-watches-slider w-full">
          {watches.map((watch, index) => {
            const isCenter = index === centerSlide % watches.length;

            return (
              <div key={watch.name} className="px-4 md:px-6 lg:px-8">
                <div className="relative flex flex-col items-center justify-center h-full min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
                  {/* Container do relógio com transição */}
                  <div
                    className={`relative transition-all duration-700 ease-in-out h-48 md:h-56 lg:h-64 flex items-center justify-center ${
                      isCenter
                        ? "scale-120 opacity-100"
                        : "scale-75 opacity-40 md:scale-85 md:opacity-50"
                    }`}
                  >
                    {/* Círculo brilhante atrás do relógio central */}
                    {isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px]">
                          <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 via-white/5 to-transparent blur-2xl" />
                          <div className="absolute inset-8 rounded-full bg-gradient-radial from-white/10 via-transparent to-transparent" />
                          {/* <Image 
                            src="/images/glow-circle.png" 
                            alt="" 
                            fill 
                            className="object-contain"
                          /> */}
                        </div>
                      </div>
                    )}

                    {/* Imagem do relógio */}
                    <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-78">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 768px) 80vw, 40vw"
                        priority={isCenter}
                      />
                    </div>
                  </div>

                  {/* Nome e preço - sempre reserva espaço, mas só visível no centro */}
                  <div
                    className={`mt-4 md:mt-6 text-center transition-opacity duration-500 h-20 lg:h-40 flex flex-col justify-center ${
                      isCenter ? "opacity-100 animate-fadeIn" : "opacity-0"
                    }`}
                  >
                    <h3 className="text-xl md:text-2xl lg:text-[32px] font-light text-white tracking-[-1%] mb-1 text-nowrap">
                      {watch.name}
                    </h3>
                    <p className="text-base md:text-lg lg:text-[24px] text-white font-light tracking-tight leading-2 text-nowrap">
                      {watch.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2">
        {watches.map((_, index) => {
          const isActive = index === centerSlide % watches.length;
          return (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`rounded-full transition-all duration-300 ${
                isActive ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          );
        })}
      </div>

      {/* CSS adicional para o slider */}
      <style jsx global>{`
        .featured-watches-slider .slick-track {
          display: flex !important;
          align-items: center !important;
        }

        .featured-watches-slider .slick-slide {
          height: auto !important;
        }

        .featured-watches-slider .slick-slide > div {
          height: 100%;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
