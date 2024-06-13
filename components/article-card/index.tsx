import Link from "next/link"
import { articleData } from "@/actions/fetch-article-data"
import { formatDate } from "@/utils/format-date"
import { getInitials } from "@/utils/get-initials"
import { HeartIcon, MessageCircleIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { buttonVariants } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

interface ArticleCardProps {
  articleData: articleData
}

export default function ArticleCard({ articleData }: ArticleCardProps) {
  const {
    id,
    title,
    likesCount,
    commentsCount,
    paragraph,
    publishedAt,
    imageUrl,
    publisher,
    publisherAvatar,
  } = articleData

  return (
    <Card className="w-full max-w-md border border-gray-200 bg-background text-foreground shadow-sm transition-all  hover:shadow-md dark:border-gray-800 dark:hover:border-gray-400 dark:hover:shadow-lg">
      <CardContent className="flex h-full flex-col justify-between pt-4">
        <div className="space-y-4">
          <img
            src={imageUrl!}
            alt="Article Image"
            className="top-0 h-[200px] w-full rounded-t-lg object-cover"
            height={100}
            width={300}
          />
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={publisherAvatar} />
              <AvatarFallback>{getInitials(publisher)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-bold ">{publisher}</p>
              <p>{formatDate(publishedAt)}</p>
            </div>
          </div>
          <h3 className="font-playfairdisplay text-xl font-bold">{title}</h3>
          <p className="line-clamp-3 text-muted-foreground">{paragraph}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>{likesCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircleIcon className="h-4 w-4 text-gray-500" />
              <span>{commentsCount}</span>
            </div>
          </div>
          <Link href={`articles/${id}`} className={buttonVariants()}>
            Read More
          </Link>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
