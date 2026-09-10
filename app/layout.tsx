import type { Metadata, Viewport } from "next";
import { RouteTransition } from "./_components/RouteTransition";
import { SiteHeader } from "./_components/SiteHeader";
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
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <RouteTransition header={<SiteHeader />}>{children}</RouteTransition>
      </body>
    </html>
  );
}
