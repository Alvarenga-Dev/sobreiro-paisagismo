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
  contact: { readonly href: string; readonly label: string },
): Pick<ContactBannerProps, "contactHref" | "contactLabel" | "supportingAction"> {
  if (whatsapp.status === "configured") {
    return {
      contactHref: whatsapp.href,
      contactLabel: "Fale no WhatsApp",
      supportingAction: {
        label: "Envie um e-mail",
        href: contact.href,
        presentation: "outline",
        icon: "mail",
      },
    };
  }

  return {
    contactHref: contact.href,
    contactLabel: contact.label,
  };
}
