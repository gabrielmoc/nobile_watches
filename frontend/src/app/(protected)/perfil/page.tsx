"use client";

import { UserNav } from "@/components/user/UserNav";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Edit2,
  Lock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar dados do perfil</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { user, activity, paymentMethods, billingAddresses } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== HEADER DESKTOP ==================== */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="h-[56px] flex items-center justify-between">
            <div>
              <nav className="flex items-center gap-2 text-[18px] font-erstoria">
                <Link
                  href="/"
                  className="text-pb-500 hover:text-[#D5A60A] transition-colors"
                >
                  Home
                </Link>
                <span className="text-gray-400">&gt;</span>
                <span className="text-[#D5A60A] font-medium">Meu perfil</span>
              </nav>
              <h1 className="text-3xl lg:text-[32px] leading-[100%]">Meu perfil</h1>
            </div>
            <UserNav />
          </div>
        </div>
      </div>

      {/* ==================== HEADER MOBILE ==================== */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/" className="p-1 -ml-1">
            <ArrowLeft className="w-6 h-6 text-pb-500" strokeWidth={1.5} />
          </Link>
          <h1 className="font-erstoria text-[20px] text-pb-500 font-medium">Perfil</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* ==================== LAYOUT DESKTOP ==================== */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-0">
        <div className="grid grid-cols-6 gap-6 m-6">
          {/* Card de perfil principal - Desktop */}
          <div className="col-span-4 bg-[#F7F7F7] rounded-[12px] py-6 px-8">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-8">
                {/* Avatar */}
                <div className="relative w-[118px] h-[118px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src="/images/avatar-placeholder.jpg"
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Nome e status */}
                <h2 className="font-lato text-2xl font-normal">
                  Olá, <span className="font-semibold">{user.name}!</span>
                </h2>
              </div>
              {user.isVerified && (
                <div className="flex items-center gap-1 bg-[#EFEFEF] px-2.5 h-[34px] rounded-[4px]">
                  <div className="">
                    <Image
                      src="/icons/verified-badge.svg"
                      alt="Verificado"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className="text-sm text-pb-500 leading-[140%]">
                    Vendedor verificado
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Atividade - Desktop */}
          <div className="col-span-2 bg-[#F7F7F7] rounded-[12px] py-[28px] px-[32px]">
            <h3 className="font-lato font-medium mb-[7px]">Atividade</h3>
            <p className="text-xs text-gray-400 mb-[18px]">
              Aqui você visualiza suas conquistas na Nobile.
            </p>
            <div className="grid grid-cols-3 gap-[18px]">
              <div className="h-[72px] bg-white text-center p-[14px] rounded-[12px]">
                <p className="font-medium text-pb-500">{activity.vendidos}</p>
                <p className="text-sm text-gray-400 font-normal">Vendidos</p>
              </div>
              <div className="h-[72px] bg-white text-center p-[14px] rounded-[12px]">
                <p className="font-medium text-pb-500">{activity.comprados}</p>
                <p className="text-sm text-gray-400 font-normal">Comprados</p>
              </div>
              <div className="h-[72px] bg-white text-center p-[14px] rounded-[12px]">
                <p className="font-medium text-pb-500">{activity.colecao}</p>
                <p className="text-sm text-gray-400 font-normal">Coleção</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de informações - Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-[170px]">
          {/* Dados pessoais - Desktop */}
          <div className="bg-[#F7F7F7] rounded-[12px] p-8 pt-[28px]">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-2">
              Dados pessoais
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Aqui você pode editar seus dados a qualquer momento.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">************</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.phone}</span>
                </div>
              )}
              {(user.country || user.state || user.city) && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {[user.country, user.state, user.city].filter(Boolean).join(", ")}.
                  </span>
                </div>
              )}
            </div>

            <button className="w-full h-[48px] rounded-full border-2 border-pb-500 bg-white font-lato text-base font-medium text-pb-500 hover:bg-gray-50 transition-colors">
              Editar dados
            </button>
          </div>

          {/* Dados de pagamento - Desktop */}
          <div className="bg-[#F7F7F7] rounded-[12px] p-8 pt-[28px]">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-2">
              Dados de pagamento
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Aqui você pode editar seus dados a qualquer momento.
            </p>

            {paymentMethods && paymentMethods.length > 0 ? (
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {paymentMethods[0]?.cardholderName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    **** **** **** {paymentMethods[0]?.cardNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {paymentMethods[0]?.expiryDate}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">***</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{paymentMethods[0]?.type}</span>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500">
                  Nenhum método de pagamento cadastrado
                </p>
              </div>
            )}

            <button className="w-full h-[48px] rounded-full border-2 border-pb-500 bg-white font-lato text-base font-medium text-pb-500 hover:bg-gray-50 transition-colors">
              Editar dados
            </button>
          </div>

          {/* Endereços de cobrança - Desktop */}
          <div className="bg-[#F7F7F7] rounded-[12px] p-8 pt-[28px]">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-2">
              Endereços de cobrança
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Aqui você pode visualizar e editar seus dados de endereço a qualquer
              momento.
            </p>

            {billingAddresses && billingAddresses.length > 0 ? (
              <div className="space-y-6 mb-6">
                {billingAddresses.slice(0, 2).map(address => (
                  <div key={address.id}>
                    <div className="flex items-start gap-2 mb-2">
                      {address.country === "Brasil" ? (
                        <div className="w-6 h-4 bg-green-500 rounded-sm mt-1" />
                      ) : (
                        <div className="w-6 h-4 bg-blue-500 rounded-sm mt-1" />
                      )}
                      <div>
                        <p className="text-sm text-gray-700 font-medium">
                          {address.street}, {address.number}
                        </p>
                        <p className="text-xs text-gray-500">
                          {address.city}, {address.state}. {address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500">
                  Nenhum endereço de cobrança cadastrado
                </p>
              </div>
            )}

            <button className="w-full h-[48px] rounded-full border-2 border-pb-500 bg-white font-lato text-base font-medium text-pb-500 hover:bg-gray-50 transition-colors">
              Editar dados
            </button>
          </div>
        </div>
      </div>

      {/* ==================== LAYOUT MOBILE ==================== */}
      <div className="lg:hidden">
        {/* Avatar e Nome - Mobile */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          {/* Avatar com botão de edição */}
          <div className="relative mb-4">
            <div className="w-[126px] h-[126px] rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/images/avatar-placeholder.jpg"
                alt={user.name}
                width={126}
                height={126}
                className="object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm"
              aria-label="Editar foto de perfil"
            >
              <Edit2 className="w-4 h-4 text-pb-500" />
            </button>
          </div>

          {/* Nome */}
          <h2 className="font-erstoria text-[20px] text-pb-500 font-medium mb-2">
            Olá, {user.name}!
          </h2>

          {/* Badge de verificação */}
          {user.isVerified && (
            <div className="flex items-center gap-1.5">
              <Image
                src="/icons/verified-badge.svg"
                alt="Verificado"
                width={16}
                height={16}
              />
              <span className="font-lato text-sm text-pb-500">Vendedor verificado</span>
            </div>
          )}
        </div>

        {/* Card de Atividade - Mobile */}
        <div className="mx-6 mb-6">
          <div className="bg-[#F7F7F7] rounded-[12px] p-6">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-1">
              Atividade
            </h3>
            <p className="font-lato text-xs text-gray-400 mb-4">
              Aqui você visualiza suas conquistas na Nobile.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-[12px] p-4 text-center">
                <p className="font-lato text-base font-medium text-pb-500 leading-none mb-1">
                  {activity.vendidos}
                </p>
                <p className="font-lato text-xs text-gray-400">Vendidos</p>
              </div>
              <div className="bg-white rounded-[12px] p-4 text-center">
                <p className="font-lato text-base font-medium text-pb-500 leading-none mb-1">
                  {activity.comprados}
                </p>
                <p className="font-lato text-xs text-gray-400">Comprados</p>
              </div>
              <div className="bg-white rounded-[12px] p-4 text-center">
                <p className="font-lato text-base font-medium text-pb-500 leading-none mb-1">
                  {activity.colecao}
                </p>
                <p className="font-lato text-xs text-gray-400">Coleção</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dados pessoais - Mobile */}
        <div className="mx-6 mb-6">
          <div className="bg-[#F7F7F7] rounded-[12px] p-6">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-1">
              Dados pessoais
            </h3>
            <p className="font-lato text-xs text-gray-400 mb-6">
              Aqui você pode editar seus dados a qualquer momento.
            </p>

            <div className="space-y-5 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-lato text-sm text-pb-500 leading-[148%]">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-lato text-sm text-pb-500 leading-[148%]">
                  ************
                </span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    {user.phone}
                  </span>
                </div>
              )}
              {(user.country || user.state || user.city) && (
                <div className="flex items-center gap-3">
                  <MapPin
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    {[user.country, user.state, user.city].filter(Boolean).join(", ")}.
                  </span>
                </div>
              )}
            </div>

            <button className="w-full h-12 rounded-full border-[1.5px] border-pb-500 bg-white font-lato text-base font-medium text-pb-500">
              Editar dados
            </button>
          </div>
        </div>

        {/* Dados de pagamento - Mobile */}
        <div className="mx-6 mb-6">
          <div className="bg-[#F7F7F7] rounded-[12px] p-6">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-1">
              Dados de pagamento
            </h3>
            <p className="font-lato text-xs text-gray-400 mb-6">
              Aqui você pode editar seus dados a qualquer momento.
            </p>

            {paymentMethods && paymentMethods.length > 0 ? (
              <div className="space-y-5 mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    {paymentMethods[0]?.cardholderName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    **** **** **** {paymentMethods[0]?.cardNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    {paymentMethods[0]?.expiryDate}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    ***
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-lato text-sm text-pb-500 leading-[148%]">
                    {paymentMethods[0]?.type}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="font-lato text-sm text-gray-500">
                  Nenhum método de pagamento cadastrado
                </p>
              </div>
            )}

            <button className="w-full h-12 rounded-full border-[1.5px] border-pb-500 bg-white font-lato text-base font-medium text-pb-500">
              Editar dados
            </button>
          </div>
        </div>

        {/* Endereços de cobrança - Mobile */}
        <div className="mx-6 mb-24">
          <div className="bg-[#F7F7F7] rounded-[12px] p-6">
            <h3 className="font-lato text-base font-medium text-pb-500 mb-1">
              Endereços de cobrança
            </h3>
            <p className="font-lato text-xs text-gray-400 mb-6">
              Aqui você pode visualizar e editar seus dados de endereço a qualquer
              momento.
            </p>

            {billingAddresses && billingAddresses.length > 0 ? (
              <div className="space-y-6 mb-6">
                {billingAddresses.slice(0, 2).map(address => (
                  <div key={address.id} className="space-y-2">
                    <div className="flex items-start gap-3">
                      {address.country === "Brasil" ? (
                        <div className="w-8 h-5 bg-[#009739] rounded-[2px] mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-8 h-5 bg-[#B22234] rounded-[2px] mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-lato text-sm text-pb-500 leading-[148%] font-medium">
                          {address.street}, {address.number}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 pl-11">
                      <div className="flex-1">
                        <p className="font-lato text-sm text-pb-500 leading-[148%]">
                          {address.city}, {address.state}.
                        </p>
                      </div>
                      <div>
                        <p className="font-lato text-sm text-pb-500 leading-[148%]">
                          {address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="font-lato text-sm text-gray-500">
                  Nenhum endereço de cobrança cadastrado
                </p>
              </div>
            )}

            <button className="w-full h-12 rounded-full border-[1.5px] border-pb-500 bg-white font-lato text-base font-medium text-pb-500">
              Editar dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
