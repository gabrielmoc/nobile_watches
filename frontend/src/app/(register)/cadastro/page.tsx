import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Crie sua conta na Nobile e descubra relógios de luxo exclusivos.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
