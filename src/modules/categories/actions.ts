"use server";

import "server-only";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/routes";
import { revalidatePath } from "next/cache";
import { deleteCategory } from "./service";
import { createCategory } from "./service";

const addCategoryAction = async (formData: FormData) => {
  await createCategory({
    name: formData.get("name") as string,
  });
  redirect(ROUTES.Categories);
};

const deleteCategoryAction = async (formData: FormData) => {
  await deleteCategory(formData.get("id") as string);
  revalidatePath(ROUTES.Categories);
};

export { addCategoryAction, deleteCategoryAction };
