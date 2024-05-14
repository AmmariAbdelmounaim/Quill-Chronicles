"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getInitials } from "@/utils/get-initials";
import { Tables } from "@/types/supabase";
import { signOut } from "@/actions/auth/sign-out";

interface AvatarDropDownMenuProps {
  user: Tables<"profiles">;
}

export default function AvatarDropDownMenu({ user }: AvatarDropDownMenuProps) {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
