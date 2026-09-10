import { NotFoundView } from "../../_components/NotFoundView";
import { projectNotFoundCopy } from "../../_components/notFoundContent";

export default function ProjectNotFound() {
  return <NotFoundView copy={projectNotFoundCopy} />;
}
