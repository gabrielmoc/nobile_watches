import { Button } from "@/components/ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SearchPageProps {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata(props: SearchPageProps): Promise<Metadata> {
  const params = await props.params;
  const query = decodeURIComponent(params.query);

  return {
    title: `Busca: ${query} - Nobile`,
    description: `Resultados da busca por "${query}" na Nobile.`,
  };
}

export default async function SearchPage(props: SearchPageProps) {
  const params = await props.params;
  const query = decodeURIComponent(params.query);

  if (!query) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="space-y-6 mb-8">
          <nav className="flex items-center gap-2 text-[18px] font-erstoria">
            <Link
              href="/"
              className="text-[#141414] hover:text-[#D5A60A] transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-400">A sua pesquisa</span>
          </nav>

          {/* Título da busca */}
          <h1 className="font-erstoria text-3xl md:text-4xl text-[#141414] mb-2">
            {query}
          </h1>
        </div>
        {/* Mensagem de verificação de ortografia */}
        <p className="text-gray-500 text-sm mb-8">
          Você verificou a ortografia? Edite sua pesquisa ou tente outro termo de busca.
        </p>

        {/* Card de nenhum resultado */}
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
          </div>

          <h2 className="font-erstoria text-2xl md:text-3xl text-[#141414] mb-4">
            Nunca mais perca de vista as melhores ofertas!
          </h2>

          <p className="text-gray-600 mb-8">
            Guarde esta pesquisa para ser notificado quando existirem novos anúncios.
          </p>

          <Button variant="outline" size="lg" className="inline-flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Guardar pesquisa
          </Button>
        </div>

        {/* Seção de descoberta */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="font-erstoria text-2xl md:text-3xl text-[#141414]">
              Descubra
            </h2>
            <span className="text-2xl">🔥</span>
          </div>

          {/* Grid de categorias sugeridas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/produtos?categoria=masculino"
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-lato font-semibold text-lg">
                  Relógios de homem
                </p>
              </div>
            </Link>

            <Link
              href="/produtos?condicao=usado"
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-lato font-semibold text-lg">
                  Relógios usados
                </p>
              </div>
            </Link>

            <Link
              href="/produtos?categoria=bolso"
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-lato font-semibold text-lg">
                  Relógios de bolso
                </p>
              </div>
            </Link>

            <Link
              href="/produtos?categoria=feminino"
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-lato font-semibold text-lg">
                  Relógios de senhora
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sugestão de voltar */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
