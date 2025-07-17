import { z } from "zod";

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .refine((val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/.test(val), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;