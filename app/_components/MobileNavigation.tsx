"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteContent } from "../_content/siteContent";
import { MenuTrigger } from "./MenuTrigger";
import { MobileMenu } from "./MobileMenu";
import type { MobileMenuContent } from "../_content/siteContent";

type MenuPhase = "closed" | "opening" | "open" | "closing";
type CloseReason = "control" | "escape" | "backdrop" | "navigation";

export interface MobileNavigationProps {
  content?: MobileMenuContent;
}

export function MobileNavigation({ content = siteContent.mobileMenu }: MobileNavigationProps) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overflowRef = useRef<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const cleanup = useCallback((restoreFocus: boolean) => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
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
    if (reason === "navigation") {
      cleanup(false);
      return;
    }
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
      window.setTimeout(() => setPhase("open"), 0);
    } catch {
      window.setTimeout(() => cleanup(false), 0);
    }
  }, [cleanup, phase]);

  useEffect(() => () => cleanup(false), [cleanup]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 40rem)");
    const handleChange = () => { if (media.matches) close("control"); };
    media.addEventListener?.("change", handleChange);
    return () => media.removeEventListener?.("change", handleChange);
  }, [close]);

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

  const activeId = pathname === "/sobre" ? "about" : "home";

  return (
    <div className="mobileNavigation">
      <MenuTrigger ref={triggerRef} expanded={phase !== "closed"} controlsId="mobile-menu-panel" onExpandedChange={(expanded) => expanded ? open() : close("control")} />
      {phase !== "closed" ? <MobileMenu content={content} activeId={activeId} onClose={() => close("control")} onCancel={handleCancel} onBackdropClick={handleBackdrop} onKeyDown={handleKeyDown} dialogRef={dialogRef} closeButtonRef={closeButtonRef} phase={phase === "closing" ? "closing" : phase} /> : null}
    </div>
  );
}
