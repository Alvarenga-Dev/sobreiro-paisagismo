"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ProjectsCardList({ children }: { readonly children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;

        if (!target.matches(":focus-within")) target.setAttribute("data-entered", "");
        observer.unobserve(target);
      }
    });

    for (const item of list.children) {
      if (!item.hasAttribute("data-entered") && item.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(item);
      }
    }

    return () => observer.disconnect();
  }, [children]);

  return <ul ref={listRef} className="projectsCatalog__list">{children}</ul>;
}
