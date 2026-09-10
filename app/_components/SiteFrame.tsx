import type { ReactNode } from "react";

export interface SiteFrameProps {
  footer: ReactNode;
  children: ReactNode;
  variant?: "inset" | "fullBleed";
}

export function SiteFrame({ footer, children, variant = "inset" }: SiteFrameProps) {
  return (
    <div
      className={`siteFrame siteFrame--${variant}`}
      data-region="frame"
      data-variant={variant}
    >
      <main id="conteudo-principal" tabIndex={-1}>{children}</main>
      {footer}
    </div>
  );
}
