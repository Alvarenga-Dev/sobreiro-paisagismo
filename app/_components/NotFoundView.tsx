import Image from "next/image";
import Link from "next/link";
import { ActionGroup, ButtonLink } from "./ButtonLink";
import { LineIcon } from "./LineIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteFrame } from "./SiteFrame";
import { DisplayHeading, SupportingCopy } from "./Typography";
import { siteContent } from "../_content/siteContent";
import type { NotFoundCopy } from "./notFoundContent";

export interface NotFoundViewProps {
  /** Editorial copy for the global or project-specific not-found state. */
  readonly copy: NotFoundCopy;
}

/**
 * Shared, static 404 view. The root layout supplies the single global header;
 * this component supplies the main landmark and internal footer. Recovery links
 * remain native anchors in DOM order and the decorative artwork is never focusable.
 */
export function NotFoundView({ copy }: NotFoundViewProps) {
  const contact = siteContent.contact;

  return (
    <SiteFrame
      variant="fullBleed"
      footer={<SiteFooter {...siteContent.internalFooter} />}
    >
      <section
        className="notFound"
        aria-labelledby="not-found-title"
        data-region="not-found"
      >
        <div className="notFound__inner">
          <nav className="notFound__breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">{copy.breadcrumb.home}</Link>
              </li>
              <li aria-current="page">{copy.breadcrumb.current}</li>
            </ol>
          </nav>

          <div className="notFound__message">
            <p className="notFound__code">{copy.code}</p>
            <DisplayHeading
              className="notFound__title"
              fragments={copy.title}
              id="not-found-title"
            />
            <SupportingCopy className="notFound__supporting">
              {copy.supporting}
            </SupportingCopy>
          </div>

          <figure className="notFound__visual">
            <Image
              className="notFound__artwork"
              src="/images/not-found/404-no-jardim.png"
              width={1200}
              height={900}
              sizes="(min-width: 64rem) 55vw, 100vw"
              alt=""
              priority
            />
            <figcaption>{copy.epilogue}</figcaption>
          </figure>

          <ActionGroup className="notFound__actions">
            <ButtonLink
              href="/"
              size="lg"
              leadingIcon={<LineIcon name="home" size="sm" />}
            >
              {copy.recovery.home}
            </ButtonLink>
            <ButtonLink
              href="/projetos"
              size="lg"
              variant="outlineNeutral"
              leadingIcon={<LineIcon name="grid" size="sm" />}
            >
              {copy.recovery.projects}
            </ButtonLink>
            <ButtonLink
              href={contact.href}
              size="lg"
              variant="outlineNeutral"
              external={contact.external}
              leadingIcon={<LineIcon name={contact.icon} size="sm" />}
            >
              {contact.label}
            </ButtonLink>
          </ActionGroup>
        </div>
      </section>
    </SiteFrame>
  );
}
