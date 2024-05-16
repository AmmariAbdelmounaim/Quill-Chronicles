"use server";

import { getProfile } from "@/data/get-profile";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export async function fetchCommentData(comment: Tables<"comments">) {
  const supabase = createClient();
  const { profileData, profileError } = await getProfile(
    supabase,
    comment.profile_id!
  );
  if (profileError) {
    throw new Error();
  }
  return {
    full_name: profileData?.full_name,
    avatar_url: profileData?.avatar_url,
    createdAt: comment.created_at,
  };
}
