import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export async function countLikes(
  supabase: SupabaseClient<Database>,
  articleId: string
) {
  const { error, count } = await supabase
    .from("likes")
    .select("*", { count: "exact" })
    .eq("article_id", articleId)

  if (error) {
    throw new Error(`Error countLikes: ${error.message}`)
  }

  return count ? count : 0
}
