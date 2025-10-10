"use client";

import { FilterOptions } from "@/types/mock";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
}

export function FilterModal({ isOpen, onClose, filterOptions }: FilterModalProps) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filterOptions.priceRange.min,
    filterOptions.priceRange.max,
  ]);

  // Previne scroll da página quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClearFilters = () => {
    setSelectedLocation("");
    setSelectedBrands([]);
    setVerifiedOnly(false);
    setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
    onClose(); // Fecha o modal após limpar os filtros
  };

  const handleApplyFilters = () => {
    // TODO: Aplicar filtros
    onClose();
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  if (!isOpen) return null;

  const otherBrands = [
    "Aurelia Timepieces",
    "ChronoCraft",
    "Tempus Lux",
    "Elysian Watches",
    "Vanguard Horology",
    "Stellar Timeworks",
    "Noble Chronometers",
    "Celestial Timepieces",
  ];

  const caseMaterials = [
    "Elegant Oak Wood Boxes",
    "Satin Finish Cases",
    "Polished Mahogany Holders",
    "Luxurious Velvet Wraps",
    "Sturdy Bamboo Containers",
    "Chic Leather Pouches",
    "Artisan Crafted Maple Boxes",
    "Stylish Aluminum Cases",
  ];

  // Marcas principais com logos reais
  const mainBrands = [
    { name: "Rolex", logo: "/assets/marca1.svg" },
    { name: "Tag Heuer", logo: "/assets/marca2.svg" },
    { name: "Breitling", logo: "/assets/marca3.svg" },
    { name: "Audemars Piguet", logo: "/assets/marca4.svg" },
    { name: "Patek Philippe", logo: "/assets/marca5.svg" },
    { name: "Hublot", logo: "/assets/marca6.svg" },
    { name: "Cartier", logo: "/assets/marca7.svg" },
    { name: "Seiko", logo: "/assets/marca8.svg" },
  ];

  const activeFiltersCount = selectedBrands.length;

  return (
    <div className="fixed inset-0 z-250 overflow-hidden">
      {/* Backdrop mais suave */}
      <div
        className="absolute inset-0 bg-black/20 transition-opacity"
        onClick={onClose}
      />

      {/* Modal - largura fixa de 504px */}
      <div className="absolute inset-0 flex items-stretch justify-center p-0">
        <div className="relative w-full max-w-[504px] bg-white flex flex-col h-full shadow-2xl overflow-hidden">
          {/* Header fixo */}
          <div className="flex-shrink-0 flex items-center justify-between px-[48px] pt-[38px] pb-[30px]">
            <h2 className="font-erstoria text-[24px] leading-none text-[#141414]">
              Filtros
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Fechar"
            >
              <Image src="/icons/XSquare.svg" alt="Fechar" width={32} height={32} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-[48px] py-2 space-y-8">
            {/* Principais Marcas - Com Logos Reais */}
            <div>
              <h3 className="font-lato text-sm text-[#141414] mb-4">Principais marcas</h3>
              <div className="grid grid-cols-4 gap-[22px]">
                {mainBrands.map((brand, index) => (
                  <button
                    key={`${brand.name}-${index}`}
                    className={`w-[85px] h-[89px] flex flex-col items-center gap-2 transition-all`}
                    //  className={`w-[85px] h-[89px] flex flex-col items-center gap-2 transition-all ${
                    //   selectedBrands.includes(brand.name)
                    //     ? "opacity-100"
                    //     : "opacity-70 hover:opacity-100"
                    // }`}
                    onClick={() => toggleBrand(brand.name)}
                  >
                    <div
                      className={`w-[64px] h-[64px] rounded-full flex items-center justify-center transition-all ${
                        selectedBrands.includes(brand.name)
                          ? "bg-[#FFF9E6] border-2 border-[#D5A60A]"
                          : "bg-[#EFEFEF] border-2 border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain hover:grayscale-0 hover:opacity-100 transition-all"
                          // style={{
                          //   filter: selectedBrands.includes(brand.name)
                          //     ? "grayscale(0)"
                          //     : "grayscale(1)",
                          //   opacity: selectedBrands.includes(brand.name) ? 1 : 0.6,
                          // }}
                        />
                      </div>
                    </div>
                    <span className="font-erstoria text-[12px] text-[#0F0F0F] text-center leading-[140%] tracking-[-1%] whitespace-nowrap">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outras Marcas - Botões */}
            <div>
              <h3 className="font-lato text-sm text-[#141414] mb-4">Outras marcas</h3>
              <div className="flex flex-wrap gap-3">
                {otherBrands.map(brand => (
                  <button
                    key={brand}
                    className={`px-4 py-2.5 rounded-[4px] border transition-all font-lato text-sm ${
                      selectedBrands.includes(brand)
                        ? "border-[#D5A60A] bg-[#FFF9E6] text-[#D5A60A]"
                        : "border-gray-300 text-[#141414] hover:border-gray-400 bg-white"
                    }`}
                    onClick={() => toggleBrand(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Faixa de Valor */}
            <div>
              <h3 className="font-lato text-sm text-[#141414] mb-6">Faixa de valor</h3>
              <div className="space-y-5">
                <div className="relative px-1">
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={priceRange[1]}
                    onChange={e =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D5A60A] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D5A60A] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
                <div className="flex justify-between px-1">
                  <span className="font-lato text-lg text-[#D5A60A] font-medium">
                    R$ {priceRange[0].toLocaleString("pt-BR")}
                  </span>
                  <span className="font-lato text-lg text-[#D5A60A] font-medium">
                    R$ {priceRange[1].toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Material da Caixa */}
            <div>
              <h3 className="font-lato text-sm text-[#141414] mb-4">Material da caixa</h3>
              <div className="flex flex-wrap gap-3">
                {caseMaterials.map(material => (
                  <button
                    key={material}
                    className="px-4 py-2.5 rounded-[4px] border border-gray-300 text-[#141414] hover:border-gray-400 transition-all font-lato text-sm bg-white"
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>

            {/* Espaço extra no final para scroll confortável */}
            <div className="h-4" />
          </div>

          {/* Footer - Botões de Ação fixos */}
          <div className="flex-shrink-0 px-8 py-6 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <button
                onClick={handleClearFilters}
                className="flex-1 h-13 border-none text-[#141414] tracking-[2%] rounded-full font-lato font-bold text-base hover:bg-[#FFF9E6] transition-colors"
              >
                Limpar ({activeFiltersCount}) filtros
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 h-13 bg-[#D5A60A] text-white tracking-[2%] rounded-full font-lato font-bold text-base hover:bg-[#C09609] transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={activeFiltersCount === 0}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
