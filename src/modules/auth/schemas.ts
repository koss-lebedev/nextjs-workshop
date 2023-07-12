import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "required" }),
  password: z.string().min(1, { message: "required" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginSchema };
