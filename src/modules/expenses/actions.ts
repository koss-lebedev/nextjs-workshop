"use server";

import "server-only";
import { ROUTES } from "@/common/routes";
import { createExpense, deleteExpense } from "@/modules/expenses/service";
import { revalidatePath } from "next/cache";
import { CreateExpenseSchema, createExpenseSchema } from "./schemas";

const createExpenseAction = async (values: CreateExpenseSchema) => {
  const sanitized = createExpenseSchema.parse(values);
  await createExpense(sanitized);
  revalidatePath(ROUTES.Expenses);
};

const deleteExpenseAction = async (id: string) => {
  await deleteExpense(id);
  revalidatePath(ROUTES.Expenses);
};

export { createExpenseAction, deleteExpenseAction };
