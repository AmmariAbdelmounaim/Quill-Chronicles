import { Json } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { JSONContent } from "novel";

export async function insertArticle(
  supabase: SupabaseClient,
  article: JSONContent,
  userId: string
) {
  const { data: insertArticleData, error: insertArticleError } = await supabase
    .from("articles")
    .insert({
      content: article as unknown as Json,
      profile_id: userId,
      likes: 0,
    })
    .select("*")
    .single();

  return { insertArticleData, insertArticleError };
}
