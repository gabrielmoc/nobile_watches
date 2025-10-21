"use client";

import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Valida em tempo real
  });

  // Observa os valores dos campos para controlar o estado do botão
  const email = watch("email");
  const password = watch("password");

  // Determina se o botão deve estar habilitado
  const isButtonEnabled = Boolean(email && password && isValid);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implementar chamada para API de login
      console.log("Login data:", data);

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Em caso de sucesso
      onSuccess?.();
      router.push("/");
    } catch (error) {
      // Tratar erros da API
      setError("root", {
        message: "E-mail ou senha incorretos. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="font-erstoria text-[28px] font-normal text-pb-500">
          Acesse sua conta
        </h1>
        <p className="font-lato text-gray-400 text-sm leading-[148%]">
          Descubra as marcas mais exclusivas, negocie com segurança e acompanhe a
          valorização das suas peças.
        </p>
      </div>

      {/* Botões de login social */}
      <div className="mb-8">
        <div className="flex justify-center gap-3">
          {/* Google */}
          <button
            type="button"
            className="flex-1 flex items-center justify-center w-[60px] h-[60px] max-w-[60px] bg-[#F7F7F7] border border-[#D9D9D9] rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-offset-2"
            aria-label="Entrar com Google"
          >
            <Image src="/icons/google.svg" alt="Google" width={40} height={40} />
          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex-1 flex items-center justify-center w-[60px] h-[60px] max-w-[60px] bg-[#F7F7F7] border border-[#D9D9D9] rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-offset-2"
            aria-label="Entrar com Apple"
          >
            <Image src="/icons/apple.svg" alt="Apple" width={40} height={40} />
          </button>
        </div>
      </div>

      {/* Divisor */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#EFEFEF]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="font-lato px-3 bg-white text-gray-400">Ou</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm text-pb-500 mb-2.5">
            E-mail
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image
                src="/icons/envelope-outline.svg"
                alt="Envelope"
                width={24}
                height={24}
              />
            </div>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Digite seu e-mail..."
              className={`w-full h-[48px] pl-12 pr-3 py-3 border rounded-xl focus:outline-none transition-colors ${
                errors.email
                  ? "border-[#E81F33] text-[#E81F33] placeholder:text-[#E81F33]"
                  : "border-[#EFEFEF]"
              }`}
            />
          </div>
          {/* {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )} */}
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="password" className="block text-sm text-pb-500 mb-2.5">
            Senha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image
                src="/icons/password-lock.svg"
                alt="Password"
                width={24}
                height={24}
              />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Digite sua senha..."
              className={`w-full h-[48px] pl-12 pr-3 py-3 border rounded-xl focus:outline-none transition-colors ${
                errors.password ? "border-[#E81F33]" : "border-[#EFEFEF]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-pb-500" />
              ) : (
                <EyeIcon className="h-5 w-6 text-pb-500" />
              )}
            </button>
          </div>
          {/* {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )} */}
        </div>

        {/* Erro geral */}
        {errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        {/* Botão de login */}
        <Button
          type="submit"
          variant="gold"
          className="w-full h-[54px]"
          isLoading={isLoading}
          disabled={!isButtonEnabled || isLoading}
        >
          Acessar
        </Button>

        {/* Esqueci minha senha */}
        <div className="text-center">
          <Link
            href="/recuperar-senha"
            className="font-lato text-base text-pb-500 font-bold hover:text-gray-900 transition-colors"
          >
            Esqueci minha senha
          </Link>
        </div>
      </form>
    </div>
  );
}
