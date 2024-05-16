import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function hasProfileLikedArticle(
  supabase: SupabaseClient<Database>,
  profileId: string,
  articleId: string
) {
  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("profile_id", profileId)
    .eq("article_id", articleId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return false;
  }

  return data ? true : false;
}
