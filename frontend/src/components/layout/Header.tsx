"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";
import { MobileUserMenu } from "./MobileUserMenu";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, mockLogin, mockLogout } = useAuth();

  return (
    <div className="relative inset-x-0 z-250 group">
      <header className="relative h-16 md:h-24 mx-auto duration-200 bg-white">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-24 items-center justify-between gap-4">
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
                  href="/#"
                  className="font-lato text-md font-medium text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Perguntas frequentes
                </Link>
                <Link
                  href="/vendedor"
                  className="font-lato text-md font-medium text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Vender meu relógio
                </Link>
              </nav>
            </div>

            {/* Desktop Search and Auth Actions */}
            <div className="hidden md:flex items-center gap-4">
              <SearchBar className="md:w-[420px]" />

              {isAuthenticated && user ? (
                <UserMenu user={user} />
              ) : (
                <Link href="/login">
                  <Button
                    variant="gold"
                    size="default"
                    className="h-[48px] w-[122px] font-bold leading-[150%] tracking-[0.02em] whitespace-nowrap"
                  >
                    Acessar
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-900" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Novo componente unificado */}
      <MobileUserMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* DEV ONLY: Toggle para testar estados - APENAS NO DESKTOP */}
      <div className="hidden md:block fixed bottom-4 right-4 z-[9999] bg-black/80 text-white p-3 rounded-lg text-sm">
        <button
          onClick={() => (isAuthenticated ? mockLogout() : mockLogin())}
          className="hover:underline"
        >
          {isAuthenticated ? "Simular Logout" : "Simular Login"}
        </button>
      </div>
    </div>
  );
}
