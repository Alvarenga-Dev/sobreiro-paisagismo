"use client";

export interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  label: string;
  onSelect?: (index: number) => void;
}

export function PaginationDots({ count, activeIndex, label, onSelect }: PaginationDotsProps) {
  const pages = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="paginationDots" role="group" aria-label={label}>
      {pages.map((index) => {
        const isActive = index === activeIndex;
        const itemLabel = `Ir para o projeto ${index + 1} de ${count}`;

        if (onSelect) {
          return (
            <button
              className="paginationDots__button"
              type="button"
              key={index}
              aria-label={itemLabel}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect(index)}
            >
              <span className="paginationDots__dot" data-active={isActive} aria-hidden="true" />
            </button>
          );
        }

        return <span className="paginationDots__dot" data-active={isActive} aria-hidden="true" key={index} />;
      })}
      {!onSelect ? (
        <span className="visuallyHidden">Projeto {activeIndex + 1} de {count}</span>
      ) : null}
    </div>
  );
}
