import { JSONContent } from "novel";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

// const MarksSchema = z.object({
//   type: z.string(),
//   attrs: z.record(z.any()).optional(),
// });

// // Define the recursive schema for JSONContent
// export const JSONContentSchema: z.ZodType<JSONContent> = z.lazy(() =>
//   z.object({
//     type: z.string().optional(),
//     attrs: z.record(z.any()).optional(),
//     content: z.array(JSONContentSchema).optional(), // Recursive definition
//     marks: z.array(MarksSchema).optional(),
//     text: z.string().optional(),
//   })
// );
