import { login } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const data = await login(email, password);

    return NextResponse.json(
      {
        success: true,
        user: data.user,
        message: "Login realizado com sucesso",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao fazer login" },
      { status: 401 }
    );
  }
}
