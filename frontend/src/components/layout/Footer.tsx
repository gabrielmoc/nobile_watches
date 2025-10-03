"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#EFEFEF]">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 flex flex-col justify-between min-w-[352px] max-w-[352px]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <Link href="/" className="flex items-center flex-shrink-0">
                  <Image
                    src="/logo.svg"
                    alt="Nobile"
                    width={120}
                    height={30}
                    className="w-[91px] h-[24px] md:w-[120px] md:h-[30px]"
                  />
                </Link>

                {/* Social Icons */}
                <div className="flex items-center gap-3.5 flex-shrink-0">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/icons/instagram-outline.svg"
                      alt="Instagram"
                      width={32}
                      height={32}
                    />
                  </Link>

                  <Link
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                    aria-label="TikTok"
                  >
                    <Image
                      src="/icons/tiktok-outline.svg"
                      alt="TikTok"
                      width={32}
                      height={32}
                    />
                  </Link>

                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                    aria-label="Facebook"
                  >
                    <Image
                      src="/icons/facebook-outline.svg"
                      alt="Facebook"
                      width={32}
                      height={32}
                    />
                  </Link>
                </div>
              </div>

              <p className="font-lato text-lg text-gray-400 leading-[1.4]">
                Nascemos para ajudar vendedores e compradores a terem mais segurança.
              </p>
            </div>

            {/* Sobre a Nobile */}
            <div>
              <h3 className="font-erstoria text-[22px] font-normal text-[#D5A60A] leading-[1.4] mb-4">
                Sobre a Nobile
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/sobre-nos"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-funciona"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Como funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/perguntas-frequentes"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Perguntas frequentes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-termos"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Políticas e termos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Comprar na Nobile */}
            <div>
              <h3 className="font-erstoria text-[22px] font-normal text-[#D5A60A] leading-[1.4] mb-4">
                Comprar na Nobile
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/seguro-comprador"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Seguro do comprador
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garantia-autenticidade"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Garantia de autenticidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/processo-pagamento"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Processo de pagamento
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-termos"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Políticas e termos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Vender na Nobile */}
            <div>
              <h3 className="font-erstoria text-[22px] font-normal text-[#D5A60A] leading-[1.4] mb-4">
                Vender na Nobile
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/guia-vendedores"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Guia para vendedores
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vender-relogio"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Vender relógios como particular
                  </Link>
                </li>
                <li>
                  <Link
                    href="/avaliacao-autenticidade"
                    className="font-lato text-lg font-medium text-[#141414] leading-[1.4] hover:text-[#D5A60A] transition-colors"
                  >
                    Avaliação de autenticidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-6">
          <p className="text-center font-lato text-xs text-gray-400">
            Todos os direitos reservados © Nobile V.1.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
