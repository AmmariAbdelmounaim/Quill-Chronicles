"use server"

import { createClient } from "@/utils/supabase/server"

import { Tables } from "@/types/supabase"

import { embeddingsSearch } from "./search-articles"

export async function fetchArticles(page: number, searchQuery?: string) {
  const supabase = createClient()

  const pageSize = 3

  let filteredArticleIds = null
  let articles = null
  let error = null

  if (searchQuery && searchQuery.length >= 3) {
    filteredArticleIds = await embeddingsSearch(searchQuery)
    if (filteredArticleIds) {
      // remove duplicates
      const uniqueArticleIds = Array.from(
        new Set(filteredArticleIds.map((article) => article.id))
      )
      // retrieve articles
      const response = await supabase
        .from("articles")
        .select("*")
        .in("id", uniqueArticleIds)
        .range((page - 1) * pageSize, page * pageSize - 1)

      const unorderedArticles = response.data as Tables<"articles">[]
      const orderedArticles = uniqueArticleIds
        .map((id) => unorderedArticles.find((article) => article.id === id))
        .filter((article) => article !== undefined)

      articles = orderedArticles as Tables<"articles">[]
      error = response.error
    }
  } else {
    // retrieve articles without filtering
    const response = await supabase
      .from("articles")
      .select("*")
      .range((page - 1) * pageSize, page * pageSize - 1)

    articles = response.data
    error = response.error
  }

  if (error) {
    throw new Error(error.message)
  }

  return articles
}
