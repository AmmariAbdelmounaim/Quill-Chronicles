import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function insertComment(
  supabase: SupabaseClient<Database>,
  comment: string,
  profileId: string,
  articleId: string
) {
  const { data: addCommentData, error: addCommentError } = await supabase
    .from("comments")
    .insert({
      article_id: articleId,
      comment,
      profile_id: profileId,
    })
    .select("*")
    .single();

  return { addCommentData, addCommentError };
}
