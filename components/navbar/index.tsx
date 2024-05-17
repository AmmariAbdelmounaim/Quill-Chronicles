"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation"
import { fetchUserProfile } from "@/actions/auth/fetch-user-profile"
import { publishArticle } from "@/actions/publish-article"
import { SquarePen } from "lucide-react"
import { JSONContent } from "novel"

import { Tables } from "@/types/supabase"
import useLocalStorage from "@/hooks/use-local-storage"

import { Button, buttonVariants } from "../ui/button"
import { useToast } from "../ui/use-toast"
import AvatarDropdownMenu from "./avatar-dropdown-menu"
import { ModeToggle } from "./mode-toggle"
import SearchInput from "./search-input"
import SignInDialog from "./sign-in-dialog"
import SignUpDialog from "./sign-up-dialog"

interface NavbarProps {
  profile: Tables<"profiles"> | null
}

export default function Navbar({ profile }: NavbarProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const handlePublishArticle = (
    profile: Tables<"profiles">,
    articleId?: string
  ) => {
    startTransition(async () => {
      const content = JSON.parse(window.localStorage.getItem("article")!)
      const text = JSON.parse(window.localStorage.getItem("text")!)
      const data = await publishArticle(
        content as JSONContent,
        text,
        profile.id,
        articleId
      )
      if (data?.error) {
        toast({
          variant: "destructive",
          title: data.error,
        })
      }
      if (data?.success) {
        toast({
          title: data.success,
        })
        // redirect them to edit page
        if (!articleId) {
          router.push(`/edit-article/${data.articleId}`)
        }
      }
    })
  }

  return (
    <nav className="flex items-center justify-between border-b-[1px] border-gray-200 bg-background px-4 py-3 shadow-sm dark:border-gray-800 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <Link
          className="w-full font-playfairdisplay text-xl font-bold text-primary"
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
                  const articleId = pathname.split("/")[2]
                  handlePublishArticle(profile, articleId)
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
  )
}
