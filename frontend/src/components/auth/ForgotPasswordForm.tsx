"use client";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implementar chamada para API de recuperação de senha
      console.log("Forgot password data:", data);

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "Erro ao enviar código. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    const email = getValues("email");
    if (email) {
      await onSubmit({ email });
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifique seu email</h1>
          <p className="text-gray-600">
            Enviamos um código de 6 dígitos para o e-mail{" "}
            <span className="font-medium">{getValues("email")}</span> insira o abaixo para
            continuar.
          </p>
        </div>

        {/* Código de verificação */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-center space-x-3 mb-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              ))}
            </div>
          </div>

          <Button onClick={() => router.push("/nova-senha")} className="w-full" size="lg">
            Verificar código
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Não recebeu o código?</p>
            <button
              onClick={handleResendCode}
              className="text-sm text-orange-600 hover:text-orange-500 transition-colors"
            >
              Reenviar código
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href="/login"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2.5">Esqueceu sua senha?</h1>
        <p className="font-lato text-sm text-gray-400">
          Informe o e-mail associado à sua conta. Enviaremos um código de verificação para
          que você possa redefinir sua senha.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Digite seu e-mail..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Erro geral */}
        {/* {errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )} */}
        <div className="mt-auto">
          {/* Botão de enviar */}
          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Enviar código de verificação
          </Button>

          {/* Voltar */}
          <div className="flex items-center justify-center">
            <Link
              href="/login"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
