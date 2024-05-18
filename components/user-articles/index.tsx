import { fetchUserArticles } from "@/actions/fetch-user-articles"

import ArticlePreviewCard from "@/components/article-preview-card"

export default async function UserArticles() {
  const articles = await fetchUserArticles()

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticlePreviewCard key={article.id} article={article} />
      ))}
    </div>
  )
}
