"use client";

import { Button } from "@/components/ui/Button/Button";
//import { ProductCard } from "@/modules/products/components/ProductCard/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FeaturedProduct {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
  seller: {
    name: string;
    verified: boolean;
  };
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - substituir pela API real
  useEffect(() => {
    const mockProducts: FeaturedProduct[] = [
      {
        id: "1",
        title: "Patek Philippe Aquanaut",
        brand: "Patek Philippe",
        price: 75300,
        image: "/images/watches/patek-aquanaut.jpg",
        condition: "Com caixa e documentos",
        seller: { name: "Cordial Watches", verified: true },
      },
      {
        id: "2",
        title: "Rolex Datejust 36",
        brand: "Rolex",
        price: 63752,
        image: "/images/watches/rolex-datejust.jpg",
        condition: "Seminovo",
        seller: { name: "Premium Time", verified: true },
      },
      {
        id: "3",
        title: "Omega De Ville Prestige",
        brand: "Omega",
        price: 28400,
        image: "/images/watches/omega-deville.jpg",
        condition: "Novo",
        seller: { name: "Luxury Watches", verified: true },
      },
      {
        id: "4",
        title: "AP Royal Oak Offshore",
        brand: "Audemars Piguet",
        price: 125000,
        image: "/images/watches/ap-royal-oak.jpg",
        condition: "Com caixa e documentos",
        seller: { name: "Elite Timepieces", verified: true },
      },
    ];

    // Simular carregamento
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <FeaturedProductsSkeleton />;
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Relógios em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra uma seleção cuidadosa dos melhores relógios de luxo, todos
            autenticados por nossos especialistas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={id => console.log("Toggle favorite:", id)}
            />
          ))} */}
        </div>

        <div className="text-center">
          <Link href="/produtos">
            <Button size="lg" className="px-8">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Skeleton para carregamento
function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded mx-auto w-80 mb-4" />
          <div className="h-6 bg-gray-200 rounded mx-auto w-96" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden border">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
