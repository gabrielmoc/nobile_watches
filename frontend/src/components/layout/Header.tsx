"use client";

import { useAuth } from "@/hooks/useAuth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="container mx-auto max-w-7xl px-5 py-4 space-y-4">
              <Link
                href="/#"
                className="block font-lato text-md font-medium text-gray-700 hover:text-gray-900"
              >
                Perguntas frequentes
              </Link>
              <Link
                href="/vendedor"
                className="block font-lato text-md font-medium text-gray-700 hover:text-gray-900"
              >
                Vender meu relógio
              </Link>
              <div className="pt-2">
                <SearchBar />
              </div>
              {!isAuthenticated && (
                <Link href="/auth/login" className="w-full">
                  <Button
                    variant="gold"
                    size="default"
                    className="h-[48px] w-full font-bold"
                  >
                    Acessar
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* DEV ONLY: Toggle para testar estados */}
      <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 text-white p-3 rounded-lg text-sm">
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
