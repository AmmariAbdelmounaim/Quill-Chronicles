"use server";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export async function fetchUserProfile(): Promise<Tables<"profiles"> | null> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (userData.user) {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(profileError.message);
    }

    return profileData;
  }

  return null;
}
