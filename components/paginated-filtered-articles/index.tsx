"use client"

import { useEffect, useState, useTransition } from "react"
import { articleData, fetchArticleData } from "@/actions/fetch-article-data"
import { fetchArticles } from "@/actions/fetch-articles"
import { formatDate } from "@/utils/format-date"
import { PlusCircle, PlusIcon } from "lucide-react"
import { JSONContent } from "novel"
import { useDebounce } from "use-debounce"

import { Tables } from "@/types/supabase"
import { useSearch } from "@/hooks/use-search"

import ArticleCard from "../article-card"
import { SkeletonCard } from "../skeleteon-card"
import { Button } from "../ui/button"

export default function PaginatedArticles() {
  const [articlesData, setArticlesData] = useState<articleData[]>([])
  const [page, setPage] = useState<number>(1)
  const [isPending, startTransition] = useTransition()
  const { searchQuery } = useSearch()
  const [query] = useDebounce(searchQuery, 3000)

  const loadArticles = (page: number) => {
    startTransition(async () => {
      // TOTO: this should be optimized
      const articles = await fetchArticles(page, query)
      const articlesData: articleData[] = []
      if (articles) {
        for (const article of articles) {
          const articleData = await fetchArticleData(article.id)
          articlesData.push(articleData)
        }
      }

      if (articles) {
        setArticlesData((prev) => [...prev, ...articlesData])
      }
    })
  }

  useEffect(() => {
    loadArticles(page)
  }, [page, query])

  useEffect(() => {
    setPage(1)
    setArticlesData([])
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
            {articlesData.map((article) => {
              return <ArticleCard key={article.id} articleData={article} />
            })}
          </>
        )}
      </div>
      {!isPending && (
        <div className="mt-5 flex w-full justify-center">
          <Button className="group" onClick={loadMoreArticles}>
            <span className="group-hover:text-white">Show more</span>
            <PlusCircle className="ml-2 group-hover:stroke-white" />
          </Button>
        </div>
      )}
    </div>
  )
}
