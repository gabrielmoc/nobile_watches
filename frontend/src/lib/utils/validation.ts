/**
 * Utilitários de validação
 */

/**
 * Valida e-mail
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida CPF
 */
export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
}

/**
 * Valida CNPJ
 */
export function isValidCNPJ(cnpj: string): boolean {
  const cleaned = cnpj.replace(/\D/g, "");

  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  let length = cleaned.length - 2;
  let numbers = cleaned.substring(0, length);
  const digits = cleaned.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cleaned.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

/**
 * Valida telefone brasileiro
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Valida CEP brasileiro
 */
export function isValidZipCode(zipCode: string): boolean {
  const cleaned = zipCode.replace(/\D/g, "");
  return cleaned.length === 8;
}

/**
 * Valida URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida senha forte
 * Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial
 */
export function isStrongPassword(password: string): boolean {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

/**
 * Valida senha média
 * Mínimo 6 caracteres, 1 maiúscula, 1 minúscula, 1 número
 */
export function isMediumPassword(password: string): boolean {
  const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  return mediumPasswordRegex.test(password);
}

/**
 * Calcula força da senha (0-4)
 * 0: Muito fraca, 1: Fraca, 2: Média, 3: Forte, 4: Muito forte
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  return Math.min(strength, 4);
}

/**
 * Valida número de cartão de crédito (Luhn algorithm)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, "");

  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Identifica bandeira do cartão
 */
export function getCardBrand(cardNumber: string): string | null {
  const cleaned = cardNumber.replace(/\D/g, "");

  const brands = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
  };

  for (const [brand, regex] of Object.entries(brands)) {
    if (regex.test(cleaned)) {
      return brand;
    }
  }

  return null;
}

/**
 * Valida data de validade do cartão (MM/AA)
 */
export function isValidCardExpiry(expiry: string): boolean {
  const cleaned = expiry.replace(/\D/g, "");

  if (cleaned.length !== 4) return false;

  const month = parseInt(cleaned.substring(0, 2));
  const year = parseInt(`20${cleaned.substring(2, 4)}`);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month - 1);

  return expiryDate >= now;
}

/**
 * Valida CVV do cartão
 */
export function isValidCVV(cvv: string, cardBrand?: string): boolean {
  const cleaned = cvv.replace(/\D/g, "");

  if (cardBrand === "amex") {
    return cleaned.length === 4;
  }

  return cleaned.length === 3;
}
