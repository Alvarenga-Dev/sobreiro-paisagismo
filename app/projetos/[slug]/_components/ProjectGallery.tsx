"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { LineIcon } from "../../../_components/LineIcon";
import type { PortfolioImage } from "../../../_content/portfolioCatalog";

interface ProjectGalleryProps {
  readonly images: readonly PortfolioImage[];
}

interface GalleryDrag {
  readonly pointerId: number;
  readonly startX: number;
  readonly startScroll: number;
}

const trackId = "project-gallery-track";
const snapTolerance = 3;

function slidePositions(track: HTMLUListElement) {
  return Array.from(track.children, (slide) => {
    if (!(slide instanceof HTMLElement)) return { left: 0, right: 0 };
    return { left: slide.offsetLeft, right: slide.offsetLeft + slide.offsetWidth };
  });
}

function GalleryImage({ image, priority }: { readonly image: PortfolioImage; readonly priority: boolean }) {
  const ratio = image.width / image.height;
  const style: CSSProperties & { "--gallery-image-width": string; "--gallery-image-ratio": number } = {
    "--gallery-image-width": `${image.width}px`,
    "--gallery-image-ratio": ratio,
  };
  const desktopSize = `min(82vw, ${image.width}px, calc(clamp(24rem, 42vw, 35rem) * ${ratio}))`;
  const mobileSize = `min(82vw, ${image.width}px, ${19 * ratio}rem)`;
  const sizes = `${priority ? "" : "auto, "}(min-width: 48rem) ${desktopSize}, ${mobileSize}`;

  return (
    <li className="projectDetailGallery__item" style={style} role="listitem">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={90}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        draggable={false}
      />
    </li>
  );
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const scrollTarget = useRef<number | null>(null);
  const settleTimer = useRef<number | undefined>(undefined);
  const drag = useRef<GalleryDrag | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const cover = images[0];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      scrollTarget.current = null;
      setCanScroll(track.scrollWidth - track.clientWidth > 1);
    };

    measure();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    observer?.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(settleTimer.current);
    };
  }, [images.length]);

  function scrollToPosition(track: HTMLUListElement, left: number, behavior: ScrollBehavior = "auto") {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = Math.min(Math.max(left, 0), maxScroll);
    scrollTarget.current = target;
    track.scrollTo({ left: target, behavior });
  }

  function changePage(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track || !canScroll) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const start = Math.min(scrollTarget.current ?? track.scrollLeft, maxScroll);
    if (direction === 1 && start >= maxScroll - snapTolerance) {
      scrollToPosition(track, 0, "instant");
      return;
    }
    if (direction === -1 && start <= snapTolerance) {
      scrollToPosition(track, maxScroll, "instant");
      return;
    }

    const positions = slidePositions(track);
    if (direction === 1) {
      const firstObscured = positions.find(({ right }) => right > start + track.clientWidth + snapTolerance);
      scrollToPosition(track, firstObscured?.left ?? maxScroll);
    } else {
      const firstOnPreviousPage = positions.find(({ left }) => left >= start - track.clientWidth - snapTolerance);
      scrollToPosition(track, firstOnPreviousPage?.left ?? 0);
    }
  }

  function handleScroll() {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track || drag.current) return;
      scrollTarget.current = null;

      const left = track.scrollLeft;
      const right = left + track.clientWidth;
      const visible = slidePositions(track).flatMap((slide, index) => (
        slide.left >= left - snapTolerance && slide.right <= right + snapTolerance ? [index + 1] : []
      ));
      const first = visible[0];
      const last = visible.at(-1);
      if (!first || !last) return;
      setAnnouncement(first === last
        ? `Imagem ${first} de ${images.length}`
        : `Imagens ${first} a ${last} de ${images.length}`);
    }, 160);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !canScroll) return;
    const track = event.currentTarget;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        changePage(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        changePage(1);
        break;
      case "Home":
        event.preventDefault();
        scrollToPosition(track, 0);
        break;
      case "End":
        event.preventDefault();
        scrollToPosition(track, track.scrollWidth - track.clientWidth);
        break;
    }
  }

  function startDrag(event: PointerEvent<HTMLUListElement>) {
    scrollTarget.current = null;
    if (!canScroll || event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    drag.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
    track.dataset.dragging = "";
  }

  function moveDrag(event: PointerEvent<HTMLUListElement>) {
    const activeDrag = drag.current;
    if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = activeDrag.startScroll + activeDrag.startX - event.clientX;
  }

  function endDrag(event: PointerEvent<HTMLUListElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    const track = event.currentTarget;
    drag.current = null;
    delete track.dataset.dragging;
    handleScroll();
  }

  if (!cover) return null;
  const style: CSSProperties & { "--gallery-cover-ratio": number } = {
    "--gallery-cover-ratio": cover.width / cover.height,
  };

  return (
    <section className="projectDetailGallery" aria-labelledby="project-gallery-title" style={style}>
      <div className="projectDetailGallery__frame">
        <ul
          className="projectDetailGallery__track"
          id={trackId}
          role="list"
          aria-labelledby="project-gallery-title"
          tabIndex={canScroll ? 0 : undefined}
          ref={trackRef}
          onScroll={handleScroll}
          onWheel={() => { scrollTarget.current = null; }}
          onKeyDown={handleKeyDown}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onLostPointerCapture={endDrag}
        >
          {images.map((image, index) => (
            <GalleryImage key={image.file} image={image} priority={index === 0} />
          ))}
        </ul>
        {canScroll ? (
          <>
            <button
              type="button"
              className="projectDetailGallery__arrow projectDetailGallery__arrow--previous"
              aria-label="Imagens anteriores"
              aria-controls={trackId}
              onClick={() => changePage(-1)}
            >
              <LineIcon name="arrowLeft" />
            </button>
            <button
              type="button"
              className="projectDetailGallery__arrow projectDetailGallery__arrow--next"
              aria-label="Próximas imagens"
              aria-controls={trackId}
              onClick={() => changePage(1)}
            >
              <LineIcon name="arrowRight" />
            </button>
          </>
        ) : null}
      </div>
      <div className="projectDetailGallery__caption">
        <h2 id="project-gallery-title">Galeria do projeto</h2>
        <p>{images.length} {images.length === 1 ? "imagem" : "imagens"}</p>
      </div>
      <p className="visuallyHidden" aria-live="polite" aria-atomic="true">{announcement}</p>
    </section>
  );
}
