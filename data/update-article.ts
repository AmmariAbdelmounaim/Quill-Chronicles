import { Database, Json } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { JSONContent } from "novel";

export async function updateArticle(
  supabase: SupabaseClient<Database>,
  article: JSONContent,
  embedding: any[],
  articleId: string,
  userId: string
) {
  const { data: updateArticleData, error: updateArticleError } = await supabase
    .from("articles")
    .update({
      content: article as unknown as Json,
      // @ts-ignore
      embedding,
    })
    .eq("id", articleId)
    .eq("profile_id", userId)
    .select("*")

    .single();

  return { updateArticleData, updateArticleError };
}
