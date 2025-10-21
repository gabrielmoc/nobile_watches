import Image from "next/image";
import Link from "next/link";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col lg:block bg-[#0A0A0A]">
      {/* Background mobile - DIFERENTE da tela de login - com scroll habilitado */}
      <div className="relative h-[calc(30vh+18px)] lg:hidden flex-shrink-0">
        {/* 
          IMPORTANTE: Use uma imagem específica para cadastro
          Exemplo: /images/auth/register-bg-mobile.svg ou register-bg-mobile.png
          Essa imagem deve mostrar o relógio que aparece no design de referência
        */}
        <Image
          src="/images/auth/register-bg-mobile.svg"
          alt="Crie sua conta na Nobile"
          fill
          className="object-cover"
          priority
        />

        {/* Header mobile com logo e menu hamburguer */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo-dark.svg" alt="Nobile" width={91} height={24} />
          </Link>

          <button type="button" className="p-2" aria-label="Menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-pb-500"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>
      </div>

      {/* Background desktop - mantém a mesma imagem do login */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/auth/auth-bg.svg"
          alt="Vitrine Nobile com relógios de luxo"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Container do formulário - COM SCROLL VERTICAL no mobile */}
      <div className="flex-1 lg:absolute lg:inset-0 relative z-10 flex items-start lg:items-center justify-center lg:justify-end lg:px-15 xl:px-15 -mt-[18px] lg:mt-0">
        <div className="w-full lg:max-w-lg pb-6 lg:pb-0">
          {/* 
            Card do formulário 
            - No mobile: min-h-[69vh] com overflow-y-auto para permitir scroll
            - No desktop: max-h-[90vh] com overflow-y-auto caso o formulário seja muito longo
          */}
          <div className="bg-white w-full lg:max-w-[596px] rounded-t-[32px] lg:rounded-2xl shadow-2xl px-6 pt-8 pb-10 lg:p-10.5 min-h-[69vh] lg:min-h-0 lg:max-h-[90vh] overflow-y-auto">
            {/* Conteúdo do formulário */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
