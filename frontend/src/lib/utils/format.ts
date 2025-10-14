/**
 * Utilitários de formatação
 */

/**
 * Formata valor monetário para o formato brasileiro
 * @example formatCurrency(1234.56) => "R$ 1.234,56"
 */
export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    ...options,
  }).format(value);
}

/**
 * Formata número simples para o formato brasileiro
 * @example formatNumber(1234567) => "1.234.567"
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("pt-BR", options).format(value);
}

/**
 * Formata número compacto (1K, 1M, etc)
 * @example formatCompactNumber(1234567) => "1,2 mi"
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

/**
 * Formata porcentagem
 * @example formatPercentage(0.1523) => "15,23%"
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formata data para o formato brasileiro
 * @example formatDate(new Date()) => "14/10/2025"
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(dateObj);
}

/**
 * Formata data e hora para o formato brasileiro
 * @example formatDateTime(new Date()) => "14/10/2025 às 15:30"
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}

/**
 * Formata data relativa (há 2 dias, há 3 horas, etc)
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const intervals = {
    ano: 31536000,
    mês: 2592000,
    semana: 604800,
    dia: 86400,
    hora: 3600,
    minuto: 60,
    segundo: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1
        ? `há 1 ${unit}`
        : `há ${interval} ${unit}${interval > 1 && unit !== "mês" ? "s" : "es"}`;
    }
  }

  return "agora";
}

/**
 * Formata telefone brasileiro
 * @example formatPhone("11999999999") => "+55 11 99999-9999"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `+55 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `+55 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * Formata CEP brasileiro
 * @example formatZipCode("01234567") => "01234-567"
 */
export function formatZipCode(zipCode: string): string {
  const cleaned = zipCode.replace(/\D/g, "");

  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }

  return zipCode;
}

/**
 * Formata CPF
 * @example formatCPF("12345678901") => "123.456.789-01"
 */
export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }

  return cpf;
}

/**
 * Trunca texto com reticências
 * @example truncate("Lorem ipsum dolor sit amet", 10) => "Lorem ipsu..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Capitaliza primeira letra
 * @example capitalize("hello world") => "Hello world"
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Converte para Title Case
 * @example toTitleCase("hello world") => "Hello World"
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Formata slug para URL
 * @example toSlug("Hello World!") => "hello-world"
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
