import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function deleteArticle(
  supabase: SupabaseClient<Database>,
  articleId: string
) {
  const { error: deleteArticleError } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);
  return deleteArticleError;
}
