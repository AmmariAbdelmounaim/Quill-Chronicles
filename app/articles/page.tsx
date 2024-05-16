import ArticlePreviewCard from "@/components/article-preview-card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
      <div className="flex justify-between">
        <h2 className="text-3xl mb-6 font-bold font-playfairdisplay tracking-tighter sm:text-5xl">
          Your Articles
        </h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={"/new-article"}
        >
          Write an Article
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ArticlePreviewCard />
        <ArticlePreviewCard />
        <ArticlePreviewCard />
        <ArticlePreviewCard />
        <ArticlePreviewCard />
        <ArticlePreviewCard />
      </div>
    </main>
  );
}
