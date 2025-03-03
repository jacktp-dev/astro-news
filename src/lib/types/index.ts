import type { CollectionEntry } from "astro:content";

export type WPCategory = {
  id: number;
  count: number;
  name: string;
  slug: string;
}

export type WPArticle ={
  id: number;
  publishedDate : string;
  slug: string;
  status: string;
  title: string;
  description:string;
  content: string;
  author: number;
  image: string;
  category: number
}


/**
 *
 * 
 *   isDraft: z.boolean().default(false),
   isBigHeadline: z.boolean().default(false),
   isSmallHeadline: z.boolean().default(false),
   cover: image(),
   covert_alt: z.string().optional(),
   title: z.string().max(60, "Too long, max 60 characters"),
   description: z.string().max(160, "Too long, max 160 characters"),
   category: reference("categories"),
   authors: z.array(reference("authors")).min(1),
   publishedTime: z.string().datetime(),

 */
export type Icon = {
  size?: string;
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: string;
};

export type Link = {
  href: string;
  text: string;
  icon?: string;
  target?: "_blank" | "_self";
};

type Author = {
  name: string;
  link: string;
};

export type Meta = {
  title: string;
  metaTitle: string;
  description: string;
  type: "article" | "website";
  ogImage: string;
  ogImageAlt: string;
};

export type ArticleMeta = Meta & {
  publishedTime: string;
  lastModified: string;
  authors: Author[];
};

export type Entry = CollectionEntry<"articles" | "views">;
