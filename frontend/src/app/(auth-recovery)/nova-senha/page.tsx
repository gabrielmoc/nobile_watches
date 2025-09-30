import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Senha",
  description: "Defina uma nova senha para sua conta na Nobile.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
