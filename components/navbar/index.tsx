import Link from "next/link";
import { SquarePen } from "lucide-react";
import SearchInput from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import AvatarDropdownMenu from "./avatar-dropdown-menu";
import SignInDialog from "./sign-in-dialog";
import SignUpDialog from "./sign-up-dialog";
import { createClient } from "@/utils/supabase/server";
import { Database, Tables } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export const fetchUserProfile = async (
  supabase: SupabaseClient<Database>
): Promise<Tables<"profiles"> | null> => {
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
};

export default async function Navbar() {
  // get user session
  const supabase = createClient();

  const profile = await fetchUserProfile(supabase);

  return (
    <nav className="flex items-center justify-between bg-background px-4 py-3 shadow-sm  sm:px-6 lg:px-8 border-b-[1px] border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <Link className="text-xl w-full font-bold text-primary " href="#">
          Quill Chronicles
        </Link>
        <SearchInput />
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost">
          <SquarePen />
          Write
        </Button>
        {!profile ? (
          <>
            <SignUpDialog />
            <SignInDialog />
          </>
        ) : (
          <AvatarDropdownMenu user={profile} />
        )}

        <ModeToggle />
      </div>
    </nav>
  );
}
