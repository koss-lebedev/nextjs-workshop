import { z } from "zod";

const createExpenseSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  cost: z.number({
    required_error: "required",
    invalid_type_error: "must be a number",
  }),
  categoryId: z.string().min(1, { message: "required" }),
});

type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

export { createExpenseSchema };
export type { CreateExpenseSchema };
