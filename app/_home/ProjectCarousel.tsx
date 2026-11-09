"use client";

import { useRef, useState } from "react";
import { LineIcon } from "../_components/LineIcon";
import { PaginationDots } from "../_components/PaginationDots";
import { ProjectCard, type ProjectCardData } from "../_components/ProjectCard";

export interface ProjectCarouselProps {
  projects: readonly ProjectCardData[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  const lastIndex = Math.max(projects.length - 1, 0);

  function goTo(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), lastIndex);
    if (nextIndex === activeIndex) return;

    const track = trackRef.current;
    const firstSlide = track?.children.item(0);
    const item = track?.children.item(nextIndex);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (track && firstSlide instanceof HTMLElement && item instanceof HTMLElement) {
      track.scrollTo({
        left: item.offsetLeft - firstSlide.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    setActiveIndex(nextIndex);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  }

  function handleScroll() {
    const track = trackRef.current;
    const firstSlide = track?.children.item(0);

    if (!(track instanceof HTMLElement) || !(firstSlide instanceof HTMLElement)) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((slide, index) => {
      if (!(slide instanceof HTMLElement)) return;

      const snapPosition = Math.min(slide.offsetLeft - firstSlide.offsetLeft, maxScroll);
      const distance = Math.abs(snapPosition - track.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((currentIndex) => currentIndex === closestIndex ? currentIndex : closestIndex);
  }

  return (
    <div
      className="projectCarousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Projetos em destaque"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ul className="projectCarousel__track" ref={trackRef} onScroll={handleScroll}>
        {projects.map((project) => (
          <li className="projectCarousel__slide" key={project.id}>
            <ProjectCard project={project} presentation="compact" />
          </li>
        ))}
      </ul>
      <div className="projectCarousel__navigation">
        <button
          type="button"
          className="projectCarousel__arrow projectCarousel__arrow--previous"
          aria-label="Projeto anterior"
          aria-disabled={activeIndex === 0}
          tabIndex={activeIndex === 0 ? -1 : undefined}
          onClick={() => goTo(activeIndex - 1)}
        >
          <LineIcon name="arrowLeft" />
        </button>
        <PaginationDots
          count={projects.length}
          activeIndex={activeIndex}
          label="Escolher projeto"
          onSelect={goTo}
        />
        <button
          type="button"
          className="projectCarousel__arrow projectCarousel__arrow--next"
          aria-label="Próximo projeto"
          aria-disabled={activeIndex === lastIndex}
          tabIndex={activeIndex === lastIndex ? -1 : undefined}
          onClick={() => goTo(activeIndex + 1)}
        >
          <LineIcon name="arrowRight" />
        </button>
      </div>
      <p className="visuallyHidden" aria-live="polite" aria-atomic="true">
        Projeto {activeIndex + 1} de {projects.length}: {projects[activeIndex]?.title ?? "Nenhum projeto"}
      </p>
    </div>
  );
}
