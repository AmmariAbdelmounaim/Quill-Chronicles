"use client";

import Link from "next/link";
import { SquarePen } from "lucide-react";
import SearchInput from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "../ui/button";
import AvatarDropdownMenu from "./avatar-dropdown-menu";
import SignInDialog from "./sign-in-dialog";
import SignUpDialog from "./sign-up-dialog";
import { useEffect, useState, useTransition } from "react";
import { Tables } from "@/types/supabase";
import { fetchUserProfile } from "@/actions/auth/fetch-user-profile";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import useLocalStorage from "@/hooks/use-local-storage";
import { JSONContent } from "novel";
import { useToast } from "../ui/use-toast";
import { publishArticle } from "@/actions/publish-article";

interface NavbarProps {
  profile: Tables<"profiles"> | null;
}

export default function Navbar({ profile }: NavbarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handlePublishArticle = (
    profile: Tables<"profiles">,
    articleId?: string
  ) => {
    startTransition(async () => {
      const content = JSON.parse(window.localStorage.getItem("article")!);
      const data = await publishArticle(
        content as JSONContent,
        profile.id,
        articleId
      );
      if (data?.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      }
      if (data?.success) {
        toast({
          title: data.success,
        });
        // redirect them to edit page
        if (!articleId) {
          router.push(`/edit-article/${data.articleId}`);
        }
      }
    });
  };

  return (
    <nav className="flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6 lg:px-8 border-b-[1px] border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <Link
          className="text-xl w-full font-playfairdisplay font-bold text-primary"
          href="/"
        >
          Quill Chronicles
        </Link>
        {pathname === "/" && <SearchInput />}
      </div>

      <div className="flex items-center space-x-4">
        {profile ? (
          <>
            {!pathname.startsWith("/new-article") &&
            !pathname.startsWith("/edit-article") ? (
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/new-article"
              >
                <SquarePen />
                Write
              </Link>
            ) : (
              <Button
                disabled={isPending}
                onClick={() => {
                  const articleId = pathname.split("/")[2];
                  handlePublishArticle(profile, articleId);
                }}
              >
                Publish
              </Button>
            )}
            <AvatarDropdownMenu user={profile} />
          </>
        ) : (
          <>
            <SignUpDialog>
              <Button variant="ghost">
                <SquarePen />
                Write
              </Button>
            </SignUpDialog>
            <SignUpDialog />
            <SignInDialog />
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
