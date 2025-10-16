import { useCallback, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Mock de usuários para teste
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    avatar: "/images/avatar-placeholder.jpg",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    avatar: "/images/avatar-placeholder-2.jpg",
  },
];

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  mockLogin: () => void;
  mockLogout: () => void;
}

/**
 * Hook mockado de autenticação
 * TODO: Substituir por implementação real com API
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock: encontra usuário por email
      const foundUser = MOCK_USERS.find(u => u.email === email);

      if (foundUser) {
        setUser(foundUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", "mock_token_" + foundUser.id);
        }
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }, []);

  const mockLogin = useCallback(() => {
    //@ts-ignore
    const mockUser: User = MOCK_USERS[0];
    setUser(mockUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", "mock_token_" + mockUser.id);
    }
  }, []);

  const mockLogout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    mockLogin,
    mockLogout,
  };
}
