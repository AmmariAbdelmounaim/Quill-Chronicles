"use server";

import { insertArticle } from "@/data/insert-article";
import { updateArticle } from "@/data/update-article";
import { Json } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { JSONContent } from "novel";

export async function publishArticle(
  content: JSONContent,
  userId: string,
  articleId?: string
) {
  const supabase = createClient();
  if (!articleId) {
    const { insertArticleData, insertArticleError } = await insertArticle(
      supabase,
      content,
      userId
    );

    if (insertArticleData) {
      return { error: "Error publishing your article" };
    }
    if (insertArticleError) {
      return {
        success: "Article published successfuly",
        articleId: insertArticleData.id,
      };
    }
  }
  // the it's update
  else {
    const { updateArticleData, updateArticleError } = await updateArticle(
      supabase,
      content,
      articleId,
      userId
    );

    if (updateArticleError) {
      return { error: "Error updating your article" };
    }
    if (updateArticleData) {
      return {
        success: "Article updated successfuly",
      };
    }
  }
}
