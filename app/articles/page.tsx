import { Suspense } from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import UserArticles from "@/components/user-articles"
import UserArticlesSkeleton from "@/components/user-articles/user-articles-skeleton"

export default function ArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
      <div className="flex justify-between">
        <h2 className="mb-6 font-playfairdisplay text-3xl font-bold tracking-tighter sm:text-5xl">
          Your Articles
        </h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={"/new-article"}
        >
          Write an Article
        </Link>
      </div>

      <Suspense fallback={<UserArticlesSkeleton />}>
        <UserArticles />
      </Suspense>
    </main>
  )
}
