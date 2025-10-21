// src/app/(main)/[brand]/[slug]/page.tsx
import { ProductPageClient } from "@/components/products/ProductPageClient";
import { mockProducts } from "@/lib/data/mockProducts";
import { stringToSlug } from "@/lib/utils/stringUtils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    brand: string;
    slug: string;
  }>;
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params;

  // Encontra o produto baseado na marca e slug
  const product = mockProducts.find(
    p => stringToSlug(p.brand) === params.brand && stringToSlug(p.model) === params.slug
  );

  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }

  return {
    title: `${product.brand} ${product.model} - Nobile`,
    description:
      product.description || `${product.brand} ${product.model} - ${product.reference}`,
    openGraph: {
      title: `${product.brand} ${product.model}`,
      description: product.description || "",
      images: product.images ? product.images : [product.image],
    },
  };
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;

  // Busca o produto pelos slugs da marca e modelo
  const product = mockProducts.find(
    p => stringToSlug(p.brand) === params.brand && stringToSlug(p.model) === params.slug
  );

  if (!product) {
    notFound();
  }

  // Busca produtos relacionados (mesma marca ou similares)
  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && p.brand === product.brand)
    .slice(0, 4);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
