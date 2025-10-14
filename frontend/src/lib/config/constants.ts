/**
 * Constantes e configurações centralizadas do projeto
 */

// === ROTAS ===
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/cadastro",
  FORGOT_PASSWORD: "/recuperar-senha",
  RESET_PASSWORD: "/nova-senha",
  PROFILE: "/perfil",
  MY_COLLECTION: "/minha-colecao",
  MY_PURCHASES: "/minhas-compras",
  MY_ADS: "/meus-anuncios",
  CART: "/carrinho",
  WISHLIST: "/lista-desejos",
  SELLER: "/vendedor",
  SELL_WATCH: "/vender-relogio",
  PRODUCTS: "/produtos",
  PRODUCT: (id: string) => `/produto/${id}`,
  BRAND: (slug: string) => `/marca/${slug}`,
  CHECKOUT: "/checkout",
} as const;

// === STORAGE KEYS ===
export const STORAGE_KEYS = {
  FAVORITES: "nobile:favorites",
  CART: "nobile:cart",
  RECENT_SEARCHES: "nobile:recent-searches",
  USER_PREFERENCES: "nobile:preferences",
  AUTH_TOKEN: "nobile:auth-token",
} as const;

// === API ===
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// === PAGINATION ===
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 10,
} as const;

// === FILTERS ===
export const FILTER_CONFIG = {
  PRICE_MIN: 0,
  PRICE_MAX: 3000000,
  PRICE_STEP: 1000,
} as const;

// === SEARCH ===
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
  MAX_RECENT_SEARCHES: 5,
} as const;

// === IMAGES ===
export const IMAGE_CONFIG = {
  PRODUCT_SIZES: {
    THUMBNAIL: 200,
    CARD: 400,
    DETAIL: 800,
    FULL: 1200,
  },
  QUALITY: {
    THUMBNAIL: 75,
    DEFAULT: 85,
    HIGH: 95,
  },
  FORMATS: ["image/webp", "image/avif"],
} as const;

// === BRANDS ===
export const WATCH_BRANDS = [
  { slug: "rolex", name: "Rolex", logo: "/assets/marca1.svg" },
  { slug: "tag-heuer", name: "Tag Heuer", logo: "/assets/marca2.svg" },
  { slug: "breitling", name: "Breitling", logo: "/assets/marca3.svg" },
  { slug: "audemars-piguet", name: "Audemars Piguet", logo: "/assets/marca4.svg" },
  { slug: "patek-philippe", name: "Patek Philippe", logo: "/assets/marca5.svg" },
  { slug: "hublot", name: "Hublot", logo: "/assets/marca6.svg" },
  { slug: "cartier", name: "Cartier", logo: "/assets/marca7.svg" },
  { slug: "seiko", name: "Seiko", logo: "/assets/marca8.svg" },
  { slug: "omega", name: "Omega", logo: "/assets/marca9.svg" },
  { slug: "iwc", name: "IWC", logo: "/assets/marca10.svg" },
] as const;

// === VALIDATION ===
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 6,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    ERROR_MESSAGE:
      "Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número",
  },
  PHONE: {
    REGEX: /^\+55\s\d{2}\s\d{4,5}-?\d{4}$/,
    ERROR_MESSAGE: "Telefone deve estar no formato +55 XX XXXXX-XXXX",
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;

// === ANIMATION ===
export const ANIMATION = {
  DURATION: {
    FAST: 150,
    BASE: 300,
    SLOW: 500,
  },
  EASING: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// === BREAKPOINTS (match Tailwind) ===
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// === FEATURE FLAGS ===
export const FEATURES = {
  ENABLE_WISHLIST: true,
  ENABLE_COMPARISON: false,
  ENABLE_REVIEWS: false,
  ENABLE_CHAT: false,
  ENABLE_NOTIFICATIONS: true,
} as const;

// === SEO ===
export const SEO = {
  DEFAULT_TITLE: "Nobile - Relógios de Luxo Autênticos",
  TITLE_TEMPLATE: "%s | Nobile",
  DEFAULT_DESCRIPTION:
    "Marketplace seguro para comprar e vender relógios de luxo com garantia de autenticidade",
  DEFAULT_IMAGE: "/assets/og-home.jpg",
  SITE_NAME: "Nobile",
  TWITTER_HANDLE: "@nobile",
} as const;

// === CONTACT ===
export const CONTACT = {
  EMAIL: "contato@nobile.com.br",
  SUPPORT_EMAIL: "suporte@nobile.com.br",
  PHONE: "+55 11 99999-9999",
  WHATSAPP: "+5511999999999",
  ADDRESS: {
    STREET: "Rua Example, 123",
    CITY: "São Paulo",
    STATE: "SP",
    ZIP: "01234-567",
    COUNTRY: "Brasil",
  },
} as const;

// === SOCIAL MEDIA ===
export const SOCIAL_MEDIA = {
  INSTAGRAM: "https://instagram.com/nobile",
  FACEBOOK: "https://facebook.com/nobile",
  TIKTOK: "https://tiktok.com/@nobile",
  TWITTER: "https://twitter.com/nobile",
} as const;
