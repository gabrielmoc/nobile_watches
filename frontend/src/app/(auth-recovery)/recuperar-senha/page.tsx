import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Senha",
  description: "Recupere o acesso à sua conta na Nobile.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
