import type { ReactNode } from "react";

export interface SiteFrameProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
  variant?: "inset" | "fullBleed";
}

export function SiteFrame({ header, footer, children, variant = "inset" }: SiteFrameProps) {
  return (
    <div
      className={`siteFrame siteFrame--${variant}`}
      data-region="frame"
      data-variant={variant}
    >
      <a className="skipLink" href="#conteudo-principal">
        Ir para o conteúdo principal
      </a>
      {header}
      <main id="conteudo-principal">{children}</main>
      {footer}
    </div>
  );
}
