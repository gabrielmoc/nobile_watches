"use client";

import { FilterOptions } from "@/types/mock";
import { useState } from "react";

interface FilterSidebarProps {
  filterOptions: FilterOptions;
}

export function FilterSidebar({ filterOptions }: FilterSidebarProps) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCaseMaterials, setSelectedCaseMaterials] = useState<string[]>([]);
  const [selectedStrapMaterials, setSelectedStrapMaterials] = useState<string[]>([]);
  const [selectedDialColors, setSelectedDialColors] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filterOptions.priceRange.min,
    filterOptions.priceRange.max,
  ]);

  const handleClearFilters = () => {
    setSelectedLocation("");
    setSelectedBrands([]);
    setSelectedCaseMaterials([]);
    setSelectedStrapMaterials([]);
    setSelectedDialColors([]);
    setVerifiedOnly(false);
    setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
  };

  const otherBrands = [
    "Aurelia Timepieces",
    "ChronoCraft",
    "Tempus Lux",
    "Elysian Watches",
    "Stellar Timeworks",
    "Noble Chronometers",
    "Celestial Timepieces",
  ];

  const caseMaterials = [
    "Elegant Oak Wood Boxes",
    "Satin Finish Cases",
    "Polished Mahogany Holders",
    "Sturdy Bamboo Containers",
    "Chic Leather Pouches",
    "Artisan Crafted Maple Boxes",
  ];

  const strapMaterials = [
    "Elegant Oak Wood Boxes",
    "Satin Finish Cases",
    "Polished Mahogany Holders",
    "Sturdy Bamboo Containers",
    "Chic Leather Pouches",
    "Artisan Crafted Maple Boxes",
  ];

  const dialColors = [
    "Deep Walnut",
    "Shiny Jet Black",
    "Polished Maple",
    "Luxurious Ruby",
  ];

  return (
    <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Localização */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">Localização</h3>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="w-full h-12 px-4 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5A60A] focus:border-[#D5A60A] transition-colors bg-white font-lato text-sm"
          >
            <option value="">Selecione...</option>
            <option value="sp">São Paulo</option>
            <option value="rj">Rio de Janeiro</option>
            <option value="mg">Minas Gerais</option>
          </select>
        </div>

        {/* Principais Marcas */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">Principais marcas</h3>
          <div className="space-y-2">
            {filterOptions.brands.slice(0, 5).map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand));
                    }
                  }}
                  className="w-4 h-4 text-[#D5A60A] border-gray-300 rounded focus:ring-[#D5A60A]"
                />
                <span className="font-lato text-sm text-[#141414] group-hover:text-[#D5A60A] transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Outras Marcas */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">Outras marcas</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {otherBrands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D5A60A] border-gray-300 rounded focus:ring-[#D5A60A]"
                />
                <span className="font-lato text-sm text-[#141414] group-hover:text-[#D5A60A] transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Material da Caixa */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">Material da caixa</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {caseMaterials.map(material => (
              <label
                key={material}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D5A60A] border-gray-300 rounded focus:ring-[#D5A60A]"
                />
                <span className="font-lato text-sm text-[#141414] group-hover:text-[#D5A60A] transition-colors">
                  {material}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Vendedores Verificados */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={e => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 text-[#D5A60A] border-gray-300 rounded focus:ring-[#D5A60A]"
            />
            <span className="font-erstoria text-lg text-[#141414] group-hover:text-[#D5A60A] transition-colors">
              Vendedores verificados
            </span>
          </label>
        </div>

        {/* Material da Pulseira */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">
            Material da pulseira
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {strapMaterials.map(material => (
              <label
                key={material}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D5A60A] border-gray-300 rounded focus:ring-[#D5A60A]"
                />
                <span className="font-lato text-sm text-[#141414] group-hover:text-[#D5A60A] transition-colors">
                  {material}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cor do Mostrador */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">Cor do mostrador</h3>
          <div className="space-y-2">
            {dialColors.map(color => (
              <label key={color} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D5A60A] border-gray-300 rounded focus:ring-[#D5A60A]"
                />
                <span className="font-lato text-sm text-[#141414] group-hover:text-[#D5A60A] transition-colors">
                  {color}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Faixa de Valor */}
        <div>
          <h3 className="font-erstoria text-lg text-[#141414] mb-3">Faixa de valor</h3>
          <div className="space-y-4">
            <input
              type="range"
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D5A60A]"
            />
            <div className="flex justify-between text-sm font-lato text-gray-400">
              <span>R$ {priceRange[0].toLocaleString("pt-BR")}</span>
              <span>R$ {priceRange[1].toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </div>

        {/* Botão Limpar Filtros */}
        <button
          onClick={handleClearFilters}
          className="w-full h-12 border-2 border-[#D5A60A] text-[#D5A60A] rounded-full font-lato font-bold text-sm hover:bg-[#D5A60A] hover:text-white transition-colors"
        >
          Limpar filtros
        </button>
      </div>
    </aside>
  );
}
