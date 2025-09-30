interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export function Categories() {
  const categories: Category[] = [
    {
      id: "1",
      name: "Patek Philippe",
      slug: "patek-philippe",
      image: "/images/brands/patek-philippe.jpg",
      productCount: 1247,
    },
    {
      id: "2",
      name: "Rolex",
      slug: "rolex",
      image: "/images/brands/rolex.jpg",
      productCount: 8934,
    },
    {
      id: "3",
      name: "Omega",
      slug: "omega",
      image: "/images/brands/omega.jpg",
      productCount: 2156,
    },
    {
      id: "4",
      name: "Audemars Piguet",
      slug: "audemars-piguet",
      image: "/images/brands/ap.jpg",
      productCount: 567,
    },
    {
      id: "5",
      name: "Breitling",
      slug: "breitling",
      image: "/images/brands/breitling.jpg",
      productCount: 1890,
    },
    {
      id: "6",
      name: "Tag Heuer",
      slug: "tag-heuer",
      image: "/images/brands/tag-heuer.jpg",
      productCount: 3245,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Marcas em Destaque
          </h2>
          <p className="text-lg text-gray-600">
            Explore as marcas mais prestigiadas do mundo da alta relojoaria
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* {categories.map(category => (
            <Link
              key={category.id}
              href={`/produtos?marca=${category.slug}`}
              className="group"
            >
              <div className="text-center">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 group-hover:shadow-lg transition-shadow">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.productCount.toLocaleString("pt-BR")} produtos
                </p>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
    </section>
  );
}
