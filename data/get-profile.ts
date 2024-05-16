import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getProfile(
  supabase: SupabaseClient<Database>,
  id: string
) {
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return { profileData, profileError };
}
