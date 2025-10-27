import { logout } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logout();
    return NextResponse.json(
      { success: true, message: "Logout realizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json({ error: "Erro ao fazer logout" }, { status: 500 });
  }
}
