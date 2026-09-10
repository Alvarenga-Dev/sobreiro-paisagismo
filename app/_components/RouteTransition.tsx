"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const transitionDuration = 260;

type TransitionPhase = "visible" | "leaving" | "entering";

interface TransitionState {
  readonly pathname: string;
  readonly phase: TransitionPhase;
}

export interface RouteTransitionProps {
  children: ReactNode;
  header: ReactNode;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RouteTransition({ children, header }: RouteTransitionProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [transition, setTransition] = useState<TransitionState>({ pathname, phase: "visible" });
  const observedPathnameRef = useRef(pathname);
  const controlledNavigationRef = useRef(false);
  const navigationTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const focusFrameRef = useRef<number | null>(null);
  const phase: TransitionPhase = transition.pathname === pathname ? transition.phase : "entering";

  const clearTimer = useCallback((timer: RefObject<number | null>) => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const focusCurrentMain = useCallback(() => {
    if (focusFrameRef.current !== null) window.cancelAnimationFrame(focusFrameRef.current);
    focusFrameRef.current = window.requestAnimationFrame(() => {
      focusFrameRef.current = null;
      document.querySelector<HTMLElement>("main#conteudo-principal")?.focus();
    });
  }, []);

  useEffect(() => {
    if (observedPathnameRef.current === pathname) return;

    observedPathnameRef.current = pathname;
    clearTimer(navigationTimerRef);
    const shouldFocusMain = controlledNavigationRef.current;
    controlledNavigationRef.current = false;
    clearTimer(enterTimerRef);
    enterTimerRef.current = window.setTimeout(() => {
      enterTimerRef.current = null;
      setTransition({ pathname, phase: "visible" });
      if (shouldFocusMain) focusCurrentMain();
    }, prefersReducedMotion() ? 0 : transitionDuration);

    return () => clearTimer(enterTimerRef);
  }, [clearTimer, focusCurrentMain, pathname]);

  useEffect(() => () => {
    clearTimer(navigationTimerRef);
    clearTimer(enterTimerRef);
    if (focusFrameRef.current !== null) window.cancelAnimationFrame(focusFrameRef.current);
  }, [clearTimer]);

  const handleNavigation = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || !(event.target instanceof Element)
    ) return;

    const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
    if (
      !anchor
      || anchor.hasAttribute("download")
      || (anchor.target && anchor.target !== "_self")
    ) return;

    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    if (destination.pathname === pathname) {
      if (phase === "leaving") {
        clearTimer(navigationTimerRef);
        controlledNavigationRef.current = false;
        setTransition({ pathname, phase: "visible" });
      }
      return;
    }

    event.preventDefault();
    const href = `${destination.pathname}${destination.search}${destination.hash}`;
    controlledNavigationRef.current = true;
    clearTimer(enterTimerRef);

    if (prefersReducedMotion()) {
      clearTimer(navigationTimerRef);
      setTransition({ pathname, phase: "visible" });
      router.push(href);
      return;
    }

    setTransition({ pathname, phase: "leaving" });
    clearTimer(navigationTimerRef);
    navigationTimerRef.current = window.setTimeout(() => {
      navigationTimerRef.current = null;
      setTransition({ pathname: destination.pathname, phase: "entering" });
      router.push(href);
    }, transitionDuration);
  };

  const routeIsHidden = phase !== "visible";

  return (
    <div className="siteShell" data-region="site-shell" onClickCapture={handleNavigation}>
      <a className="skipLink" href="#conteudo-principal">
        Ir para o conteúdo principal
      </a>
      {header}
      <div
        className={`routeViewport routeViewport--${phase}`}
        data-region="route-viewport"
        data-phase={phase}
        inert={routeIsHidden}
        aria-hidden={routeIsHidden ? "true" : undefined}
      >
        {children}
      </div>
    </div>
  );
}
