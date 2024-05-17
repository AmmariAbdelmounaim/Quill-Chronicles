import Link from "next/link"
import { formatDate } from "@/utils/format-date"
import { Heart, MessageCircle } from "lucide-react"

import { Button, buttonVariants } from "../ui/button"

interface ArticleCardProps {
  articleId: string
  title: string
  createdAt: string
  content: string
}

export default function ArticleCard({
  articleId,
  title,
  createdAt,
  content,
}: ArticleCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-gray-200  bg-background p-4 shadow-sm transition-all hover:cursor-pointer hover:shadow-md dark:border-gray-800 dark:hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="font-playfairdisplay text-xl font-bold text-foreground ">
          {title}
        </h2>
        <p className="text-muted-foreground ">{formatDate(createdAt)}</p>
        <p className="line-clamp-3 text-muted-foreground ">{content}</p>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        <Link className={buttonVariants()} href={`/articles/${articleId}`}>
          Read More
        </Link>
      </div>
    </article>
  )
}
