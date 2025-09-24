import HomeClient from "@/src/components/HomeClient";
import { Metadata } from "next";
import { Suspense } from "react";

interface Watch {
  id: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
}

async function getLatestWatches(): Promise<Watch[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${apiUrl}/api/watches`, {
      next: {
        revalidate: 300, // Cache por 5 minutos
        tags: ["watches"], // Para revalidação sob demanda
      },
    });

    if (!response.ok) {
      console.log(`API Error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("API retornou dados inválidos");
      return [];
    }

    return data
      .filter(watch => watch && watch.images && watch.images.length > 0)
      .sort(
        (a: Watch, b: Watch) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  } catch (error) {
    console.error("Erro ao buscar relógios:", error);

    return [
      {
        id: "1",
        brand: "Rolex",
        model: "Submariner",
        description: "Clássico relógio de mergulho com movimento automático",
        price: 45000,
        images: ["/assets/rolex-sub.jpg"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        brand: "Omega",
        model: "Speedmaster",
        description: "Relógio cronógrafo profissional usado na lua",
        price: 28000,
        images: ["/assets/omega-speed.jpg"],
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

function HomeLoading() {
  return (
    <div className="home-container">
      <div className="animate-pulse space-y-8">
        <div className="h-64 bg-gray-200 rounded-lg"></div>

        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
    const relogios = await getLatestWatches();

  return (
    <div className="min-h-screen">
      <Suspense fallback={<HomeLoading />}>
        <HomeClient initialWatches={relogios} />
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Nobile - Relógios de Luxo Autênticos",
  description:
    "Descubra relógios de luxo autênticos com garantia de autenticidade. Marketplace seguro para comprar e vender Rolex, Omega, Patek Philippe e muito mais.",
  keywords: [
    "relógios de luxo",
    "Rolex",
    "Omega",
    "Patek Philippe",
    "marketplace",
    "autenticidade garantida",
    "comprar relógio",
    "vender relógio",
  ],
  openGraph: {
    title: "Nobile - Relógios de Luxo Autênticos",
    description:
      "Marketplace seguro para comprar e vender relógios de luxo com garantia de autenticidade",
    type: "website",
    locale: "pt_BR",
    url: "https://nobile.watches",
    images: [
      {
        url: "/assets/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Nobile - Relógios de Luxo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobile - Relógios de Luxo Autênticos",
    description: "Marketplace seguro para comprar e vender relógios de luxo",
    images: ["/assets/og-home.jpg"],
  },
  alternates: {
    canonical: "https://nobile.watches",
  },
};
