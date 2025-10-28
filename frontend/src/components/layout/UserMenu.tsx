"use client";

import { User } from "@/lib/auth/auth";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Heart,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tag,
  User as UserIcon,
  Watch,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface UserMenuProps {
  user: User;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  section: "gerenciamento" | "meusDados" | "opcoes";
}

const menuItems: MenuItem[] = [
  // Gerenciamento
  {
    icon: ShoppingCart,
    label: "Meu carrinho",
    href: "/carrinho",
    section: "gerenciamento",
  },
  {
    icon: ShoppingBag,
    label: "Minhas compras",
    href: "/compras",
    section: "gerenciamento",
  },
  { icon: Heart, label: "Lista de desejos", href: "/desejos", section: "gerenciamento" },
  // Meus dados
  { icon: Watch, label: "Minha coleção", href: "/colecao", section: "meusDados" },
  { icon: UserIcon, label: "Meu perfil", href: "/perfil", section: "meusDados" },
  { icon: Store, label: "Vender", href: "/vender", section: "meusDados" },
  { icon: Tag, label: "Meus anúncios", href: "/anuncios", section: "meusDados" },
  // Opções
  { icon: LogOut, label: "Sair", href: "/auth/logout", section: "opcoes" },
];

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const gerenciamentoItems = menuItems.filter(item => item.section === "gerenciamento");
  const meusDadosItems = menuItems.filter(item => item.section === "meusDados");
  const opcoesItems = menuItems.filter(item => item.section === "opcoes");

  // Avatar padrão se não houver
  const avatarUrl = user.avatar || "/images/avatar-placeholder.jpg";

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        aria-label="Menu do usuário"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <Image src={avatarUrl} alt={user.name} fill className="object-cover" />
        </div>

        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-900" />
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-900"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Full Width Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu Panel - Fixed positioning aligned with header */}
          <div className="fixed left-0 right-0 top-[64px] md:top-[96px] z-50 bg-white">
            <div className="container bg-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="bg-white py-[48px] overflow-hidden">
                {/* Grid Layout */}
                <div className="grid grid-cols-[auto_1fr_auto] gap-4">
                  {/* Gerenciamento Section */}
                  <div className="min-w-0">
                    <div className="mb-3">
                      <h3 className="font-lato text-[14px] font-normal text-[#141414] leading-[148%] whitespace-nowrap">
                        Gerenciamento
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {gerenciamentoItems.map(item => (
                        <MenuItemButton
                          key={item.label}
                          item={item}
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Meus Dados Section */}
                  <div className="min-w-0">
                    <div className="mb-3">
                      <h3 className="font-lato text-[14px] font-normal text-[#141414] leading-[148%] whitespace-nowrap">
                        Meus dados
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {meusDadosItems.map(item => (
                        <MenuItemButton
                          key={`meus-dados-${item.label}`}
                          item={item}
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Opções Section */}
                  <div className="min-w-0">
                    <div className="mb-3">
                      <h3 className="font-lato text-[14px] font-normal text-[#141414] leading-[148%] whitespace-nowrap">
                        Opções
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {opcoesItems.map(item => (
                        <MenuItemButton
                          key={`opcoes-${item.label}-${item.href}`}
                          item={item}
                          onClick={() => setIsOpen(false)}
                          isLogout={item.label === "Sair"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MenuItemButton({
  item,
  onClick,
  isLogout = false,
}: {
  item: MenuItem;
  onClick: () => void;
  isLogout?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 border border-[#EFEFEF] rounded-[12px] px-8 py-6 bg-[#F7F7F7] hover:bg-gray-50 transition-colors min-w-[140px] ${
        isLogout ? "text-red-600 hover:bg-red-50" : "text-gray-700"
      }`}
    >
      <Icon className="h-6 w-6" strokeWidth={1.5} />
      <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
    </Link>
  );
}
