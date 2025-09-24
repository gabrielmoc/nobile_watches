"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";

interface Watch {
  id: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
}

interface HomeClientProps {
  initialWatches: Watch[];
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction: "prev" | "next";
}

const HomeClient = ({ initialWatches }: HomeClientProps) => {
  const [relogios, setRelogios] = useState<Watch[]>(initialWatches);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialWatches.length) {
      const fetchWatches = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
          const response = await fetch(`${apiUrl}/api/watches`);

          if (!response.ok) {
            console.log(`Erro ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          const ultimos = data
            .sort(
              (a: Watch, b: Watch) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 4);

          setRelogios(ultimos);
        } catch (erro) {
          console.error("Erro ao buscar relógios:", erro);
          setError("Não foi possível carregar os relógios no momento");
        } finally {
          setIsLoading(false);
        }
      };

      fetchWatches();
    }
  }, [initialWatches.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const Arrow = ({ className, style, onClick, direction }: ArrowProps) => (
    <button
      type="button"
      className={`${className} custom-arrow ${direction}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      aria-label={direction === "prev" ? "Anterior" : "Próximo"}
    >
      <Image
        src={direction === "prev" ? "/assets/prev.png" : "/assets/next.png"}
        alt=""
        width={25}
        height={25}
      />
    </button>
  );

  const destaquesSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "15%",
    responsive: [
      { breakpoint: 1280, settings: { centerPadding: "12%" } },
      { breakpoint: 991, settings: { centerPadding: "10%" } },
      { breakpoint: 768, settings: { centerPadding: "8%" } },
      { breakpoint: 480, settings: { centerPadding: "0" } },
    ],
    prevArrow: <Arrow direction="prev" />,
    nextArrow: <Arrow direction="next" />,
  };

  const marcas = [
    { img: "/assets/marca1.svg", nome: "Rolex", href: "/marcas/rolex" },
    { img: "/assets/marca2.svg", nome: "Tag Heuer", href: "/marcas/tag-heuer" },
    { img: "/assets/marca3.svg", nome: "Breitling", href: "/marcas/breitling" },
    {
      img: "/assets/marca4.svg",
      nome: "Audemars Piguet",
      href: "/marcas/audemars-piguet",
    },
    { img: "/assets/marca5.svg", nome: "Patek Philippe", href: "/marcas/patek-philippe" },
    { img: "/assets/marca6.svg", nome: "Hublot", href: "/marcas/hublot" },
    { img: "/assets/marca7.svg", nome: "Cartier", href: "/marcas/cartier" },
    { img: "/assets/marca8.svg", nome: "Seiko", href: "/marcas/seiko" },
    { img: "/assets/marca9.svg", nome: "Omega", href: "/marcas/omega" },
    { img: "/assets/marca10.svg", nome: "IWC", href: "/marcas/iwc" },
    { img: "/assets/marca11.svg", nome: "Panerai", href: "/marcas/panerai" },
    { img: "/assets/marca12.svg", nome: "Tissot", href: "/marcas/tissot" },
  ];

  const etapas = [
    {
      img: "/assets/fim1.svg",
      titulo: "Você escolhe o seu relógio",
      descricao: "Explore nossa coleção e encontre o relógio perfeito para você.",
    },
    {
      img: "/assets/fim2.svg",
      titulo: "Realiza o pagamento",
      descricao: "Finalize sua compra com segurança e diversas opções de pagamento.",
    },
    {
      img: "/assets/fim3.svg",
      titulo: "Vendedor envia o relógio",
      descricao: "O vendedor despacha seu relógio com cuidado e segurança.",
    },
    {
      img: "/assets/fim4.svg",
      titulo: "Certificamos a autenticidade",
      descricao:
        "Nosso time de especialistas verifica cada detalhe para garantir a originalidade.",
    },
    {
      img: "/assets/fim5.svg",
      titulo: "Seu relógio é entregue",
      descricao: "Receba seu relógio com toda a segurança e proteção que você merece.",
    },
    {
      img: "/assets/fim6.svg",
      titulo: "Vendedor recebe o valor",
      descricao: "O pagamento é liberado ao vendedor após a confirmação da entrega.",
    },
  ];

  const handleFavorite = (watchId: string) => {
    console.log("Favoritado:", watchId);
  };

  return (
    <div className="home-container">
      {/* Banner Slider */}
      <section aria-label="Banners principais">
        <Slider {...settings}>
          <div className="initial-content">
            <Link href="/promocoes/banner-1" aria-label="Ver promoção 1">
              <Image
                src="/assets/banner1.svg"
                alt="Promoção especial em relógios de luxo"
                className="banner-img"
                width={1200}
                height={400}
                priority
              />
            </Link>
          </div>
          <div className="initial-content">
            <Link href="/promocoes/banner-2" aria-label="Ver promoção 2">
              <Image
                src="/assets/banner2.svg"
                alt="Novos lançamentos em relógios"
                className="banner-img"
                width={1200}
                height={400}
                sizes="100vw"
              />
            </Link>
          </div>
          <div className="initial-content">
            <Link href="/promocoes/banner-3" aria-label="Ver promoção 3">
              <Image
                src="/assets/banner3.svg"
                alt="Coleção exclusiva de relógios"
                className="banner-img"
                width={1200}
                height={400}
                sizes="100vw"
              />
            </Link>
          </div>
          <div className="initial-content">
            <Link href="/promocoes/banner-4" aria-label="Ver promoção 4">
              <Image
                src="/assets/banner4.svg"
                alt="Ofertas especiais relógios de luxo"
                className="banner-img"
                width={1200}
                height={400}
                sizes="100vw"
              />
            </Link>
          </div>
        </Slider>
      </section>

      {/* Marcas */}
      <section className="marcas" aria-label="Marcas de relógios">
        <div className="marcas-slider">
          {marcas.map((marca, index) => (
            <Link
              href={marca.href}
              className="marca"
              key={index}
              aria-label={`Ver relógios ${marca.nome}`}
            >
              <div className="marca-icon">
                <Image
                  src={marca.img}
                  alt={`Logo ${marca.nome}`}
                  width={40}
                  height={40}
                />
              </div>
              <p>{marca.nome}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sugestões para você */}
      <section className="sugestoes" aria-label="Sugestões de relógios">
        <div className="sugestoes-topo">
          <h2 className="titulo">Sugestões para você</h2>
          <Link href="/relogios" className="ver-tudo">
            Ver tudo
          </Link>
        </div>

        <div className="sugestoes-grid">
          {relogios.map((relogio, index) => (
            <div className="relogio-card" key={index}>
              <div className="relogio-imagem">
                <Image
                  src={relogio.images[0]}
                  alt={`${relogio.brand} ${relogio.model}`}
                  width={300}
                  height={300}
                  className="relogio-img"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="relogio-marca">
                {relogio.brand}
                <Image
                  src="/assets/feedback.svg"
                  alt="Selo de confiança"
                  className="icon-verificado"
                  width={14}
                  height={14}
                />
              </p>
              <h3 className="relogio-nome">{relogio.model}</h3>
              <p className="relogio-descricao">{relogio.description}</p>
              <div className="relogio-preco-fav">
                <p className="relogio-preco">
                  R$ {Number(relogio.price).toLocaleString("pt-BR")}
                </p>
                <Image
                  src="/assets/coracao.svg"
                  alt="Favoritar"
                  className="icon-coracao"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seguro */}
      <section className="secao-protecao" aria-label="Proteção na compra">
        <picture>
          <source media="(max-width: 991px)" srcSet="/assets/prot-mbl.svg" />
          <Image
            src="/assets/prot-dsk.svg"
            alt="Proteção completa na compra com seguro e garantia de autenticidade"
            width={1200}
            height={300}
            sizes="100vw"
          />
        </picture>
      </section>

      {/* Relógios em Destaque */}
      <section className="secao-destaques" aria-label="Relógios em destaque">
        <h2 className="titulo-destaques">RELÓGIOS EM DESTAQUE</h2>

        {relogios.length > 0 && (
          <Slider {...destaquesSettings}>
            {relogios.map(relogio => (
              <div className="slide-destaque" key={`destaque-${relogio.id}`}>
                <Link href={`/relogios/${relogio.id}`}>
                  <Image
                    src={relogio.images[0]}
                    alt={`${relogio.brand} ${relogio.model}`}
                    className="imagem-destaque"
                    width={350}
                    height={350}
                    style={{ objectFit: "contain" }}
                  />
                </Link>
                <p className="nome-destaque">{relogio.model}</p>
                <p className="preco-destaque">
                  R$ {Number(relogio.price).toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
          </Slider>
        )}
      </section>

      {/* Vendedores Destaque */}
      <section className="vendedores-svg" aria-label="Vendedores em destaque">
        <h2 className="vendedoresm-titulo">Vendedores destaque</h2>

        <div className="vendedores-svg-grid">
          <div className="vend-svg-item">
            <Link href="/vendedores/cordial-watches" className="vend-svg-card">
              <Image
                src="/assets/vend1.svg"
                alt="Cordial Watches"
                width={388}
                height={200}
              />
            </Link>
            <p className="vend-nome">Cordial Watches</p>
          </div>

          <div className="vend-svg-item">
            <Link href="/vendedores/tmg-time-gateways" className="vend-svg-card">
              <Image
                src="/assets/vend2.svg"
                alt="TMG Time Gateways"
                width={388}
                height={200}
              />
            </Link>
            <p className="vend-nome">TMG Time Gateways</p>
          </div>

          <div className="vend-svg-item">
            <Link href="/vendedores/fist-wear" className="vend-svg-card">
              <Image src="/assets/vend3.svg" alt="Fist Wear" width={388} height={200} />
            </Link>
            <p className="vend-nome">Fist Wear.</p>
          </div>

          <div className="vend-svg-item">
            <Link href="/vendedores/linksor-joias" className="vend-svg-card">
              <Image
                src="/assets/vend4.svg"
                alt="Linksor Joias"
                width={388}
                height={200}
              />
            </Link>
            <p className="vend-nome">Linksor Joias</p>
          </div>
        </div>

        <Link href="/vendedores" className="vend-btn-mobile">
          Ver todos vendedores
        </Link>
      </section>

      {/* Vire Vendedor */}
      <section className="vire-vendedor" aria-label="Torne-se um vendedor">
        <Link
          href="/vender"
          className="vire-vendedor__link"
          aria-label="Vire vendedor na Nobile"
        >
          <picture>
            <source media="(max-width: 991px)" srcSet="/assets/mob.svg" />
            <Image
              src="/assets/desk.svg"
              alt="Vire vendedor na Nobile - Plataforma segura e elegante"
              width={1200}
              height={300}
              sizes="100vw"
            />
          </picture>
        </Link>
        <p>
          Oferecemos uma plataforma segura, elegante e com visibilidade internacional para
          que você possa vender suas peças com confiança.
        </p>
      </section>

      {/* Como Funciona */}
      <section className="como-funciona" aria-label="Como funciona o processo">
        <p className="subtitulo">Como funciona</p>
        <h2 className="titulo">
          Entregamos com segurança
          <br />e garantia de qualidade
        </h2>

        <div className="etapas">
          {etapas.map((etapa, index) => (
            <div className="etapa" key={index}>
              <Image src={etapa.img} alt="" width={80} height={80} role="presentation" />
              <h3>{etapa.titulo}</h3>
              <p>{etapa.descricao}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeClient;
