import type { Link, WPCategory } from "../types";
import { capitalizeFirstLetter } from "../utils/letter";

export const SITE = {
  title: "Diario Amanecer",
  description:
    "Un diario con lo último de lo que está sucediendo en la región. Manténte actualizado con nosotros.",
  author: "Diario Amanecer",
  url: "https://diarioamanecer.pe",
  github: "-",
  locale: "es-PE",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export async function getNavigationLinks(): Promise<Link[]> {
  try {
    const response = await fetch(
      "https://www.diarioamanecer.net/wp-json/wp/v2/categories"
    );
    const categories = await response.json();
    const links = categories
      .filter((category: any) => category.name !== "INICIO")
      .map((category: any) => ({
        href: `/categorias/${category.slug}`,
        text: capitalizeFirstLetter(category.name.toLocaleLowerCase()),
      }))

    return links;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}


export const NAVIGATION_LINKS: Link[] = await getNavigationLinks();


export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/authors",
    text: "Authors",
  },
  {
    href: "/contact",
    text: "Contact",
  },
  {
    href: "/privacy",
    text: "Privacy",
  },
  {
    href: "/terms",
    text: "Terms",
  },
  {
    href: "/cookie-policy",
    text: "Cookie Policy",
  },
  {
    href: "https://astro-news-six.vercel.app/rss.xml",
    text: "RSS",
  },
  {
    href: "https://astro-news-six.vercel.app/sitemap-index.xml",
    text: "Sitemap",
  },
];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://github.com",
    text: "GitHub",
    icon: "github",
  },
  {
    href: "httpe://www.t.me",
    text: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://twitter.com",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
];
