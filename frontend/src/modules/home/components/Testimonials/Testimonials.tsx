import { CreditCardIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/solid";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Carlos Mendes",
      role: "Colecionador",
      avatar: "/images/avatars/carlos.jpg",
      rating: 5,
      text: "Comprei meu Rolex Submariner através da Nobile e foi uma experiência excepcional. Produto autêntico, entrega rápida e atendimento impecável.",
    },
    {
      id: 2,
      name: "Ana Silva",
      role: "Vendedora",
      avatar: "/images/avatars/ana.jpg",
      rating: 5,
      text: "Vendi meu Omega Seamaster aqui e fiquei impressionada com a transparência do processo. Recebi o pagamento rapidamente e sem complicações.",
    },
    {
      id: 3,
      name: "Roberto Santos",
      role: "Comprador",
      avatar: "/images/avatars/roberto.jpg",
      rating: 5,
      text: "A verificação de autenticidade me deu total confiança na compra. Recomendo a Nobile para qualquer pessoa interessada em relógios de luxo.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-600">
            Experiências reais de quem já comprou ou vendeu conosco
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))} */}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
              100% Autênticos
            </div>
            <div className="flex items-center">
              <TruckIcon className="w-5 h-5 text-blue-500 mr-2" />
              Entrega Segura
            </div>
            <div className="flex items-center">
              <CreditCardIcon className="w-5 h-5 text-purple-500 mr-2" />
              Pagamento Protegido
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
