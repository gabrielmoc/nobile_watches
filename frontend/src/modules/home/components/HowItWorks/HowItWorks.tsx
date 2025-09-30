import {
  CreditCardIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export function HowItWorks() {
  const steps = [
    {
      icon: MagnifyingGlassIcon,
      title: "Encontre seu relógio",
      description:
        "Pesquise entre milhares de relógios autênticos de vendedores verificados.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Verificação de autenticidade",
      description: "Nossos especialistas verificam cada produto antes da entrega.",
    },
    {
      icon: CreditCardIcon,
      title: "Pagamento seguro",
      description: "Pague com segurança através de nossa plataforma protegida.",
    },
    {
      icon: TruckIcon,
      title: "Receba em casa",
      description: "Receba seu relógio com seguro e rastreamento completo.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compramos e vendemos relógios de luxo com total segurança e transparência.
            Conheça nosso processo simples e seguro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-500 font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>

              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
