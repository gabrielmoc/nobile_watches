import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Nobile - Marketplace de Relógios de Luxo",
    template: "%s | Nobile",
  },
  description:
    "A plataforma mais segura para comprar e vender relógios de luxo no Brasil",
  keywords: [
    "relógios de luxo",
    "marketplace",
    "Rolex",
    "Omega",
    "Patek Philippe",
    "comprar relógios",
    "vender relógios",
    "autenticidade garantida",
  ],
  authors: [
    {
      name: "Gabriel Cavalcanti",
      url: "https://gabrielcavalcanti.tech",
    },
  ],
  creator: "Gabriel Cavalcanti",
  publisher: "Nobile Watches",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://nobile.watches",
    siteName: "Nobile",
    title: "Nobile - Marketplace de Relógios de Luxo",
    description:
      "A plataforma mais segura para comprar e vender relógios de luxo no Brasil",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nobile - Relógios de Luxo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobile - Marketplace de Relógios de Luxo",
    description:
      "A plataforma mais segura para comprar e vender relógios de luxo no Brasil",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preload"
          href="/fonts/erstoria.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/lato.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.nobile.com" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body>
        <Header />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('Nobile Watches loaded');
            `,
          }}
        />
      </body>
    </html>
  );
}
