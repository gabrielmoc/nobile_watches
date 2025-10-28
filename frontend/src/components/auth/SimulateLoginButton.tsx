"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useState } from "react";

export default function SimulateLoginButton() {
  const { simulateLogin, logout, isSimulated, user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Não renderiza em produção
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const handleSimulateLogin = (role: "BUYER" | "SELLER" | "ADMIN") => {
    simulateLogin(role);
    setIsOpen(false);
  };

  if (isAuthenticated && isSimulated) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎭</span>
                <span className="font-bold text-yellow-800">Login Simulado</span>
              </div>
              <div className="text-sm text-yellow-700">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="ml-2 text-yellow-600 hover:text-yellow-800 font-bold"
              title="Sair"
            >
              ✕
            </button>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-3 w-full text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-semibold py-2 px-3 rounded transition-colors"
          >
            Trocar usuário
          </button>

          {isOpen && (
            <div className="mt-2 space-y-1">
              <button
                onClick={() => handleSimulateLogin("BUYER")}
                className="w-full text-left text-xs bg-white hover:bg-yellow-50 text-yellow-800 py-2 px-3 rounded border border-yellow-200 transition-colors"
              >
                👤 Comprador
              </button>
              <button
                onClick={() => handleSimulateLogin("SELLER")}
                className="w-full text-left text-xs bg-white hover:bg-yellow-50 text-yellow-800 py-2 px-3 rounded border border-yellow-200 transition-colors"
              >
                🏪 Vendedor
              </button>
              <button
                onClick={() => handleSimulateLogin("ADMIN")}
                className="w-full text-left text-xs bg-white hover:bg-yellow-50 text-yellow-800 py-2 px-3 rounded border border-yellow-200 transition-colors"
              >
                👑 Administrador
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2"
        title="Simular Login (Dev Only)"
      >
        <span className="text-xl">🎭</span>
        <span className="text-sm">Simular Login</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 -z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[240px]">
            <div className="bg-blue-600 text-white px-4 py-3">
              <p className="font-bold text-sm">Escolha um perfil</p>
              <p className="text-xs opacity-90">Apenas para desenvolvimento</p>
            </div>

            <div className="p-2 space-y-1">
              <button
                onClick={() => handleSimulateLogin("BUYER")}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-600">
                      Comprador
                    </p>
                    <p className="text-xs text-gray-500">Carlos Comprador</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSimulateLogin("SELLER")}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏪</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-600">
                      Vendedor
                    </p>
                    <p className="text-xs text-gray-500">Vitória Vendedora</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSimulateLogin("ADMIN")}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-600">
                      Administrador
                    </p>
                    <p className="text-xs text-gray-500">Ana Administradora</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                💡 Este botão não aparece em produção
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
