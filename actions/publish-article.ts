"use server";

import { insertArticle } from "@/data/insert-article";
import { updateArticle } from "@/data/update-article";
import { Json } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { JSONContent } from "novel";
import { pipeline } from "@xenova/transformers";
import { generateEmbeddings } from "@/utils/generate-embeddings";

export async function publishArticle(
  content: JSONContent,
  text: string,
  userId: string,
  articleId?: string
) {
  const supabase = createClient();

  const embedding = await generateEmbeddings(text);

  if (!articleId) {
    const { insertArticleData, insertArticleError } = await insertArticle(
      supabase,
      content,
      embedding,
      userId
    );

    if (insertArticleError) {
      console.error(insertArticleError);

      return { error: "Error publishing your article" };
    }
    if (insertArticleData) {
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
      embedding,
      articleId,
      userId
    );

    if (updateArticleError) {
      console.error(updateArticleError);
      return { error: "Error updating your article" };
    }
    if (updateArticleData) {
      return {
        success: "Article updated successfuly",
      };
    }
  }
}
