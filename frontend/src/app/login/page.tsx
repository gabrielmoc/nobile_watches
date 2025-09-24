import LoginForm from "@/src/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Nobile",
  description: "Faça login em sua conta Nobile para acessar relógios de luxo exclusivos",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-gray-600">
            Entre em sua conta para continuar navegando pelos melhores relógios de luxo
          </p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a
              href="/cadastro"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Cadastre-se aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
