// src/app/(main)/[brand]/page.tsx
import { BrandPageClient } from "@/components/products/BrandPageClient";
import {
  getFilterOptions,
  getProductsByBrand,
  mockProducts,
} from "@/lib/data/mockProducts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BrandPageProps {
  params: Promise<{
    brand: string;
  }>;
}

// Mapeamento de slugs para nomes de marcas
// NOTA: Este mapeamento deve estar sincronizado com AVAILABLE_BRANDS em stringUtils.ts
const brandMap: Record<string, string> = {
  rolex: "Rolex",
  "patek-philippe": "Patek Philippe",
  "audemars-piguet": "Audemars Piguet",
  omega: "Omega",
  hublot: "Hublot",
  breitling: "Breitling",
  "tag-heuer": "Tag Heuer",
  cartier: "Cartier",
  iwc: "IWC",
  seiko: "Seiko",
};

export async function generateMetadata(props: BrandPageProps): Promise<Metadata> {
  const params = await props.params;
  const brandName = brandMap[params.brand];

  if (!brandName) {
    return {
      title: "Marca não encontrada",
    };
  }

  return {
    title: `${brandName} - Relógios de Luxo | Nobile`,
    description: `Explore nossa coleção de relógios ${brandName}. Encontre modelos exclusivos com garantia de autenticidade.`,
  };
}

export default async function BrandPage(props: BrandPageProps) {
  const params = await props.params;
  const brandName = brandMap[params.brand];

  if (!brandName) {
    notFound();
  }

  // Busca produtos da marca
  const products = getProductsByBrand(brandName);
  const filterOptions = getFilterOptions(mockProducts);

  return (
    <BrandPageClient
      brandName={brandName}
      products={products}
      filterOptions={filterOptions}
    />
  );
}
