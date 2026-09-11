import type { ContactBannerProps } from "../../_components/ContactBanner";
import type { ConfiguredContact } from "../../_content/siteContent";

export const projectDetailBanner = {
  message: [
    { text: "Vamos transformar " },
    { text: "seu espaço juntos?", accent: true },
  ],
  description:
    "Fale com a nossa equipe e descubra como o paisagismo pode transformar a sua vida.",
} as const;

export function projectDetailContactActions(
  whatsapp: ConfiguredContact,
  contact: { readonly label: string },
  email: { readonly href: string },
): Pick<ContactBannerProps, "contactHref" | "contactLabel" | "contactIcon" | "contactIconSize" | "contactExternal" | "supportingAction"> {
  if (whatsapp.status === "configured") {
    return {
      contactHref: whatsapp.href,
      contactLabel: contact.label,
      contactIcon: "whatsapp",
      contactIconSize: "sm",
      contactExternal: true,
      supportingAction: {
        label: "Envie um e-mail",
        href: email.href,
        presentation: "outline",
        icon: "mail",
      },
    };
  }

  return {
    contactHref: email.href,
    contactLabel: "Envie um e-mail",
    contactIcon: "mail",
    contactIconSize: "sm",
    contactExternal: false,
  };
}
