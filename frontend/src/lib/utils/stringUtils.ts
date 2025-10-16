/**
 * Normaliza uma string removendo acentos e convertendo para minúsculas
 */
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

/**
 * Converte uma string para slug (URL-friendly)
 * Exemplo: "Patek Philippe" -> "patek-philippe"
 */
export const stringToSlug = (str: string): string => {
  return normalizeString(str)
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

/**
 * Verifica se duas strings são equivalentes (ignorando acentos e case)
 */
export const areStringsEquivalent = (str1: string, str2: string): boolean => {
  return normalizeString(str1) === normalizeString(str2);
};

/**
 * Mapeamento de marcas disponíveis (sincronizado com brandMap)
 */
export const AVAILABLE_BRANDS: Record<string, string> = {
  rolex: "rolex",
  "patek philippe": "patek-philippe",
  "patek-philippe": "patek-philippe",
  "audemars piguet": "audemars-piguet",
  "audemars-piguet": "audemars-piguet",
  omega: "omega",
  hublot: "hublot",
  breitling: "breitling",
  "tag heuer": "tag-heuer",
  "tag-heuer": "tag-heuer",
  cartier: "cartier",
  iwc: "iwc",
  seiko: "seiko",
};

/**
 * Busca uma marca pelo nome ou slug
 * Retorna o slug da marca se encontrada, null caso contrário
 */
export const findBrandSlug = (query: string): string | null => {
  const normalized = normalizeString(query);
  return AVAILABLE_BRANDS[normalized] || null;
};
