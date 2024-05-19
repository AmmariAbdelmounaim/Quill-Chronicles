"use server"

import { redirect } from "next/navigation"
import { LoginSchema } from "@/schemas"
import { createClient } from "@/utils/supabase/server"
import z from "zod"

export async function signIn({
  values,
  prevUrl,
}: {
  values: z.infer<typeof LoginSchema>
  prevUrl: string
}) {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: "Could not authenticate the user" }
  }

  return redirect(prevUrl)
}
