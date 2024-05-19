"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

// TODO: I should make sure this is secure
export async function signOut(prevUrl: string) {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect(prevUrl)
}
