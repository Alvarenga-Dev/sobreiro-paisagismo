"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { PortfolioImage } from "../../../_content/portfolioCatalog";
import type { GalleryMediaOrientation, GalleryRowKind } from "../projectDetailMedia";

export interface DeferredGalleryImageProps {
  readonly className: string;
  readonly image: PortfolioImage;
  readonly orientation: GalleryMediaOrientation;
  readonly pairIndex?: number;
  readonly role: "lead" | GalleryRowKind;
  readonly sizes: string;
}

function subscribeToBrowserCapability() {
  return () => undefined;
}

function lacksIntersectionObserver() {
  return !("IntersectionObserver" in window);
}

function serverFallbackSnapshot() {
  return false;
}

export function DeferredGalleryImage({
  className,
  image,
  orientation,
  pairIndex,
  role,
  sizes,
}: DeferredGalleryImageProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldUseFallback = useSyncExternalStore(
    subscribeToBrowserCapability,
    lacksIntersectionObserver,
    serverFallbackSnapshot,
  );
  const shouldRenderImage = shouldLoad || shouldUseFallback;

  useEffect(() => {
    const item = itemRef.current;
    if (!item || shouldUseFallback) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: "240px 0px" });

    observer.observe(item);
    return () => observer.disconnect();
  }, [shouldUseFallback]);

  return (
    <li
      className={className}
      data-gallery-role={role}
      data-load-state={isLoaded ? "loaded" : shouldRenderImage ? "loading" : "waiting"}
      data-orientation={orientation}
      data-row-position={role === "lead" ? undefined : pairIndex}
      ref={itemRef}
      role="listitem"
    >
      {shouldRenderImage ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading="lazy"
          onError={() => setIsLoaded(true)}
          onLoad={() => setIsLoaded(true)}
          style={{ objectPosition: image.position ?? "center center" }}
        />
      ) : null}
    </li>
  );
}
