import { Tables } from "@/types/supabase";
import { formatDate } from "@/utils/format-date";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "novel";
import DeleteArticle from "./delete-article";

interface UserArticleProps {
  article: Tables<"articles">;
}
export default function UserArticle({ article }: UserArticleProps) {
  const articleContent = article.content as JSONContent;
  const title = articleContent?.content?.[0]?.content?.[0]?.text;
  const paragraph = articleContent?.content?.[1]?.content?.[0]?.text;
  const publishedAt = formatDate(article.created_at);

  return (
    <article className="rounded-lg flex flex-col justify-between border hover:cursor-pointer  border-gray-200 bg-background p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="text-xl font-playfairdisplay font-bold text-foreground ">
          {title}
        </h2>
        <p className="text-muted-foreground ">{publishedAt}</p>
        <p className="line-clamp-3 text-muted-foreground ">{paragraph}</p>
      </div>
      <div className="mt-4 flex gap-4 justify-end items-center">
        <Link href={`/edit-article/${article.id}`}>
          <Pencil className="size-5 stroke-primary opacity-80 hover:opacity-100" />
        </Link>
        <DeleteArticle articleId={article.id} />
      </div>
    </article>
  );
}
