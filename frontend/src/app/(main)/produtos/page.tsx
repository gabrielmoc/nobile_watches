import ProductsTemplate from "@/modules/products/templates/ProductsTemplate";

export default function ProductsPage({ searchParams }: { searchParams: any }) {
  return <ProductsTemplate searchParams={searchParams} />;
}
