"use server";

import { headers } from "next/headers";
import { RegisterSchema } from "@/schemas";
import z from "zod";
import { createClient } from "@/utils/supabase/server";

export async function signUp({
  values,
}: {
  values: z.infer<typeof RegisterSchema>;
}) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const origin = headers().get("origin");
  const { name, email, password } = validatedFields.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        avatar_url: "/avatarURL",
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: "Could not register the user" };
  }

  return {
    success: "Check your email to continue the sign-in process",
  };
}
