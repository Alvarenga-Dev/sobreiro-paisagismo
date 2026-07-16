import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sobreiro Paisagismo",
  description: "Projeto em React.js e Next.js para a Sobreiro Paisagismo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
