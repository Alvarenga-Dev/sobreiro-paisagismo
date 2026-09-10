import type { ReactNode } from "react";
import { LineIcon } from "./LineIcon";

export type ButtonLinkVariant = "accent" | "outlineInverse" | "outlineNeutral";
export type ButtonLinkSize = "md" | "lg";

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "accent",
  size = "md",
  leadingIcon,
  trailingIcon,
  ariaLabel,
  className = "",
  disabled = false,
  external = false,
}: ButtonLinkProps) {
  const classes = `buttonLink buttonLink--${variant} buttonLink--${size} ${className}`.trim();

  if (disabled) {
    return (
      <a className={classes} aria-disabled="true" data-disabled="true" aria-label={ariaLabel}>
        {leadingIcon}
        <span>{children}</span>
        {trailingIcon}
      </a>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </a>
  );
}

export interface PresetButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function ContactButton({ href, label, className }: PresetButtonProps) {
  return (
    <ButtonLink
      href={href}
      className={className}
      variant="accent"
      leadingIcon={<LineIcon name="message" size="md" />}
    >
      {label}
    </ButtonLink>
  );
}

export function SecondaryButton({ href, label, className }: PresetButtonProps) {
  return (
    <ButtonLink href={href} className={className} variant="outlineNeutral">
      {label}
    </ButtonLink>
  );
}

export function SectionAction({ href, label, className }: PresetButtonProps) {
  return (
    <ButtonLink
      href={href}
      className={className}
      variant="outlineInverse"
      trailingIcon={<LineIcon name="arrowRight" size="sm" />}
    >
      {label}
    </ButtonLink>
  );
}

export interface ActionGroupProps {
  children: ReactNode;
  className?: string;
}

export function ActionGroup({ children, className = "" }: ActionGroupProps) {
  return <div className={`actionGroup ${className}`.trim()}>{children}</div>;
}
