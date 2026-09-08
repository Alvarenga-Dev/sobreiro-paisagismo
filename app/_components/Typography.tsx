export interface TextFragment {
  text: string;
  accent?: boolean;
}

interface EditorialHeadingProps {
  id?: string;
  fragments: readonly TextFragment[];
  className?: string;
}

export interface SectionHeadingProps extends EditorialHeadingProps {
  eyebrow?: string;
  context?: "onDark" | "onLight";
  level?: 2 | 3;
}

function Fragments({ fragments }: { fragments: readonly TextFragment[] }) {
  return fragments.map((fragment, index) => (
    <span className={fragment.accent ? "textAccent" : undefined} key={`${fragment.text}-${index}`}>
      {fragment.text}
    </span>
  ));
}

export function SectionHeading({
  id,
  fragments,
  eyebrow,
  context = "onLight",
  level = 2,
  className = "",
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div className={`sectionHeading sectionHeading--${context} ${className}`.trim()}>
      {eyebrow ? <p className="sectionHeading__eyebrow">{eyebrow}</p> : null}
      <Heading className="sectionHeading__title" id={id}>
        <Fragments fragments={fragments} />
      </Heading>
    </div>
  );
}

export interface DisplayHeadingProps extends EditorialHeadingProps {
  level?: 1 | 2;
}

export function DisplayHeading({
  id,
  fragments,
  level = 1,
  className = "",
}: DisplayHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <Heading className={`displayHeading ${className}`.trim()} id={id}>
      <Fragments fragments={fragments} />
    </Heading>
  );
}

export interface SupportingCopyProps {
  children: React.ReactNode;
  context?: "onDark" | "onLight";
  className?: string;
}

export function SupportingCopy({
  children,
  context = "onLight",
  className = "",
}: SupportingCopyProps) {
  return <p className={`supportingCopy supportingCopy--${context} ${className}`.trim()}>{children}</p>;
}
