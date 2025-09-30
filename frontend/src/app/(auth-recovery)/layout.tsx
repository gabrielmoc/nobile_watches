import Image from "next/image";

interface AuthRecoveryLayoutProps {
  children: React.ReactNode;
}

export default function AuthRecoveryLayout({ children }: AuthRecoveryLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background image diferente para recuperação de senha */}
      <div className="absolute inset-0">
        <Image
          src="/images/auth/recovery-bg.svg"
          alt="Recuperação de senha"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay mais escuro para melhor legibilidade */}
        {/* <div className="absolute inset-0 bg-black/20"></div> */}
      </div>

      {/* Conteúdo centralizado na página */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Card do formulário */}
          <div className="h-[96px] max-h-[96px] bg-[#EFEFEF] flex items-center px-12 rounded-t-3xl">
            <Image src="/logo-recovery.svg" alt="Nobile" width={120} height={30} />
          </div>
          <div className="h-[65vh] min-h-[60vh] relative bg-white py-8 px-12 rounded-b-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
