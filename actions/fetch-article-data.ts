"use server"

import { countComments } from "@/data/count-comments"
import { countLikes } from "@/data/count-likes"
import { getArticle } from "@/data/get-article"
import { getPublisherData } from "@/data/get-publisher-data"
import { getImageUrlFromJsonContent } from "@/utils/get-image-url-from-json-content"
import { createClient } from "@/utils/supabase/server"
import { JSONContent } from "novel"

export interface articleData {
  id: string
  publisher: string
  publisherAvatar: string
  publishedAt: string
  title: string
  paragraph: string
  likesCount: number
  commentsCount: number
  imageUrl: string | undefined
}

export async function fetchArticleData(
  articleId: string
): Promise<articleData> {
  const supabase = createClient()

  // Fetch all necessary data in parallel
  const [
    { getArticleData, getArticleError },
    likesCount,
    commentsCount,
    publisherData,
  ] = await Promise.all([
    getArticle(supabase, articleId),
    countLikes(supabase, articleId),
    countComments(supabase, articleId),
    getPublisherData(supabase, articleId),
  ])

  if (getArticleError) {
    throw new Error("Article not found")
  }
  if (!getArticleData) {
    throw new Error("getArticleData not found")
  }

  const article = getArticleData
  const articleContent: JSONContent = article.content as JSONContent

  return {
    id: articleId,
    title: articleContent?.content?.[0]?.content?.[0]?.text || "",
    paragraph: articleContent?.content?.[1]?.content?.[0]?.text || "",
    publishedAt: article.created_at,
    likesCount,
    commentsCount,
    publisher: publisherData.fullName,
    publisherAvatar: publisherData.avatarUrl,
    imageUrl: getImageUrlFromJsonContent(articleContent),
  }
}
