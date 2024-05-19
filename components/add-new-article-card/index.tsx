import Link from "next/link"
import { routes } from "@/routes"
import { PlusCircleIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export default function AddArticleCard() {
  return (
    <Link
      href={routes.newArticle.path}
      className="hover group flex min-h-[266px] cursor-pointer  flex-col items-center justify-center rounded-lg border border-gray-200  bg-background p-4 shadow-sm transition-all hover:cursor-pointer hover:shadow-md dark:border-gray-800 dark:hover:border-gray-400 dark:hover:shadow-lg"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <PlusCircleIcon className="size-28 fill-background stroke-white opacity-80 group-hover:opacity-100  dark:fill-white dark:stroke-background" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Create new article</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  )
}
