import Image from "next/image";
import type { ReactNode } from "react";

const flowerEmblemSources = {
  olive: "/images/portfolio/logo/flor-sobreiro-verde-oliva.svg",
  light: "/images/portfolio/logo/flor-sobreiro-neutra-clara.svg",
} as const;

export type BrandEmblemArtwork = "fallback" | "flower";
export type BrandFlowerTone = keyof typeof flowerEmblemSources;

export interface BrandEmblemProps {
  label?: string;
  decorative?: boolean;
  artwork?: BrandEmblemArtwork;
  flowerTone?: BrandFlowerTone;
  className?: string;
}

export function BrandEmblem({
  label = "Emblema da Sobreiro Paisagismo",
  decorative = false,
  artwork = "fallback",
  flowerTone = "olive",
  className = "",
}: BrandEmblemProps) {
  const accessibilityProps = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": label };

  if (artwork === "flower") {
    return (
      <span
        className={`brandEmblem brandEmblem--flower ${className}`.trim()}
        {...accessibilityProps}
      >
        <Image
          className="brandEmblem__artwork"
          src={flowerEmblemSources[flowerTone]}
          alt=""
          width={658}
          height={537}
        />
      </span>
    );
  }

  return (
    <svg
      className={`brandEmblem ${className}`.trim()}
      viewBox="0 0 64 64"
      fill="none"
      focusable="false"
      {...accessibilityProps}
    >
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1.25" />
      <path d="M32 49V17m0 7c-7-1.2-10-6-10-10 6 1 10 5 10 10Zm0 9c7-1.2 10-6 10-10-6 1-10 5-10 10Zm0 8c-8-1.1-13-5.4-14-11 7.3.2 12 3.6 14 11Zm0 0c8-1.1 13-5.4 14-11-7.3.2-12 3.6-14 11Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 48h28" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export interface BrandLockupProps {
  href?: string;
  compact?: boolean;
  presentation?: "horizontal" | "stacked";
  emblem?: BrandEmblemArtwork;
  className?: string;
}

export function BrandLockup({
  href = "/",
  compact = false,
  presentation = "horizontal",
  emblem = "fallback",
  className = "",
}: BrandLockupProps) {
  return (
    <a
      className={`brandLockup ${compact ? "brandLockup--compact" : ""} ${presentation === "stacked" ? "brandLockup--stacked" : ""} ${className}`.trim()}
      href={href}
      aria-label="Sobreiro Paisagismo — página inicial"
    >
      <BrandEmblem artwork={emblem} decorative />
      <span className="brandLockup__wordmark" translate="no">
        <strong>Sobreiro</strong>
        <small>Paisagismo</small>
      </span>
    </a>
  );
}

export interface FooterBrandProps {
  description: string;
  children?: ReactNode;
}

export function FooterBrand({ description, children }: FooterBrandProps) {
  return (
    <div className="footerBrand">
      <BrandLockup emblem="flower" />
      <p>{description}</p>
      {children}
    </div>
  );
}

export interface BotanicalDecorationProps {
  position?: "left" | "right";
  className?: string;
}

export function BotanicalDecoration({ position = "right", className = "" }: BotanicalDecorationProps) {
  return (
    <svg
      className={`botanicalDecoration botanicalDecoration--${position} ${className}`.trim()}
      viewBox="0 0 220 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M32 226C73 177 112 120 166 20" stroke="currentColor" strokeWidth="1.2" />
      <path d="M66 176c-29 1-46-11-53-34 27-3 45 8 53 34Zm35-48c-23-10-33-27-29-49 23 7 34 23 29 49Zm33-51c-13-20-13-39 0-56 16 18 16 37 0 56Zm-50 76c27 0 44-12 50-35-26-2-43 10-50 35Zm43-59c24 4 41-5 51-27-24-6-42 3-51 27Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
