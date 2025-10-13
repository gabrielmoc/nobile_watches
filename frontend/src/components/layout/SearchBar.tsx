"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Pesquisar relógios...",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-[14px] flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-[21px] w-[21px] text-[#141414]"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          className="block w-full pl-[48px] pr-3 py-3 border border-[#EFEFEF] rounded-xl leading-5 bg-[#f7f7f7] placeholder-gray-400 placeholder:font-bold focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-lato font-medium text-sm"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          aria-label="Pesquisar relógios"
        />
      </div>
    </form>
  );
}
