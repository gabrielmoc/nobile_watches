/**
 * Tipos relacionados à autenticação
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: "buyer" | "seller" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Tipos para o menu de usuário
 */

export interface MenuItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  href: string;
  badge?: number; // Para mostrar contadores (ex: itens no carrinho)
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

/**
 * Constantes úteis
 */

export const AUTH_TOKEN_KEY = "nobile_auth_token";
export const REFRESH_TOKEN_KEY = "nobile_refresh_token";
export const USER_DATA_KEY = "nobile_user_data";

/**
 * Helpers de tipo para guards
 */

export function isAuthenticated(user: User | null): user is User {
  return user !== null && !!user.id;
}

export function hasRole(user: User | null, role: User["role"]): boolean {
  return user?.role === role;
}
