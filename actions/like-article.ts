"use server";

import { countLikes } from "@/data/count-likes";
import { createClient } from "@/utils/supabase/server";

export async function likeArticle(
  isActive: boolean,
  articleId: string,
  profileId: string
) {
  const supabase = createClient();
  if (isActive) {
    const { error: removeLikeError } = await supabase
      .from("likes")
      .delete()
      .eq("article_id", articleId)
      .eq("profile_id", profileId);
    if (removeLikeError) {
      console.warn(removeLikeError);
    }
  } else {
    const { error: addLikeError } = await supabase.from("likes").insert({
      article_id: articleId,
      profile_id: profileId,
    });
    if (addLikeError) {
      console.warn(addLikeError);
    }
  }
  return {
    likeCount: await countLikes(supabase, articleId),
  };
}
