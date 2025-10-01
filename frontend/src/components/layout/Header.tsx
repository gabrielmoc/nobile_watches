"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative inset-x-0 z-50 group">
      <header className="relative h-16 md:h-24 mx-auto duration-200 bg-white">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-24 items-center justify-between">
            <div className="flex items-center md:gap-x-12">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Nobile"
                  width={120}
                  height={30}
                  className="w-[91px] h-[24px] md:w-[120px] md:h-[30px]"
                  priority
                />
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/perguntas-frequentes"
                  className="font-lato text-md font-medium text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Perguntas frequentes
                </Link>
                <Link
                  href="/vender-relogio"
                  className="font-lato text-md font-medium text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Vender meu relógio
                </Link>
              </nav>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md ml-8">
              <SearchBar placeholder="Pesquisar 564.937 relógios..." />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - CORRIGIDO: removido max-w-sm e right-0 */}
            <div className="fixed inset-0 w-full bg-white shadow-lg">
              <div className="flex items-center justify-between p-4">
                <Link href="/" className="flex items-center">
                  <Image src="/logo.svg" alt="Nobile" width={91} height={24} priority />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Fechar menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4">
                {/* Search Bar dentro do menu mobile */}
                <div className="mb-6">
                  <SearchBar placeholder="Pesquisar 564.937 relógios..." />
                </div>

                <div className="space-y-6">
                  {/* Navigation */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#141414] tracking-wider">
                      Gerenciamento
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href="/carrinho"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Meu carrinho
                      </Link>
                      <Link
                        href="/compras"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Minhas compras
                      </Link>
                      <Link
                        href="/lista-desejos"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Lista de desejos
                      </Link>
                      <Link
                        href="/colecao"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Minha coleção
                      </Link>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Meus dados
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href="/perfil"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Meu perfil
                      </Link>
                      <Link
                        href="/vender"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Vender
                      </Link>
                      <Link
                        href="/anuncios"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Meus anúncios
                      </Link>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Opções
                    </h3>
                    <button
                      className="flex items-center text-red-600 hover:text-red-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
