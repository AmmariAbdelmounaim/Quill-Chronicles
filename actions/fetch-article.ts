"use server";

import { getArticle } from "@/data/get-article";
import { createClient } from "@/utils/supabase/server";

export async function fetchArticle(articleId: string) {
  const supabase = createClient();

  const { getArticleData, getArticleError } = await getArticle(
    supabase,
    articleId
  );
  if (getArticleError) {
    return { error: getArticleError?.message };
  }

  return { article: getArticleData };
}
