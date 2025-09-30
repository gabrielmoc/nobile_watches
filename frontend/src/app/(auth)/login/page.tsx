import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta na Nobile e descubra relógios de luxo exclusivos.",
};

export default function LoginPage() {
  return <LoginForm />;
}
