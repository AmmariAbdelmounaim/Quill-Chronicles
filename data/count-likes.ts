import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function countLikes(
  supabase: SupabaseClient<Database>,
  articleId: string
) {
  const { data, error, count } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("article_id", articleId);

  if (error) {
    console.error("Error counting likes:", error);
    return null;
  }

  return count;
}
