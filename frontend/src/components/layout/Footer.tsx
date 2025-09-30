"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#EFEFEF] border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-4">
                <Image
                  src="/logo.svg"
                  alt="Nobile"
                  width={120}
                  height={30}
                  className="w-[91px] h-[24px] md:w-[120px] md:h-[30px]"
                />
              </Link>
              <p className="font-lato text-md text-gray-400 leading-relaxed">
                Nascemos para ajudar vendedores e compradores a terem mais segurança.
              </p>
            </div>

            {/* Sobre a Nobile */}
            <div>
              <h3 className="font-erstoria text-xl font-semibold text-[#D5A60A] tracking-wider mb-4">
                Sobre a Nobile
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/sobre-nos"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-funciona"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Como funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/perguntas-frequentes"
                    className="font-lato  text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Perguntas frequentes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-termos"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Políticas e termos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Comprar na Nobile */}
            <div>
              <h3 className="font-erstoria text-xl font-semibold text-[#D5A60A] tracking-wider mb-4">
                Comprar na Nobile
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/seguro-comprador"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Seguro do comprador
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garantia-autenticidade"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Garantia de autenticidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/processo-pagamento"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Processo de pagamento
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-termos"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Políticas e termos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Vender na Nobile */}
            <div>
              <h3 className="font-erstoria text-xl font-semibold text-[#D5A60A] tracking-wider mb-4">
                Vender na Nobile
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/guia-vendedores"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Guia para vendedores
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vender-relogio"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
                  >
                    Vender relógios como particular
                  </Link>
                </li>
                <li>
                  <Link
                    href="/avaliacao-autenticidade"
                    className="font-lato text-md text-[#141414] hover:text-gray-900 transition-colors"
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
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Nobile. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacidade"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/termos-uso"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
