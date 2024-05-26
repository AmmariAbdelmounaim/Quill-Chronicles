import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export async function getPublisherData(
  supabase: SupabaseClient<Database>,
  articleId: string
): Promise<{ fullName: string; avatarUrl: string }> {
  const { data, error } = await supabase
    .from("articles")
    .select("profile_id")
    .eq("id", articleId)
    .single()
  if (error || !data.profile_id) {
    throw new Error("Error fetching article data")
  }
  const profileId = data.profile_id
  const { data: getProfileData, error: getProfileError } = await supabase
    .from("profiles")
    .select("full_name,avatar_url")
    .eq("id", profileId)
    .single()

  if (!getProfileData || getProfileError) {
    throw new Error("Error fetching profile data")
  }

  return {
    fullName: getProfileData.full_name!,
    avatarUrl: getProfileData.avatar_url!,
  }
}
