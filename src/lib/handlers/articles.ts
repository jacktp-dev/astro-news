import type { WPArticle } from "../types";

export const articlesHandler = {
  allArticles: async (): Promise<WPArticle[]> => {
    const response = await fetch(
      "https://www.diarioamanecer.net/wp-json/wp/v2/posts?per_page=10&orderby=date&order=desc&_embed"
    );
    const articles = await response.json();

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error("No se encontraron artículos.");
    }

    return articles.map((article: any) => ({
      id: article.id,
      publishedDate: article.date,
      slug: article.slug,
      status: article.status,
      title: article.title.rendered,
      description: article.yoast_head_json?.og_description || "",
      content: article.content.rendered,
      author: article.author,
      image: article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      category: article.categories?.[0] || null,
    }));
  },
  getArticleBySlug: async (slug: string) => {
    try {
      const response = await fetch(
        `https://www.diarioamanecer.net/wp-json/wp/v2/posts?slug=${slug}&_embed`
      );

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const articles = await response.json();

      if (!Array.isArray(articles) || articles.length === 0) {
        console.warn(`⚠ No se encontró el artículo con slug: ${slug}`);
        return null;
      }

      const article = articles[0];

      return {
        id: article.id,
        publishedDate: article.date,
        slug: article.slug,
        status: article.status,
        title: article.title.rendered,
        description: article.yoast_head_json?.og_description || "",
        content: article.content.rendered,
        author: article.author,
        image: article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        category: article.categories?.[0] || null,
      };
    } catch (error) {
      console.error("Error obteniendo artículo:", error);
      return null;
    }
  },

  mainHeadline: async () => {
    const response = await fetch(
      "https://www.diarioamanecer.net/wp-json/wp/v2/posts?per_page=1&orderby=date&order=desc&_embed"
    );
    const articles = await response.json();

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error("No se encontró ningún artículo.");
    }

    const article = articles[0];

    return {
      id: article.id,
      publishedDate: article.date,
      slug: article.slug,
      status: article.status,
      title: article.title.rendered,
      description: article.yoast_head_json?.og_description || "",
      content: article.content.rendered,
      author: article.author,
      image: article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      category: article.categories?.[0] || null,
    };
  },

  subHeadlines: async () => {
    try {
      const mainArticle = await articlesHandler.mainHeadline();
      const response = await fetch(
        "https://www.diarioamanecer.net/wp-json/wp/v2/posts?per_page=5&orderby=date&order=desc&_embed"
      );
      const articles = await response.json();

      if (!Array.isArray(articles) || articles.length === 0) {
        throw new Error("No se encontraron artículos secundarios.");
      }

      // Filtra el artículo principal y selecciona hasta 4 titulares secundarios
      const subHeadlines = articles
        .filter((article: any) => article.id !== mainArticle.id)
        .slice(0, 4)
        .map((article: any) => ({
          id: article.id,
          publishedDate: article.date,
          slug: article.slug,
          status: article.status,
          title: article.title.rendered,
          description: article.yoast_head_json?.og_description || "",
          content: article.content.rendered,
          author: article.author,
          image: article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
          category: article.categories?.[0] || null,
        }));

      if (subHeadlines.length === 0) {
        throw new Error("No hay suficientes artículos para los titulares secundarios.");
      }

      return subHeadlines;
    } catch (error) {
      console.error("Error obteniendo subHeadlines:", error);
      return [];
    }
  },
};
