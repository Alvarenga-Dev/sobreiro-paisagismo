import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sobreiro Paisagismo | Projetos que transformam espaços",
  description:
    "Paisagismo autoral para residências e espaços de convivência, unindo natureza, arquitetura e bem-estar.",
};

export const viewport: Viewport = {
  themeColor: "#080b04",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
