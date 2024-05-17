"use client"

import { useEffect, useState, useTransition } from "react"
import { fetchArticles } from "@/actions/fetch-articles"
import { formatDate } from "@/utils/format-date"
import { JSONContent } from "novel"
import { useDebounce } from "use-debounce"

import { Tables } from "@/types/supabase"
import { useSearch } from "@/hooks/use-search"

import ArticleCard from "../article-card"
import { SkeletonCard } from "../skeleteon-card"
import { Button } from "../ui/button"

export default function PaginatedArticles() {
  const [articles, setArticles] = useState<Tables<"articles">[]>([])
  const [page, setPage] = useState<number>(1)
  const [isPending, startTransition] = useTransition()
  const { searchQuery } = useSearch()
  const [query] = useDebounce(searchQuery, 3000)

  const loadArticles = (page: number) => {
    startTransition(async () => {
      const articles = await fetchArticles(page, query)
      if (articles) {
        setArticles((prev) => [...prev, ...articles])
      }
    })
  }

  useEffect(() => {
    loadArticles(page)
  }, [page, query])

  useEffect(() => {
    setPage(1)
    setArticles([])
  }, [query])

  const loadMoreArticles = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {articles.map((article) => {
              const articleContent = article.content as JSONContent
              const title = articleContent?.content?.[0]?.content?.[0]?.text
              const paragraph = articleContent?.content?.[1]?.content?.[0]?.text
              const publishedAt = formatDate(article.created_at)

              return (
                <ArticleCard
                  articleId={article.id}
                  title={title!}
                  content={paragraph!}
                  createdAt={publishedAt}
                  key={article.id}
                />
              )
            })}
          </>
        )}
      </div>
      {!isPending && (
        <Button className="mt-3" onClick={loadMoreArticles}>
          Show more
        </Button>
      )}
    </div>
  )
}
