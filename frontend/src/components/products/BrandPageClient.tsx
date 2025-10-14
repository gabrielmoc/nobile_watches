"use client";

import { FilterModal } from "@/components/products/FilterModal";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterOptions, Product } from "@/types/mock";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BrandPageClientProps {
  brandName: string;
  products: Product[];
  filterOptions: FilterOptions;
}

type ViewMode = "grid" | "list";

export function BrandPageClient({
  brandName,
  products,
  filterOptions,
}: BrandPageClientProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const sortOptions = [
    { value: "relevance", label: "Mais relevantes" },
    { value: "price-asc", label: "Menor preço" },
    { value: "price-desc", label: "Maior preço" },
    { value: "newest", label: "Mais recentes" },
    { value: "oldest", label: "Mais antigos" },
  ];

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsSortDropdownOpen(false);
    // TODO: Implementar lógica de ordenação
  };

  // Fecha o dropdown ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSortDropdownOpen(false);
      }
    };

    if (isSortDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isSortDropdownOpen]);

  return (
    <>
      <div className="min-h-screen bg-white brand">
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

            {/* Header com título e controles */}
            <div className="">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h1 className="font-erstoria text-3xl md:text-[32px] text-[#141414]">
                    {brandName}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botão de ordenação - Mobile */}
                  <div className="relative">
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="md:hidden flex items-center justify-center w-11 h-11 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Ordenar"
                      aria-label="Ordenar produtos"
                    >
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
                          d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                        />
                      </svg>
                    </button>

                    {/* Dropdown de ordenação - Mobile */}
                    {isSortDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsSortDropdownOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {sortOptions.map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleSortChange(option.value)}
                              className={`w-full text-left px-4 py-2.5 font-lato text-sm transition-colors flex items-center justify-between ${
                                sortBy === option.value
                                  ? "bg-[#FFF9E6] text-[#D5A60A] font-medium"
                                  : "text-[#141414] hover:bg-gray-50"
                              }`}
                            >
                              <span>{option.label}</span>
                              {sortBy === option.value && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Botão de alternância de visualização - Mobile */}
                  <button
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    className="md:hidden flex items-center justify-center w-11 h-11 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title={
                      viewMode === "grid" ? "Alternar para lista" : "Alternar para grade"
                    }
                    aria-label={
                      viewMode === "grid"
                        ? "Alternar para visualização em lista"
                        : "Alternar para visualização em grade"
                    }
                  >
                    {viewMode === "grid" ? (
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
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
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
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Botão Filtros */}
                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center justify-center w-[44px] h-[44px] bg-[#D5A60A] rounded-lg cursor-pointer"
                    title="Abrir filtros"
                  >
                    <svg
                      width="28"
                      height="14"
                      viewBox="0 0 28 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 7C23 7.26522 22.8946 7.51957 22.7071 7.70711C22.5196 7.89464 22.2652 8 22 8H6C5.73478 8 5.48043 7.89464 5.29289 7.70711C5.10536 7.51957 5 7.26522 5 7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H22C22.2652 6 22.5196 6.10536 22.7071 6.29289C22.8946 6.48043 23 6.73478 23 7ZM27 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H27C27.2652 2 27.5196 1.89464 27.7071 1.70711C27.8946 1.51957 28 1.26522 28 1C28 0.734784 27.8946 0.48043 27.7071 0.292893C27.5196 0.105357 27.2652 0 27 0ZM17 12H11C10.7348 12 10.4804 12.1054 10.2929 12.2929C10.1054 12.4804 10 12.7348 10 13C10 13.2652 10.1054 13.5196 10.2929 13.7071C10.4804 13.8946 10.7348 14 11 14H17C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-lato text-[#141414] text-sm md:text-base font-bold">
                  {products.length.toLocaleString("pt-BR")} anúncios
                </p>
              </div>
            </div>

            {/* Ações rápidas - Desktop */}
            <div className="hidden md:flex items-center justify-between pb-0">
              <div className="flex items-center gap-6">
                <button
                  className="flex items-center justify-center gap-3 h-[50px] pr-[20px] pl-[14px] bg-[#F7F7F7] border border-[#EFEFEF] text-[12px] font-medium leading-[148%] rounded-xl hover:opacity-80 transition-opacity"
                  title="Minha coleção"
                >
                  <svg
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.1252 12C17.1249 10.7244 16.8241 9.46689 16.2471 8.32929C15.6701 7.19169 14.8331 6.20605 13.8041 5.45227L13.1704 1.96055C13.1026 1.58594 12.9054 1.24702 12.6132 1.00294C12.3211 0.758857 11.9525 0.625098 11.5718 0.625H6.42867C6.04797 0.625098 5.67938 0.758857 5.38723 1.00294C5.09507 1.24702 4.89788 1.58594 4.83007 1.96055L4.19632 5.45227C3.16703 6.2058 2.32988 7.19138 1.75281 8.32903C1.17574 9.46668 0.875 10.7244 0.875 12C0.875 13.2756 1.17574 14.5333 1.75281 15.671C2.32988 16.8086 3.16703 17.7942 4.19632 18.5477L4.83007 22.0395C4.89788 22.4141 5.09507 22.753 5.38723 22.9971C5.67938 23.2411 6.04797 23.3749 6.42867 23.375H11.5718C11.9525 23.3749 12.3211 23.2411 12.6132 22.9971C12.9054 22.753 13.1026 22.4141 13.1704 22.0395L13.8041 18.5477C14.8331 17.7939 15.6701 16.8083 16.2471 15.6707C16.8241 14.5331 17.1249 13.2756 17.1252 12ZM6.42867 2.25H11.5718L11.9689 4.43867C10.0611 3.68714 7.93932 3.68714 6.03156 4.43867L6.42867 2.25ZM2.50023 12C2.50023 10.7144 2.88145 9.45771 3.59567 8.38879C4.3099 7.31987 5.32507 6.48675 6.51279 5.99478C7.70051 5.50281 9.00744 5.37409 10.2683 5.6249C11.5292 5.8757 12.6874 6.49476 13.5964 7.40381C14.5055 8.31285 15.1245 9.47104 15.3753 10.7319C15.6261 11.9928 15.4974 13.2997 15.0054 14.4874C14.5135 15.6752 13.6804 16.6903 12.6114 17.4046C11.5425 18.1188 10.2858 18.5 9.00023 18.5C7.2769 18.4981 5.62469 17.8127 4.40611 16.5941C3.18753 15.3755 2.50211 13.7233 2.50023 12ZM11.5718 21.75H6.42867L6.03156 19.5613C7.93932 20.3129 10.0611 20.3129 11.9689 19.5613L11.5718 21.75ZM8.18773 12V7.9375C8.18773 7.72201 8.27333 7.51535 8.4257 7.36298C8.57808 7.2106 8.78474 7.125 9.00023 7.125C9.21572 7.125 9.42238 7.2106 9.57475 7.36298C9.72713 7.51535 9.81273 7.72201 9.81273 7.9375V11.1875H13.0627C13.2782 11.1875 13.4849 11.2731 13.6373 11.4255C13.7896 11.5778 13.8752 11.7845 13.8752 12C13.8752 12.2155 13.7896 12.4222 13.6373 12.5745C13.4849 12.7269 13.2782 12.8125 13.0627 12.8125H9.00023C8.78474 12.8125 8.57808 12.7269 8.4257 12.5745C8.27333 12.4222 8.18773 12.2155 8.18773 12Z"
                      fill="#141414"
                    />
                  </svg>
                  Minha coleção
                </button>

                <button
                  className="flex items-center justify-center gap-3 h-[50px] pr-[20px] pl-[14px] bg-[#F7F7F7] border border-[#EFEFEF] text-[12px] font-medium leading-[148%] rounded-xl hover:opacity-80 transition-opacity"
                  title="Meus anuncios"
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7112 10.8125L11.625 0.726336C11.4747 0.574784 11.2957 0.45463 11.0985 0.372857C10.9013 0.291085 10.6898 0.249326 10.4763 0.250008H1.06251C0.84702 0.250008 0.640357 0.335611 0.487984 0.487984C0.335611 0.640357 0.250008 0.84702 0.250008 1.06251V10.4763C0.249326 10.6898 0.291085 10.9013 0.372857 11.0985C0.45463 11.2957 0.574784 11.4747 0.726336 11.625L10.8125 21.7112C10.9634 21.8621 11.1426 21.9818 11.3397 22.0635C11.5369 22.1452 11.7483 22.1873 11.9617 22.1873C12.1751 22.1873 12.3865 22.1452 12.5836 22.0635C12.7808 21.9818 12.96 21.8621 13.1109 21.7112L21.7112 13.1109C21.8621 12.96 21.9818 12.7808 22.0635 12.5836C22.1452 12.3865 22.1873 12.1751 22.1873 11.9617C22.1873 11.7483 22.1452 11.5369 22.0635 11.3397C21.9818 11.1426 21.8621 10.9634 21.7112 10.8125ZM11.9612 20.5625L1.87501 10.4763V1.87501H10.4763L20.5625 11.9612L11.9612 20.5625ZM6.75001 5.53126C6.75001 5.7723 6.67853 6.00794 6.54461 6.20836C6.41069 6.40878 6.22035 6.56499 5.99765 6.65724C5.77496 6.74948 5.52991 6.77362 5.29349 6.72659C5.05708 6.67956 4.83992 6.56349 4.66947 6.39304C4.49903 6.2226 4.38295 6.00544 4.33593 5.76902C4.2889 5.53261 4.31304 5.28756 4.40528 5.06486C4.49752 4.84216 4.65373 4.65182 4.85416 4.5179C5.05458 4.38399 5.29021 4.31251 5.53126 4.31251C5.85449 4.31251 6.16448 4.44091 6.39304 4.66947C6.6216 4.89803 6.75001 5.20802 6.75001 5.53126Z"
                      fill="#141414"
                    />
                  </svg>
                  Meus anúncios
                </button>

                <button
                  className="flex items-center justify-center gap-3 h-[50px] pr-[20px] pl-[14px] bg-[#F7F7F7] border border-[#EFEFEF] text-[12px] font-medium leading-[148%] rounded-xl hover:opacity-80 transition-opacity"
                  title="Minhas compras"
                >
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9375 0.0625H2.0625C1.63152 0.0625 1.2182 0.233705 0.913451 0.538451C0.608705 0.843198 0.4375 1.25652 0.4375 1.6875V16.3125C0.4375 16.7435 0.608705 17.1568 0.913451 17.4615C1.2182 17.7663 1.63152 17.9375 2.0625 17.9375H19.9375C20.3685 17.9375 20.7818 17.7663 21.0865 17.4615C21.3913 17.1568 21.5625 16.7435 21.5625 16.3125V1.6875C21.5625 1.25652 21.3913 0.843198 21.0865 0.538451C20.7818 0.233705 20.3685 0.0625 19.9375 0.0625ZM19.9375 16.3125H2.0625V1.6875H19.9375V16.3125ZM15.875 4.9375C15.875 6.23043 15.3614 7.47041 14.4471 8.38465C13.5329 9.29889 12.2929 9.8125 11 9.8125C9.70707 9.8125 8.46709 9.29889 7.55285 8.38465C6.63861 7.47041 6.125 6.23043 6.125 4.9375C6.125 4.72201 6.2106 4.51535 6.36298 4.36298C6.51535 4.2106 6.72201 4.125 6.9375 4.125C7.15299 4.125 7.35965 4.2106 7.51202 4.36298C7.6644 4.51535 7.75 4.72201 7.75 4.9375C7.75 5.79945 8.09241 6.6261 8.7019 7.2356C9.3114 7.84509 10.138 8.1875 11 8.1875C11.862 8.1875 12.6886 7.84509 13.2981 7.2356C13.9076 6.6261 14.25 5.79945 14.25 4.9375C14.25 4.72201 14.3356 4.51535 14.488 4.36298C14.6403 4.2106 14.847 4.125 15.0625 4.125C15.278 4.125 15.4847 4.2106 15.637 4.36298C15.7894 4.51535 15.875 4.72201 15.875 4.9375Z"
                      fill="#141414"
                    />
                  </svg>
                  Minhas compras
                </button>

                <Link
                  href="/carrinho"
                  className="flex items-center justify-center gap-3 h-[50px] pr-[20px] pl-[14px] bg-[#F7F7F7] border border-[#EFEFEF] text-[12px] font-medium leading-[148%] rounded-xl hover:opacity-80 transition-opacity"
                  title="Meu carrinho"
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.3736 4.97898C22.2973 4.88772 22.2019 4.81431 22.0942 4.76394C21.9864 4.71357 21.8689 4.68748 21.75 4.6875H5.36594L4.74844 1.29227C4.71443 1.10505 4.61579 0.935715 4.46972 0.813775C4.32365 0.691835 4.13942 0.625028 3.94914 0.625H1.4375C1.22201 0.625 1.01535 0.710602 0.862976 0.862976C0.710602 1.01535 0.625 1.22201 0.625 1.4375C0.625 1.65299 0.710602 1.85965 0.862976 2.01202C1.01535 2.1644 1.22201 2.25 1.4375 2.25H3.26562L5.86156 16.4982C5.93803 16.9208 6.12477 17.3156 6.40289 17.6428C6.01903 18.0013 5.74197 18.4592 5.60243 18.9656C5.4629 19.4719 5.46633 20.0071 5.61236 20.5116C5.75839 21.0162 6.0413 21.4704 6.42973 21.824C6.81816 22.1776 7.29693 22.4167 7.81294 22.5148C8.32896 22.6128 8.86206 22.5661 9.35313 22.3797C9.8442 22.1933 10.2741 21.8746 10.595 21.4588C10.916 21.043 11.1155 20.5465 11.1715 20.0242C11.2275 19.5019 11.1378 18.9744 10.9123 18.5H15.5252C15.3435 18.8805 15.2494 19.297 15.25 19.7187C15.25 20.2812 15.4168 20.831 15.7293 21.2987C16.0417 21.7663 16.4859 22.1308 17.0055 22.346C17.5251 22.5613 18.0969 22.6176 18.6485 22.5079C19.2002 22.3981 19.7069 22.1273 20.1046 21.7296C20.5023 21.3319 20.7731 20.8252 20.8829 20.2735C20.9926 19.7219 20.9363 19.1501 20.721 18.6305C20.5058 18.1109 20.1413 17.6667 19.6737 17.3543C19.206 17.0418 18.6562 16.875 18.0938 16.875H8.25945C8.06918 16.875 7.88494 16.8082 7.73888 16.6862C7.59281 16.5643 7.49417 16.3949 7.46016 16.2077L7.1382 14.4375H18.9195C19.4903 14.4374 20.043 14.237 20.4812 13.8712C20.9194 13.5054 21.2153 12.9973 21.3173 12.4357L22.5523 5.64523C22.5732 5.52787 22.5681 5.40734 22.5372 5.2922C22.5063 5.17706 22.4504 5.07012 22.3736 4.97898ZM9.5625 19.7187C9.5625 19.9598 9.49102 20.1954 9.3571 20.3958C9.22319 20.5963 9.03284 20.7525 8.81015 20.8447C8.58745 20.937 8.3424 20.9611 8.10598 20.9141C7.86957 20.8671 7.65241 20.751 7.48196 20.5805C7.31152 20.4101 7.19544 20.1929 7.14842 19.9565C7.10139 19.7201 7.12553 19.4751 7.21777 19.2524C7.31002 19.0297 7.46623 18.8393 7.66665 18.7054C7.86707 18.5715 8.1027 18.5 8.34375 18.5C8.66698 18.5 8.97698 18.6284 9.20554 18.857C9.4341 19.0855 9.5625 19.3955 9.5625 19.7187ZM19.3125 19.7187C19.3125 19.9598 19.241 20.1954 19.1071 20.3958C18.9732 20.5963 18.7828 20.7525 18.5601 20.8447C18.3374 20.937 18.0924 20.9611 17.856 20.9141C17.6196 20.8671 17.4024 20.751 17.232 20.5805C17.0615 20.4101 16.9454 20.1929 16.8984 19.9565C16.8514 19.7201 16.8755 19.4751 16.9678 19.2524C17.06 19.0297 17.2162 18.8393 17.4166 18.7054C17.6171 18.5715 17.8527 18.5 18.0938 18.5C18.417 18.5 18.727 18.6284 18.9555 18.857C19.1841 19.0855 19.3125 19.3955 19.3125 19.7187ZM19.7188 12.1452C19.6846 12.333 19.5856 12.5027 19.4389 12.6247C19.2922 12.7467 19.1072 12.8132 18.9164 12.8125H6.84266L5.66148 6.3125H20.776L19.7188 12.1452Z"
                      fill="#141414"
                    />
                  </svg>
                  Meu carrinho
                </Link>
              </div>

              {/* Controles de ordenação e visualização - Desktop */}
              <div className="flex items-center gap-[14px]">
                {/* Botão de ordenação - Desktop */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="hidden md:flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-gray-50 transition-colors"
                    title="Ordenar"
                    aria-label="Ordenar produtos"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.70806 16.2923C9.80103 16.3852 9.87479 16.4955 9.92512 16.6169C9.97544 16.7383 10.0013 16.8684 10.0013 16.9998C10.0013 17.1312 9.97544 17.2614 9.92512 17.3828C9.87479 17.5042 9.80103 17.6144 9.70806 17.7073L5.70806 21.7073C5.61518 21.8003 5.50489 21.874 5.3835 21.9244C5.2621 21.9747 5.13197 22.0006 5.00056 22.0006C4.86914 22.0006 4.73901 21.9747 4.61762 21.9244C4.49622 21.874 4.38593 21.8003 4.29306 21.7073L0.293056 17.7073C0.200146 17.6144 0.126445 17.5041 0.0761628 17.3827C0.0258802 17.2613 0 17.1312 0 16.9998C0 16.8684 0.0258802 16.7383 0.0761628 16.6169C0.126445 16.4955 0.200146 16.3852 0.293056 16.2923C0.480697 16.1047 0.735192 15.9993 1.00056 15.9993C1.13195 15.9993 1.26206 16.0251 1.38345 16.0754C1.50485 16.1257 1.61515 16.1994 1.70806 16.2923L4.00056 18.5861V0.99981C4.00056 0.734594 4.10591 0.48024 4.29345 0.292704C4.48099 0.105167 4.73534 -0.000189781 5.00056 -0.000189781C5.26577 -0.000189781 5.52013 0.105167 5.70766 0.292704C5.8952 0.48024 6.00056 0.734594 6.00056 0.99981V18.5861L8.29306 16.2923C8.38593 16.1993 8.49622 16.1256 8.61762 16.0752C8.73901 16.0249 8.86914 15.999 9.00056 15.999C9.13197 15.999 9.2621 16.0249 9.3835 16.0752C9.50489 16.1256 9.61518 16.1993 9.70806 16.2923ZM21.7081 4.29231L17.7081 0.29231C17.6152 0.199334 17.5049 0.125575 17.3835 0.0752506C17.2621 0.0249263 17.132 -0.000976562 17.0006 -0.000976562C16.8691 -0.000976562 16.739 0.0249263 16.6176 0.0752506C16.4962 0.125575 16.3859 0.199334 16.2931 0.29231L12.2931 4.29231C12.1054 4.47995 12 4.73445 12 4.99981C12 5.26517 12.1054 5.51967 12.2931 5.70731C12.4807 5.89495 12.7352 6.00037 13.0006 6.00037C13.2659 6.00037 13.5204 5.89495 13.7081 5.70731L16.0006 3.41356V20.9998C16.0006 21.265 16.1059 21.5194 16.2934 21.7069C16.481 21.8945 16.7353 21.9998 17.0006 21.9998C17.2658 21.9998 17.5201 21.8945 17.7077 21.7069C17.8952 21.5194 18.0006 21.265 18.0006 20.9998V3.41356L20.2931 5.70731C20.4807 5.89495 20.7352 6.00037 21.0006 6.00037C21.2659 6.00037 21.5204 5.89495 21.7081 5.70731C21.8957 5.51967 22.0011 5.26517 22.0011 4.99981C22.0011 4.73445 21.8957 4.47995 21.7081 4.29231Z"
                        fill="#141414"
                      />
                    </svg>
                  </button>

                  {/* Dropdown de ordenação - Desktop */}
                  {isSortDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsSortDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`w-full text-left px-4 py-2.5 font-lato text-sm transition-colors flex items-center justify-between ${
                              sortBy === option.value
                                ? "bg-[#FFF9E6] text-[#D5A60A] font-medium"
                                : "text-[#141414] hover:bg-gray-50"
                            }`}
                          >
                            <span>{option.label}</span>
                            {sortBy === option.value && (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Botão de alternância de visualização - Desktop */}
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-gray-50 transition-colors"
                  title={
                    viewMode === "grid" ? "Alternar para lista" : "Alternar para grade"
                  }
                  aria-label={
                    viewMode === "grid"
                      ? "Alternar para visualização em lista"
                      : "Alternar para visualização em grade"
                  }
                >
                  {viewMode === "grid" ? (
                    <svg
                      width="24"
                      height="20"
                      viewBox="0 0 24 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 11H2C1.46957 11 0.960859 11.2107 0.585786 11.5858C0.210714 11.9609 0 12.4696 0 13V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H22C22.5304 20 23.0391 19.7893 23.4142 19.4142C23.7893 19.0391 24 18.5304 24 18V13C24 12.4696 23.7893 11.9609 23.4142 11.5858C23.0391 11.2107 22.5304 11 22 11ZM22 18H2V13H22V18ZM22 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V7C0 7.53043 0.210714 8.03914 0.585786 8.41421C0.960859 8.78929 1.46957 9 2 9H22C22.5304 9 23.0391 8.78929 23.4142 8.41421C23.7893 8.03914 24 7.53043 24 7V2C24 1.46957 23.7893 0.960859 23.4142 0.585786C23.0391 0.210714 22.5304 0 22 0ZM22 7H2V2H22V7Z"
                        fill="#141414"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V8C0 8.53043 0.210714 9.03914 0.585786 9.41421C0.960859 9.78929 1.46957 10 2 10H8C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V2C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0ZM8 8H2V2H8V8ZM20 0H14C13.4696 0 12.9609 0.210714 12.5858 0.585786C12.2107 0.960859 12 1.46957 12 2V8C12 8.53043 12.2107 9.03914 12.5858 9.41421C12.9609 9.78929 13.4696 10 14 10H20C20.5304 10 21.0391 9.78929 21.4142 9.41421C21.7893 9.03914 22 8.53043 22 8V2C22 1.46957 21.7893 0.960859 21.4142 0.585786C21.0391 0.210714 20.5304 0 20 0ZM20 8H14V2H20V8ZM8 12H2C1.46957 12 0.960859 12.2107 0.585786 12.5858C0.210714 12.9609 0 13.4696 0 14V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H8C8.53043 22 9.03914 21.7893 9.41421 21.4142C9.78929 21.0391 10 20.5304 10 20V14C10 13.4696 9.78929 12.9609 9.41421 12.5858C9.03914 12.2107 8.53043 12 8 12ZM8 20H2V14H8V20ZM20 12H14C13.4696 12 12.9609 12.2107 12.5858 12.5858C12.2107 12.9609 12 13.4696 12 14V20C12 20.5304 12.2107 21.0391 12.5858 21.4142C12.9609 21.7893 13.4696 22 14 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V14C22 13.4696 21.7893 12.9609 21.4142 12.5858C21.0391 12.2107 20.5304 12 20 12ZM20 20H14V14H20V20Z"
                        fill="#141414"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                : "flex flex-col gap-6"
            }`}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 20}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </div>
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
