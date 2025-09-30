// import { MobileFilters } from "../components/MobileFilters";
// import { ProductsFilters } from "../components/ProductsFilters";
// import { ProductsGrid } from "../components/ProductsGrid";
import { ProductsHeader } from "../components/ProductsHeader/ProductsHeader";
// import { ProductsPagination } from "../components/ProductsPagination";
// import {
//   ProductsFiltersSkeleton,
//   ProductsGridSkeleton,
// } from "../components/ProductsSkeletons";

interface ProductsTemplateProps {
  searchParams: {
    q?: string;
    categoria?: string;
    marca?: string;
    preco_min?: string;
    preco_max?: string;
    condicao?: string;
    movimento?: string;
    material?: string;
    ordenar?: string;
    pagina?: string;
  };
}

export default function ProductsTemplate({ searchParams }: ProductsTemplateProps) {
  const {
    q = "",
    categoria = "",
    marca = "",
    preco_min = "",
    preco_max = "",
    condicao = "",
    movimento = "",
    material = "",
    ordenar = "relevancia",
    pagina = "1",
  } = searchParams;

  const currentPage = parseInt(pagina) || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <ProductsHeader
        searchQuery={q}
        activeFiltersCount={getActiveFiltersCount(searchParams)}
      />
    </div>
  );
}

// Helper function
function getActiveFiltersCount(searchParams: Record<string, string | undefined>) {
  const filterKeys = [
    "marca",
    "categoria",
    "preco_min",
    "preco_max",
    "condicao",
    "movimento",
    "material",
  ];
  return filterKeys.filter(key => searchParams[key] && searchParams[key] !== "").length;
}
