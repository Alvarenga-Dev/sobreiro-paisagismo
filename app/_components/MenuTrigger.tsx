"use client";

import { forwardRef } from "react";

export interface MenuTriggerProps {
  expanded?: boolean;
  controlsId?: string;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger({
  expanded = false,
  controlsId,
  onExpandedChange,
  disabled = false,
}, ref) {
  const cannotExpand = disabled || !controlsId || !onExpandedChange;
  const label = cannotExpand ? "Menu — conteúdo em definição" : expanded ? "Fechar menu" : "Abrir menu";

  return (
    <button
      className="menuTrigger"
      ref={ref}
      type="button"
      aria-label={label}
      aria-expanded={controlsId ? expanded : undefined}
      aria-controls={controlsId}
      disabled={cannotExpand}
      onClick={() => onExpandedChange?.(!expanded)}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
});
