"use client";

import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { NavigationItem, NavigationItemId } from "../_content/siteContent";
import { resolveActiveNavigationId } from "./navigation";

interface IndicatorStyle extends CSSProperties {
  "--navigation-indicator-x": string;
  "--navigation-indicator-width": string;
}

interface IndicatorGeometry {
  readonly left: number;
  readonly width: number;
  readonly positioned: boolean;
}

export interface DesktopNavigationProps {
  navigation: readonly NavigationItem[];
}

function subscribeToHashChange(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function currentHash() {
  return window.location.hash;
}

export function DesktopNavigation({ navigation }: DesktopNavigationProps) {
  const pathname = usePathname() ?? "/";
  const hash = useSyncExternalStore(subscribeToHashChange, currentHash, () => "");
  const activeId = resolveActiveNavigationId(pathname, hash);
  const linkRefs = useRef(new Map<NavigationItemId, HTMLAnchorElement>());
  const animationFrameRef = useRef<number | null>(null);
  const [indicator, setIndicator] = useState<IndicatorGeometry>({ left: 0, width: 0, positioned: false });
  const [canAnimate, setCanAnimate] = useState(false);

  const measureIndicator = useCallback(() => {
    const activeLink = activeId ? linkRefs.current.get(activeId) : undefined;
    if (!activeLink) {
      setIndicator({ left: 0, width: 0, positioned: false });
      return;
    }

    setIndicator({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      positioned: true,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    measureIndicator();
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      setCanAnimate(true);
    });
    window.addEventListener("resize", measureIndicator);

    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) measureIndicator();
    });

    return () => {
      cancelled = true;
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", measureIndicator);
    };
  }, [measureIndicator]);

  const indicatorStyle: IndicatorStyle = {
    "--navigation-indicator-x": `${indicator.left}px`,
    "--navigation-indicator-width": `${indicator.width}px`,
  };

  return (
    <nav className="desktopNavigation" aria-label="Navegação principal">
      <ul className="desktopNavigation__list" style={indicatorStyle}>
        {navigation.map((item) => (
          <li key={item.id}>
            <a
              ref={(node) => {
                if (node) linkRefs.current.set(item.id, node);
                else linkRefs.current.delete(item.id);
              }}
              className="desktopNavigation__link"
              href={item.href}
              aria-current={item.id === activeId ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
        <span
          className="desktopNavigation__indicator"
          data-positioned={indicator.positioned ? "true" : "false"}
          data-animated={canAnimate ? "true" : "false"}
          aria-hidden="true"
        />
      </ul>
    </nav>
  );
}
