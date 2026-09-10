import Link from "next/link";
import { LineIcon } from "../../../_components/LineIcon";

export function ProjectsReturnLink() {
  return (
    <div className="projectDetailReturn">
      <Link href="/projetos">
        <span className="projectDetailReturn__label">
          <LineIcon name="grid" decorative />
          Ver outros projetos
        </span>
        <LineIcon name="arrowRight" decorative />
      </Link>
    </div>
  );
}
