"use client";

export function ResultsAnnouncement({ categoryLabel, count }: { categoryLabel: string; count: number }) {
  return (
    <p className="projectsCatalog__count" role="status" aria-live="polite" aria-atomic="true">
      {categoryLabel}: {count} {count === 1 ? "projeto encontrado" : "projetos encontrados"}
    </p>
  );
}
