import { z } from "zod";

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const registerFormSchema = z.object({
  username: z
        .string()
        .trim()
        .min(1, { message: "Username is required" })
        .max(20, { message: "Username must be at most 20 characters long" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .refine((val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/.test(val), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .refine((val) => passwordRegex.test(val), {
      message: "Password must contain at least one letter, one number, and one special character",
    }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;