"use server";

import "server-only";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/routes";
import { createCategoryAPI, deleteCategoryAPI } from "@/common/api";
import { revalidatePath } from "next/cache";

const addCategoryAction = async (formData: FormData) => {
  await createCategoryAPI({
    name: formData.get("name") as string,
  });
  redirect(ROUTES.Categories);
};

const deleteCategoryAction = async (formData: FormData) => {
  await deleteCategoryAPI(formData.get("id") as string);
  revalidatePath(ROUTES.Categories);
};

export { addCategoryAction, deleteCategoryAction };
