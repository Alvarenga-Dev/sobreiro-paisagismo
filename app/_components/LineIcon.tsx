import type { SVGProps } from "react";

export const lineIconNames = [
  "utensils",
  "waves",
  "plant",
  "building",
  "arrowLeft",
  "arrowRight",
  "award",
  "calendar",
  "chevronRight",
  "close",
  "droplet",
  "grid",
  "home",
  "instagram",
  "youtube",
  "whatsapp",
  "graduationCap",
  "leaf",
  "lotus",
  "mail",
  "message",
  "pin",
  "phone",
  "shield",
  "sprout",
  "sun",
  "user",
  "users",
] as const;

export type LineIconName = (typeof lineIconNames)[number];

export function isLineIconName(value: string): value is LineIconName {
  return lineIconNames.some((name) => name === value);
}

export interface LineIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: LineIconName;
  size?: "sm" | "md" | "lg";
  decorative?: boolean;
  label?: string;
}

const iconPaths: Record<LineIconName, React.ReactNode> = {
  utensils: <path d="M5 3v7m3-7v7M3 3v5a3 3 0 0 0 6 0V3M6 11v10M18 3c-3 3-4 7 0 9V3Zm0 9v9" />,
  waves: <path d="M3 6q3-4 6 0t6 0 6 0M3 12q3-4 6 0t6 0 6 0M3 18q3-4 6 0t6 0 6 0" />,
  plant: <path d="M7 15h10l-2 6H9l-2-6Zm5 0V8m0 3C6 11 4 8 5 4c5 0 7 3 7 7Zm0-2c0-4 3-6 7-6 0 4-2 6-7 6Z" />,
  building: <path d="M5 21V3h14v18M3 21h18M9 7h1m4 0h1M9 11h1m4 0h1M10 21v-6h4v6" />,
  arrowLeft: <path d="m15 18-6-6 6-6M9 12h11" />,
  arrowRight: <path d="m9 18 6-6-6-6m6 6H4" />,
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.7 13-1.2 8 4.5-2.5 4.5 2.5-1.2-8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M7 3v4m10-4v4M3.5 9.5h17M8 13h.01m4 0h.01m4 0h.01m-8 3.5h.01m4 0h.01" strokeWidth="2" />
    </>
  ),
  chevronRight: <path d="m9 5 7 7-7 7" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  droplet: <path d="M12 3.5S6.5 9.4 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.4 12 3.5 12 3.5Z" />,
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  home: <path d="m3.5 10.5 8.5-7 8.5 7M5.5 9v11h13V9M9.5 20v-6h5v6" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4l-4.4 1.4 1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z" />
      <path d="M8.2 7.6c.3-.3.8-.2 1 .2l1 2c.2.3.1.7-.2.9l-.8.6a8 8 0 0 0 3.5 3.5l.6-.8c.2-.3.6-.4.9-.2l2 1c.4.2.5.7.2 1-.7.9-1.8 1.3-2.9.9a10.5 10.5 0 0 1-6.2-6.2c-.4-1.1 0-2.2.9-2.9Z" />
    </>
  ),
  graduationCap: (
    <>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.5V16c2.9 2.4 7.1 2.4 10 0v-4.5M21 9v6" />
    </>
  ),
  leaf: (
    <>
      <path d="M19.5 4.5C12 4.8 6.1 8.2 5.1 14.2c-.5 3 1.6 5.3 4.7 4.8 5.9-1 9.3-6.8 9.7-14.5Z" />
      <path d="M4 20c3.2-5.6 6.7-8.7 11.4-11.3M10.5 12.5l.3 4.6m2.8-7.2 3.2.7" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-3.8-3.4-5.1-7.1 0-13.7 5.1 6.6 3.8 10.3 0 13.7Z" />
      <path d="M11.2 19.6C6 18.8 3.4 16 4 10.1c4.8 1 7.1 4.1 7.2 9.5Zm1.6 0C18 18.8 20.6 16 20 10.1c-4.8 1-7.1 4.1-7.2 9.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m5 7 7 5.5L19 7" />
    </>
  ),
  message: (
    <>
      <path d="M20 11.5a7.8 7.8 0 0 1-8 7.5 8.4 8.4 0 0 1-3.6-.8L4 19.5l1.4-4A7.1 7.1 0 0 1 4 11.2 7.8 7.8 0 0 1 12 4a7.8 7.8 0 0 1 8 7.5Z" />
      <path d="M8.5 11.5h.01m3.49 0h.01m3.49 0h.01" strokeWidth="2.4" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5.1-8 11-8 11s-8-5.9-8-11a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: <path d="M6.5 4.5 9 4l2 5-2.5 1.5a14 14 0 0 0 5 5L15 13l5 2 .5 2.5c.2 1-0.5 2-1.5 2C11.3 19.5 4.5 12.7 4.5 5c0-1 .9-1.7 2-1.5Z" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.8 2.7 8.1 7 10 4.3-1.9 7-5.2 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sprout: <path d="M12 20V10m0 4c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Zm0-2c0-4.5 2.5-7 7-7 0 4.5-2.5 7-7 7Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3.5 20c.3-4.2 2-6.3 5.5-6.3s5.2 2.1 5.5 6.3m.3-5.5c3.5-.5 5.4 1.3 5.7 4.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.4-4.3 2.7-6.5 7-6.5s6.6 2.2 7 6.5" />
    </>
  ),
};

export function LineIcon({
  name,
  size = "md",
  decorative = true,
  label,
  className = "",
  ...svgProps
}: LineIconProps) {
  const accessibilityProps = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": label ?? name };

  return (
    <svg
      className={`lineIcon lineIcon--${size} ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...accessibilityProps}
      {...svgProps}
    >
      {iconPaths[name]}
    </svg>
  );
}
