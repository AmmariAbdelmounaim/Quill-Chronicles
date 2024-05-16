import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getArticle(
  supabase: SupabaseClient<Database>,
  articleId: string
) {
  const { data: getArticleData, error: getArticleError } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();
  return { getArticleData, getArticleError };
}
