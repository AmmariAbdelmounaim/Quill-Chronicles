"use server"

import { headers } from "next/headers"
import { RegisterSchema } from "@/schemas"
import { createClient } from "@/utils/supabase/server"
import z from "zod"

export async function signUp({
  values,
  prevUrl,
}: {
  values: z.infer<typeof RegisterSchema>
  prevUrl: string
}) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const origin = headers().get("origin")
  const { name, email, password } = validatedFields.data
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        avatar_url: "/avatarURL",
      },
      emailRedirectTo: `${origin}/auth/callback?next=${prevUrl}`,
    },
  })

  if (error) {
    return { error: `${error.message}` }
  }

  return {
    success: "Check your email to continue the sign-in process",
  }
}
