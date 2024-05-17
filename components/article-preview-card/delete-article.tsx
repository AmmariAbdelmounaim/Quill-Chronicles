"use client"

import { useTransition } from "react"
import { removeArticle } from "@/actions/remove-article"
import { Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useToast } from "../ui/use-toast"

interface DeleteArticleProps {
  articleId: string
}

export default function DeleteArticle({ articleId }: DeleteArticleProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleDeleteArticle = (articleId: string) => {
    startTransition(async () => {
      const data = await removeArticle(articleId)
      if (data.error) {
        toast({
          variant: "destructive",
          title: data.error,
        })
      }
      toast({
        title: data.success,
      })
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="size-5 stroke-red-600 opacity-80 hover:opacity-100" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            article from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteArticle(articleId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
