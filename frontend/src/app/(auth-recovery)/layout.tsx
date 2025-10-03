import Image from "next/image";

interface AuthRecoveryLayoutProps {
  children: React.ReactNode;
}

export default function AuthRecoveryLayout({ children }: AuthRecoveryLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image - ajustado para posicionar o relógio corretamente */}
      <div className="absolute inset-0">
        <Image
          src="/images/auth/recovery-bg.svg"
          alt="Recuperação de senha"
          fill
          className="object-cover object-left"
          priority
          style={{ objectPosition: "30% center" }}
        />
      </div>

      {/* Conteúdo - posicionado para cobrir o relógio */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-0">
        <div className="w-full max-w-[498px] min-[60vh] rounded-3xl overflow-hidden auth-content">
          {/* Logo */}
          <div className="h-[90px] max-h-[90px] px-[42px] flex items-center bg-[#EFEFEF]">
            <Image src="/logo-recovery.svg" alt="Nobile" width={120} height={28} />
          </div>

          {/* Card do formulário - com backdrop blur para melhor contraste */}
          <div className="bg-white/95 backdrop-blur-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] py-8 lg:py-8 px-[42px] pb-[20px] auth-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
