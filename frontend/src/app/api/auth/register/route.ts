import { register } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, country, state, city, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const data = await register({
      name,
      email,
      password,
      phone: phone || "",
      country: country || "",
      state: state || "",
      city: city || "",
      role: role || "BUYER",
    });

    return NextResponse.json(
      {
        success: true,
        user: data.user,
        message: "Cadastro realizado com sucesso",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao fazer registro" },
      { status: 400 }
    );
  }
}
