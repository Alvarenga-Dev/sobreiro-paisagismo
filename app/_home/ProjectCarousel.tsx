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
    const item = trackRef.current?.children.item(nextIndex);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (item instanceof HTMLElement) {
      item.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "start",
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

    const snapPosition = track.scrollLeft + firstSlide.offsetLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((slide, index) => {
      if (!(slide instanceof HTMLElement)) return;

      const distance = Math.abs(slide.offsetLeft - snapPosition);
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
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <div className="projectCarousel__navigation">
        <button
          type="button"
          className="projectCarousel__arrow projectCarousel__arrow--previous"
          aria-label="Projeto anterior"
          disabled={activeIndex === 0}
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
          disabled={activeIndex === lastIndex}
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
