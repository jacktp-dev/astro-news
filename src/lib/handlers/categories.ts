import type { WPCategory } from "../types";

export const categoriesHandler = {
  allCategories: async (): Promise<WPCategory[]> => {
    const response = await fetch("https://www.diarioamanecer.net/wp-json/wp/v2/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();

    return categories.map((category: any) => ({
      id: category.id,
      count: category.count,
      name: category.name,
      slug: category.slug,
    }));
  },

  oneCategory: async (categoryId: number): Promise<WPCategory> => {
    const response = await fetch(`https://www.diarioamanecer.net/wp-json/wp/v2/categories/${categoryId}`);

    // if (!response.ok) {
    //   throw new Error(`Category with id ${categoryId} not found`);
    // }

    const category = await response.json();

    return {
      id: category.id,
      count: category.count,
      name: category.name,
      slug: category.slug,
    };
  },
};
