"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import "../styles/header.css";

const cart = "/assets/cart.svg";
const coracao = "/assets/coracao.svg";
const etiqueta = "/assets/etiqueta.svg";
const logo = "/assets/logo.svg";
const mala = "/assets/mala.svg";
const mao = "/assets/mao.svg";
const perfil = "/assets/perfil.svg";
const relogio = "/assets/relogio.svg";
const sair = "/assets/sair.svg";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const handleMenuClose = () => setMenuAberto(false);

  return (
    <>
      <header className="header-nobile">
        <div className="header-content">
          <Link href="/" onClick={handleMenuClose}>
            <Image
              src={logo}
              alt="Nobile"
              className="logo-img"
              width={180}
              height={28}
              priority
            />
          </Link>

          <div className="header-busca-links">
            <div className="esq">
              <Link href="/faq" className="header-link">
                Perguntas frequentes
              </Link>
              <Link href="/vender" className="header-link">
                Vender meu relógio
              </Link>
            </div>

            <input
              type="text"
              placeholder="Pesquisar 564.937 relógios..."
              aria-label="Buscar relógios"
            />
          </div>

          <FaBars className="menu-icon" onClick={() => setMenuAberto(true)} />
        </div>
      </header>

      {menuAberto && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleMenuClose}
          />

          <div className="side-menu">
            <div className="menu-header">
              <Link href="/" onClick={handleMenuClose}>
                <Image
                  src={logo}
                  alt="Nobile"
                  className="logo-img"
                  width={120}
                  height={28}
                />
              </Link>
              <button
                className="close-btn"
                onClick={handleMenuClose}
                aria-label="Fechar menu"
              >
                Ã—
              </button>
            </div>

            <input
              type="text"
              placeholder="Pesquisar..."
              className="search-input"
              aria-label="Buscar no menu"
            />

            <div className="menu-section">
              <p className="menu-title">Gerenciamento</p>
              <div className="menu-grid">
                <Link href="/carrinho" onClick={handleMenuClose}>
                  <Image src={cart} alt="Carrinho" width={28} height={28} />
                  Meu carrinho
                </Link>
                <Link href="/compras" onClick={handleMenuClose}>
                  <Image src={mala} alt="Compras" width={28} height={28} />
                  Minhas compras
                </Link>
                <Link href="/desejos" onClick={handleMenuClose}>
                  <Image src={coracao} alt="Desejos" width={28} height={28} />
                  Lista de desejos
                </Link>
                <Link href="/colecao" onClick={handleMenuClose}>
                  <Image src={relogio} alt="Coleção" width={28} height={28} />
                  Minha coleção
                </Link>
              </div>
            </div>

            <div className="menu-section">
              <p className="menu-title">Meus dados</p>
              <div className="menu-grid">
                <Link href="/perfil" onClick={handleMenuClose}>
                  <Image src={perfil} alt="Perfil" width={28} height={28} />
                  Meu perfil
                </Link>
                <Link href="/vender" onClick={handleMenuClose}>
                  <Image src={mao} alt="Vender" width={28} height={28} />
                  Vender
                </Link>
                <Link href="/anuncios" onClick={handleMenuClose}>
                  <Image src={etiqueta} alt="Anúncios" width={28} height={28} />
                  Meus Anúncios
                </Link>
              </div>
            </div>

            <div className="menu-section">
              <p className="menu-title">Opções</p>
              <div className="menu-grid">
                <button
                  className="sair-link"
                  onClick={() => {
                    console.log("Logout");
                    handleMenuClose();
                  }}
                >
                  <Image src={sair} alt="Sair" width={28} height={28} />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
