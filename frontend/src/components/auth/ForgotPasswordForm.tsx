"use client";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      console.log("Forgot password data:", data);
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

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyCode = () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      router.push("/nova-senha");
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col h-full min-h-[450px]">
        <div className="mb-8">
          <h1 className="font-erstoria text-[28px] text-[#141414] mb-3 leading-[100%]">
            Verifique seu e-mail
          </h1>
          <p className="font-lato text-sm text-gray-400 leading-[148%]">
            Enviamos um código de 6 dígitos para o e-mail{" "}
            <span className="font-medium text-[#141414]">{getValues("email")}</span>.
            Insira-o abaixo para continuar.
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mb-8">
            <div className="flex justify-center gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={e => handleCodeChange(index, e.target.value)}
                  onKeyDown={e => handleCodeKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-medium border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D5A60A] focus:border-[#D5A60A] transition-colors bg-white"
                />
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-6">
            <Button
              onClick={handleVerifyCode}
              variant="gold"
              className="w-full h-[56px]"
              disabled={verificationCode.join("").length !== 6}
            >
              Verificar código
            </Button>

            <div className="flex items-center justify-center">
              <Link
                href="/login"
                className="flex items-center font-lato text-sm text-[#141414] hover:text-[#141414] transition-colors"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[450px]">
      <div className="mb-8">
        <h1 className="font-erstoria text-[28px] text-[#141414] mb-3 leading-[100%]">
          Esqueceu sua senha?
        </h1>
        <p className="font-lato text-sm text-gray-400 leading-[148%]">
          Informe o e-mail associado à sua conta. Enviaremos um código de verificação para
          que você possa redefinir sua senha.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-[#141414] mb-2.5"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-[#141414]" />
              </div>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Digite seu e-mail..."
                className={`w-full h-[48px] pl-12 pr-4 py-3 border rounded-xl focus:outline-none transition-colors ${
                  errors.email
                    ? "border-[#E81F33] text-[#E81F33] placeholder:text-[#E81F33]"
                    : "border-[#D9D9D9] focus:border-[#D5A60A] focus:ring-1 focus:ring-[#D5A60A]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-[#E81F33]">{errors.email.message}</p>
            )}
          </div>

          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}
        </div>

        <div className="mt-auto space-y-6 pt-8">
          <Button
            type="submit"
            variant="gold"
            className="w-full h-[56px]"
            isLoading={isLoading}
            disabled={!email || !isValid || isLoading}
          >
            Enviar código de verificação
          </Button>

          <div className="flex items-center justify-center">
            <Link
              href="/login"
              className="flex items-center font-lato text-sm text-[#141414] hover:text-[#141414] transition-colors"
            >
              Voltar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
