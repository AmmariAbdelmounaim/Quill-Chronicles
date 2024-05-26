import { JSONContent } from "novel"
import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
})

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
})

export const ogImageSchema = z.object({
  title: z.string(),
  paragraph: z.string(),
  publishedAt: z.string(),
  likesCount: z.string(),
  commentsCount: z.string(),
  publisher: z.string(),
  publisherAvatar: z.string(),
  imageUrl: z.string(),
})
