"use client";

export interface MenuTriggerProps {
  expanded?: boolean;
  controlsId?: string;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
}

export function MenuTrigger({
  expanded = false,
  controlsId,
  onExpandedChange,
  disabled = false,
}: MenuTriggerProps) {
  const cannotExpand = disabled || !controlsId || !onExpandedChange;
  const label = cannotExpand ? "Menu — conteúdo em definição" : expanded ? "Fechar menu" : "Abrir menu";

  return (
    <button
      className="menuTrigger"
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
}
