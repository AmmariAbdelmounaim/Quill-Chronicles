"use server";

import { deleteArticle } from "@/data/delete-article";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function removeArticle(articleId: string) {
  const supabase = createClient();
  const deleteArticleError = await deleteArticle(supabase, articleId);

  if (deleteArticleError) {
    return { error: "Could not delete your article" };
  }

  revalidatePath("/articles");

  return {
    success: "Article deleted successfully !",
  };
}
