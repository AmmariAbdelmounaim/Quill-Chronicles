import { Metadata } from "next"
import { fetchUserProfile } from "@/actions/auth/fetch-user-profile"
import { fetchArticleData } from "@/actions/fetch-article-data"
import { countLikes } from "@/data/count-likes"
import { getArticle } from "@/data/get-article"
import { hasProfileLikedArticle } from "@/data/get-liked-article"
import { createClient } from "@/utils/supabase/server"
import { JSONContent } from "novel"

import { CommentButton } from "@/components/comment-section/comment-button"
import LikeButton from "@/components/like-button.tsx"
import NovelPreviewEditor from "@/components/novelPreviewEditor"

export default async function ViewArticle({
  params,
}: {
  params: { articleId: string }
}) {
  const supabase = createClient()

  const userProfile = await fetchUserProfile()

  const { data: articleData, error: articleError } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.articleId)
    .single()

  if (articleError) {
    throw new Error(articleError.message)
  }

  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleData?.id)

  if (commentsError) {
    throw new Error(commentsError.message)
  }

  const likes = await countLikes(supabase, params.articleId)

  const hasLikedArticle = await hasProfileLikedArticle(
    supabase,
    userProfile?.id!,
    params.articleId
  )

  const article = await fetchArticleData(params.articleId)
  console.log(article)

  const initialContent: JSONContent =
    articleData.content as unknown as JSONContent

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-start">
        <NovelPreviewEditor content={initialContent} />
        <div className="flex gap-2">
          <LikeButton
            likes={likes!}
            profileId={userProfile?.id}
            articleId={params.articleId}
            initialLiked={hasLikedArticle}
          />
          <CommentButton
            comments={commentsData}
            profileId={userProfile?.id!}
            articleId={articleData.id}
          />
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { articleId: string }
}): Promise<Metadata> {
  const article = await fetchArticleData(params.articleId)
  console.log(article)

  const ogParams = new URLSearchParams()
  ogParams.set("title", article.title)
  ogParams.set("paragraph", article.paragraph)
  ogParams.set("publishedAt", article.publishedAt)
  ogParams.set("likesCount", `${article.likesCount}`)
  ogParams.set("commentsCount", `${article.commentsCount}`)
  ogParams.set("publisher", article.publisher)
  ogParams.set("publisherAvatar", article.publisherAvatar)
  ogParams.set("imageUrl", article.imageUrl || "")

  return {
    title: article.title,
    description: article.paragraph,
    authors: [{ name: article.publisher }],
    alternates: {
      canonical: `/articles/${params.articleId}`,
    },
    openGraph: {
      title: article.title,
      description: article.paragraph,
      type: "article",
      url: `/articles/${params.articleId}`,
      images: [
        {
          url: `/api/opengraph-image?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.paragraph,
      images: [`/api/opengraph-image?${ogParams.toString()}`],
    },
  }
}
