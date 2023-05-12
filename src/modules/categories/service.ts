import { prisma } from "@/common/db-client";
import { Category } from "@prisma/client";

const getAllCategories = () => {
  return prisma.category.findMany();
};

const createCategory = (data: Omit<Category, "id">) => {
  return prisma.category.create({
    data,
  });
};

const deleteCategory = (id: Category["id"]) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};

export { getAllCategories, createCategory, deleteCategory };
