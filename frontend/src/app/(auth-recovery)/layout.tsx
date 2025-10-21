import Image from "next/image";
import Link from "next/link";

interface AuthRecoveryLayoutProps {
  children: React.ReactNode;
}

export default function AuthRecoveryLayout({ children }: AuthRecoveryLayoutProps) {
  return (
    <div className="h-screen lg:h-screen overflow-hidden relative flex flex-col lg:block">
      {/* Background mobile - ocupa 31% da altura + 18px para ficar atrás do card */}
      <div className="relative h-[calc(31vh+18px)] flex-shrink-0 lg:hidden">
        <Image
          src="/images/auth/auth-bg-mobile.svg"
          alt="Vitrine Nobile com relógios de luxo"
          fill
          className="object-cover"
          priority
        />

        {/* Header mobile com logo e menu hamburguer */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <span className="font-erstoria text-[32px] text-white">Nobile</span>
          </Link>

          <button type="button" className="p-2" aria-label="Menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
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

      {/* Background desktop - mantém a imagem atual ocupando toda a tela */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/auth/recovery-bg.svg"
          alt="Recuperação de senha"
          fill
          className="object-cover object-left"
          priority
          style={{ objectPosition: "30% center" }}
        />
      </div>

      {/* Container do formulário */}
      <div className="flex-1 lg:absolute lg:inset-0 relative z-10 flex items-start lg:items-center justify-center lg:px-15 xl:px-15 -mt-[18px] lg:mt-0 overflow-hidden">
        <div className="w-full max-w-[498px] h-full lg:h-auto flex flex-col rounded-3xl overflow-hidden auth-content">
          {/* Logo - apenas desktop */}
          <div className="hidden lg:flex h-[90px] flex-shrink-0 px-[42px] items-center bg-[#EFEFEF]">
            <Image src="/logo-recovery.svg" alt="Nobile" width={120} height={28} />
          </div>

          <div className="bg-white py-[30px] lg:py-8 px-[20px] lg:px-[42px] pb-[20px] auth-inner flex-1 lg:flex-none overflow-y-auto lg:max-h-[calc(90vh-90px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
