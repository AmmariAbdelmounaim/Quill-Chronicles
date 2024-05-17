import { Heart, MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { formatDate } from "@/utils/format-date";
import Link from "next/link";

interface ArticleCardProps {
  articleId: string;
  title: string;
  createdAt: string;
  content: string;
}

export default function ArticleCard({
  articleId,
  title,
  createdAt,
  content,
}: ArticleCardProps) {
  return (
    <article className="rounded-lg flex flex-col justify-between border hover:cursor-pointer  border-gray-200 bg-background p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="text-xl font-playfairdisplay font-bold text-foreground ">
          {title}
        </h2>
        <p className="text-muted-foreground ">{formatDate(createdAt)}</p>
        <p className="line-clamp-3 text-muted-foreground ">{content}</p>
      </div>
      <div className="mt-4 flex gap-4 justify-end items-center">
        <Link className={buttonVariants()} href={`/articles/${articleId}`}>
          Read More
        </Link>
      </div>
    </article>
  );
}
