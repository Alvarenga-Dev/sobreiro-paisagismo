import { NotFoundView } from "./_components/NotFoundView";
import { globalNotFoundCopy } from "./_components/notFoundContent";

export default function GlobalNotFound() {
  return <NotFoundView copy={globalNotFoundCopy} />;
}
