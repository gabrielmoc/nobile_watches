// src/lib/auth/auth.ts
import { cookies } from "next/headers";

const TOKEN_NAME = "nobile_token";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "BUYER" | "SELLER" | "ADMIN";

  // não existem
  avatar?: string;
  phone?: string;
  cpf?: string;
  addresses?: Address[];
  preferences?: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      showEmail: boolean;
      showPhone: boolean;
    };
  };
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

/**
 * Salva o token JWT em um cookie HTTP-only seguro
 */
export async function setAuthCookie(token: string) {
  (await cookies()).set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });
}

/**
 * Remove o cookie de autenticação
 */
export async function removeAuthCookie() {
  (await cookies()).delete(TOKEN_NAME);
}

/**
 * Obtém o token JWT do cookie
 */
export async function getAuthToken(): Promise<string | undefined> {
  return (await cookies()).get(TOKEN_NAME)?.value;
}

/**
 * Verifica se há um token válido e retorna os dados do usuário
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      await removeAuthCookie();
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Erro ao buscar usuário atual:", error);
    return null;
  }
}

/**
 * Faz login no backend e salva o token
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao fazer login");
  }

  const data: AuthResponse = await response.json();
  await setAuthCookie(data.token);
  return data;
}

/**
 * Faz registro no backend e salva o token
 */
export async function register(userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  role?: "BUYER" | "SELLER";
}): Promise<AuthResponse> {
  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao fazer registro");
  }

  const data: AuthResponse = await response.json();

  // Após registro, fazer login automático
  if (data.user && userData.password) {
    const loginData = await login(userData.email, userData.password);
    return loginData;
  }

  return data;
}

/**
 * Faz logout removendo o cookie
 */
export async function logout() {
  await removeAuthCookie();
}
