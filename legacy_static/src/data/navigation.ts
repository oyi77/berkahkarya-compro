export type Locale = "id" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCta {
  label: string;
  href: string;
}

export interface NavigationData {
  links: NavLink[];
  cta: NavCta;
}

export const navigation: Record<Locale, NavigationData> = {
  id: {
    links: [
      { label: "Beranda", href: "/id" },
      { label: "Produk", href: "/id/products" },
      { label: "Layanan", href: "/id/services" },
      { label: "Tim", href: "/id/team" },
      { label: "Blog", href: "/id/blog" },
      { label: "Kontak", href: "/id/contact" },
    ],
    cta: {
      label: "Konsultasi Gratis",
      href: "/id/contact?consultation=true",
    },
  },
  en: {
    links: [
      { label: "Home", href: "/en" },
      { label: "Products", href: "/en/products" },
      { label: "Services", href: "/en/services" },
      { label: "Team", href: "/en/team" },
      { label: "Blog", href: "/en/blog" },
      { label: "Contact", href: "/en/contact" },
    ],
    cta: {
      label: "Free Consultation",
      href: "/en/contact?consultation=true",
    },
  },
} as const satisfies Record<Locale, NavigationData>;
