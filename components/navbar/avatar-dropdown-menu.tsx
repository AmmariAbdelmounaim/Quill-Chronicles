"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "@/actions/auth/sign-out"
import { getInitials } from "@/utils/get-initials"

import { Tables } from "@/types/supabase"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface AvatarDropDownMenuProps {
  user: Tables<"profiles">
}

export default function AvatarDropDownMenu({ user }: AvatarDropDownMenuProps) {
  const router = useRouter()
  const prevUrl = usePathname()
  const handleLogout = async () => {
    await signOut(prevUrl)
    router.refresh()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user && (
            <>
              <AvatarImage src={user.avatar_url!} />
              <AvatarFallback>{getInitials(user?.full_name!)}</AvatarFallback>
            </>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.full_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/articles" className="w-full">
            Articles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full cursor-pointer"
          onClick={handleLogout}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
