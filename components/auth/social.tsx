import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function Social() {
  const authOAuth = () => {
    const supabase = createClient();
    const currentUrl = window.location.href; // Get the current page URL
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          authOAuth();
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}
