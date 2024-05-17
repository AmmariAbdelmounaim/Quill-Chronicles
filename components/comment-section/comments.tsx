"use client"

import { Tables } from "@/types/supabase"

import SingleComment from "./single-comment"

interface CommentsProps {
  comments: Tables<"comments">[] | null
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <div className="flex flex-col gap-4">
      {comments &&
        comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
    </div>
  )
}
