import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export async function countComments(
  supabase: SupabaseClient<Database>,
  articleId: string
) {
  const { error, count } = await supabase
    .from("comments")
    .select("id", { count: "exact" })
    .eq("article_id", articleId)

  if (error) {
    throw new Error(`Error countComments:${error.message}`)
  }

  return count ? count : 0
}
