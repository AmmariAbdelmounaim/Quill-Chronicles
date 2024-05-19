"use client"

import { useOptimistic, useState, useTransition } from "react"
import { likeArticle } from "@/actions/like-article"
import { cn } from "@/utils/tailwind-merge"
import { Heart } from "lucide-react"

import SignUpDialog from "../navbar/sign-up-dialog"
import { Button } from "../ui/button"

interface LikeButtonProps {
  profileId?: string
  articleId: string
  likes: number
  initialLiked: boolean
}

export default function LikeButton({
  profileId,
  articleId,
  likes,
  initialLiked,
}: LikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(initialLiked)
  const [likeCount, setLikeCount] = useState<number>(likes)
  const [isPending, startTransition] = useTransition()

  const toggleLike = () => {
    startTransition(async () => {
      const data = await likeArticle(liked, articleId, profileId!)
      setLiked(!liked)
      setLikeCount(data.likeCount!)
    })
  }

  return (
    <>
      {profileId ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLike}
            disabled={isPending}
            className="ml-[48px] p-0.5"
          >
            <Heart
              className={cn(
                "mr-1.5 size-8 transition-colors duration-1000",
                liked && "fill-red-600 stroke-red-600"
              )}
            />
            {likeCount}
          </Button>
        </>
      ) : (
        <SignUpDialog>
          <Button variant="ghost" size="icon">
            <Heart className="size-8" /> {likeCount}
          </Button>
        </SignUpDialog>
      )}
    </>
  )
}
