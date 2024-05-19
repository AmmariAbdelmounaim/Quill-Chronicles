import Link from "next/link"
import { formatDate } from "@/utils/format-date"
import { Pencil } from "lucide-react"
import { JSONContent } from "novel"

import { Tables } from "@/types/supabase"

import DeleteArticle from "./delete-article"

interface UserArticleProps {
  article: Tables<"articles">
}
export default function UserArticle({ article }: UserArticleProps) {
  const articleContent = article.content as JSONContent
  const title = articleContent?.content?.[0]?.content?.[0]?.text
  const paragraph = articleContent?.content?.[1]?.content?.[0]?.text
  const publishedAt = formatDate(article.created_at)

  return (
    <article className="flex flex-col justify-between rounded-lg border border-gray-200 bg-background  p-4 shadow-sm transition-all  hover:shadow-md dark:border-gray-800 dark:hover:border-gray-400 dark:hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="font-playfairdisplay text-xl font-bold text-foreground ">
          {title}
        </h2>
        <p className="text-muted-foreground ">{publishedAt}</p>
        <p className="line-clamp-3 text-muted-foreground ">{paragraph}</p>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        <Link href={`/edit-article/${article.id}`}>
          <Pencil className="size-7 stroke-primary  opacity-80 hover:cursor-pointer hover:opacity-100" />
        </Link>
        <DeleteArticle articleId={article.id} />
      </div>
    </article>
  )
}
