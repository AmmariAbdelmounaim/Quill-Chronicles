"use server"

import { countComments } from "@/data/count-comments"
import { countLikes } from "@/data/count-likes"
import { getArticle } from "@/data/get-article"
import { getPublisherData } from "@/data/get-publisher-data"
import { getImageUrlFromJsonContent } from "@/utils/get-image-url-from-json-content"
import { createClient } from "@/utils/supabase/server"
import { JSONContent } from "novel"

interface articleData {
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
  let articleData: Partial<articleData> = {}
  const supabase = createClient()
  const { getArticleData, getArticleError } = await getArticle(
    supabase,
    articleId
  )
  const likesCount = await countLikes(supabase, articleId)
  const commentCount = await countComments(supabase, articleId)
  const publisherData = await getPublisherData(supabase, articleId)

  if (getArticleError) {
    throw new Error("Article not found")
  }
  if (!getArticleData) {
    throw new Error("getArticleData not found")
  }

  const article = getArticleData
  const articleContent: JSONContent = article.content as JSONContent
  articleData.title = articleContent?.content?.[0]?.content?.[0]?.text
  articleData.paragraph = articleContent?.content?.[1]?.content?.[0]?.text
  articleData.publishedAt = article.created_at
  articleData.likesCount = likesCount
  articleData.commentsCount = commentCount
  articleData.publisher = publisherData.fullName
  articleData.publisherAvatar = publisherData.avatarUrl
  articleData.imageUrl = getImageUrlFromJsonContent(articleContent)

  return articleData as articleData
}
