import { Category } from "@prisma/client";

const API_URL = "http://localhost:3000/api";

const getAllCategoriesAPI = async () => {
  const result = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  const { categories } = (await result.json()) as { categories: Category[] };
  return categories;
};

const deleteCategoryAPI = async (id: string) => {
  await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
};

const createCategoryAPI = async (data: Partial<Category>) => {
  await fetch(`${API_URL}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getAllCategoriesAPI, deleteCategoryAPI, createCategoryAPI };
