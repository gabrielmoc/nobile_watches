import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background image ocupando toda a tela */}
      <div className="absolute inset-0">
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

      {/* Container do formulário posicionado sobre a imagem */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-15 xl:px-15">
        <div className="w-full max-w-sm lg:max-w-lg">
          {/* Card do formulário */}
          <div className="bg-white max-w-[596px] rounded-2xl shadow-2xl p-8 lg:p-10.5">
            {/* Conteúdo do formulário */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
