import Image from "next/image";
import Link from "next/link";
import "../styles/footer.css";

const fc = "/assets/fc.svg";
const ig = "/assets/ig.svg";
const logo = "/assets/logo.svg";
const tk = "/assets/tk.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-nobile">
      <div className="footer-content">
        <div className="footer-top">
          <div className="social-icons">
            <Link href="/">
              <Image
                src={logo}
                alt="Nobile"
                className="logo-img"
                width={180}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Image src={ig} alt="Instagram" width={32} height={32} />
            </Link>
            <Link href="#" aria-label="TikTok">
              <Image src={tk} alt="TikTok" width={32} height={32} />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Image src={fc} alt="Facebook" width={32} height={32} />
            </Link>
          </div>
          <p className="footer-description">
            Nascemos para ajudar vendedores e compradores a terem mais segurança.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Comprar na Nobile</h3>
            <ul>
              <li>
                <Link href="/seguro-comprador">Seguro do comprador</Link>
              </li>
              <li>
                <Link href="/garantia-autenticidade">Garantia de autenticidade</Link>
              </li>
              <li>
                <Link href="/processo-pagamento">Processo de pagamento</Link>
              </li>
              <li>
                <Link href="/termos">Políticas e termos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Vender na Nobile</h3>
            <ul>
              <li>
                <Link href="/guia-vendedores">Guia para vendedores</Link>
              </li>
              <li>
                <Link href="/vender-particular">Vender relógios como particular</Link>
              </li>
              <li>
                <Link href="/avaliacao-autenticidade">Avaliação de autenticidade</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Sobre a Nobile</h3>
            <ul>
              <li>
                <Link href="/sobre">Sobre nós</Link>
              </li>
              <li>
                <Link href="/como-funciona">Como funciona</Link>
              </li>
              <li>
                <Link href="/contato">Contato</Link>
              </li>
              <li>
                <Link href="/faq">Perguntas frequentes</Link>
              </li>
              <li>
                <Link href="/termos">Políticas e termos</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Desenvolvido por{" "}
          <Link
            href="https://gabrielcavalcanti.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-primary transition-colors"
          >
            Gabriel Cavalcanti
          </Link>{" "}
          © {currentYear}. Todos os direitos autorais reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
