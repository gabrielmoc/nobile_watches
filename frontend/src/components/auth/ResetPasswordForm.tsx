"use client";

import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // Observa os valores dos campos
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implementar chamada para API de redefinição de senha
      console.log("Reset password data:", data);

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
    } catch (error) {
      setError("root", {
        message: "Erro ao redefinir senha. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center w-[46px] h-[46px] mb-8">
            <Image src="/icons/check_square.svg" alt="Check" width={46} height={46} />
          </div>
          <h1 className="font-erstoria text-[32px] text-[#141414] mb-3 leading-[100%]">
            Senha atualizada com sucesso!
          </h1>
          <p className="font-lato text-sm text-gray-400 leading-[148%]">
            Você pode acessar sua conta normalmente com sua nova senha.
          </p>
        </div>

        <Button
          onClick={() => router.push("/login")}
          variant="gold"
          className="w-full h-[56px]"
        >
          Ir para o login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-erstoria text-[28px] text-[#141414] mb-3 leading-[100%]">
          Crie uma nova senha
        </h1>
        <p className="font-lato text-sm text-gray-400 leading-[148%]">
          Escolha uma senha forte para manter sua conta protegida.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Código (oculto - seria passado via URL params em implementação real) */}
        <input
          {...register("code")}
          type="hidden"
          value="123456" // Exemplo - seria obtido dos params
        />

        {/* Nova senha */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nova senha
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Digite sua nova senha..."
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirmar nova senha */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirme sua nova senha
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirme sua nova senha..."
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Erro geral */}
        {errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        {/* Botão de redefinir */}
        <Button
          type="submit"
          variant="gold"
          className="w-full h-[56px]"
          isLoading={isLoading}
          disabled={!password || !confirmPassword || !isValid || isLoading}
        >
          Redefinir senha
        </Button>

        {/* Voltar */}
        <div className="flex items-center justify-center">
          <Link
            href="/recuperar-senha"
            className="flex items-center text-sm text-[#141414] hover:text-gray-900 transition-colors"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
