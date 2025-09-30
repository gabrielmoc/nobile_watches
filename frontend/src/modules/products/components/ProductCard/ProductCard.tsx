import { formatPrice } from "@/lib/utils/formatters";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface Product {
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
  isFavorited?: boolean;
}

interface ProductCardProps {
  product: Product;
  onToggleFavorite?: (productId: string) => void;
}

export function ProductCard({ product, onToggleFavorite }: ProductCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/produto/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            {product.isFavorited ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
              {product.brand}
            </h3>
            <p className="text-sm text-gray-600">{product.title}</p>
            <p className="text-xs text-gray-500">{product.condition}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>

            <div className="flex items-center text-xs text-gray-500">
              <span>{product.seller.name}</span>
              {product.seller.verified && <span className="ml-1 text-green-500">✓</span>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
