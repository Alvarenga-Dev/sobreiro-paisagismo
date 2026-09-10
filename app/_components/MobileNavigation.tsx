"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { siteContent } from "../_content/siteContent";
import { MenuTrigger } from "./MenuTrigger";
import { MobileMenu } from "./MobileMenu";
import { DESKTOP_NAVIGATION_MEDIA_QUERY, resolveActiveNavigationId } from "./navigation";
import type { MobileMenuContent, NavigationItem } from "../_content/siteContent";

type MenuPhase = "closed" | "opening" | "open" | "closing";
type CloseReason = "control" | "escape" | "backdrop" | "navigation";

export interface MobileNavigationProps {
  content?: MobileMenuContent;
  navigation?: readonly NavigationItem[];
}

function subscribeToHashChange(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function currentHash() {
  return window.location.hash;
}

export function MobileNavigation({
  content = siteContent.mobileMenu,
  navigation = siteContent.navigation,
}: MobileNavigationProps) {
  const pathname = usePathname() ?? "/";
  const hash = useSyncExternalStore(subscribeToHashChange, currentHash, () => "");
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overflowRef = useRef<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const openTimerRef = useRef<number | null>(null);

  const cleanup = useCallback((restoreFocus: boolean) => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    closeTimerRef.current = null;
    openTimerRef.current = null;
    if (dialogRef.current?.open) dialogRef.current.close();
    if (overflowRef.current !== null) {
      document.documentElement.style.overflow = overflowRef.current;
      overflowRef.current = null;
    }
    setPhase("closed");
    if (restoreFocus && triggerRef.current && document.contains(triggerRef.current) && getComputedStyle(triggerRef.current).display !== "none") {
      triggerRef.current.focus();
    }
  }, []);

  const close = useCallback((reason: CloseReason) => {
    if (phase === "closed" || phase === "closing") return;
    const restoreFocus = reason !== "navigation";
    setPhase("closing");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cleanup(restoreFocus);
      return;
    }
    closeTimerRef.current = window.setTimeout(() => cleanup(restoreFocus), 280);
  }, [cleanup, phase]);

  const open = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    try {
      if (!dialog.open) dialog.showModal();
      overflowRef.current = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      closeButtonRef.current?.focus();
      openTimerRef.current = window.setTimeout(() => {
        openTimerRef.current = null;
        setPhase("open");
      }, 0);
    } catch {
      openTimerRef.current = window.setTimeout(() => cleanup(false), 0);
    }
  }, [cleanup, phase]);

  useEffect(() => () => cleanup(false), [cleanup]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAVIGATION_MEDIA_QUERY);
    const handleChange = () => { if (media.matches) cleanup(false); };
    media.addEventListener?.("change", handleChange);
    return () => media.removeEventListener?.("change", handleChange);
  }, [cleanup]);

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close("escape");
  };

  const handleBackdrop = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close("backdrop");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close("escape");
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const activeId = resolveActiveNavigationId(pathname, hash);

  return (
    <div className="mobileNavigation">
      <MenuTrigger ref={triggerRef} expanded={phase !== "closed"} controlsId="mobile-menu-panel" onExpandedChange={(expanded) => expanded ? open() : close("control")} />
      {phase !== "closed" ? <MobileMenu content={content} navigation={navigation} activeId={activeId} onClose={() => close("control")} onNavigate={() => close("navigation")} onCancel={handleCancel} onBackdropClick={handleBackdrop} onKeyDown={handleKeyDown} dialogRef={dialogRef} closeButtonRef={closeButtonRef} phase={phase === "closing" ? "closing" : phase} /> : null}
    </div>
  );
}
