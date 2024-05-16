"use server";

import { insertComment } from "@/data/insert-comment";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(
  comment: string,
  profileId: string,
  articleId: string
) {
  const supabase = await createClient();
  const { addCommentData, addCommentError } = await insertComment(
    supabase,
    comment,
    profileId,
    articleId
  );

  if (addCommentError) {
    return { error: "Error publishing comment" };
  }
  revalidatePath("/articles");
}
