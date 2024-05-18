import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export async function getUserArticles(
  supabase: SupabaseClient<Database>,
  profileId: string
) {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("profile_id", profileId)
  if (error) {
    throw new Error(error.message)
  }
  return articles
}
