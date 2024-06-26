import { usePathname } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

export default function Social() {
  const prevUrl = usePathname()
  console.log(prevUrl)

  const authOAuth = () => {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${prevUrl}`,
      },
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          authOAuth()
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  )
}
