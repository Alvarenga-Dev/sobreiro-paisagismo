import type { ReactNode } from "react";

export interface CardSurfaceProps {
  children: ReactNode;
  tone?: "light" | "dark" | "media";
  className?: string;
}

export function CardSurface({ children, tone = "light", className = "" }: CardSurfaceProps) {
  return <div className={`cardSurface cardSurface--${tone} ${className}`.trim()}>{children}</div>;
}
