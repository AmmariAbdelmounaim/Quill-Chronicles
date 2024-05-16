"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDownIcon, MessageCircle } from "lucide-react";
import Comments from "./comments";
import { Tables } from "@/types/supabase";
import { useEffect, useState, useTransition } from "react";
import { addComment } from "@/actions/add-comment";
import { useToast } from "../ui/use-toast";

interface CommentButtonProps {
  comments: Tables<"comments">[] | null;
  profileId: string | null;
  articleId: string;
}

export function CommentButton({
  comments,
  profileId,
  articleId,
}: CommentButtonProps) {
  const [comment, setComment] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    startTransition(async () => {
      const data = await addComment(comment, profileId!, articleId!);
      if (data?.error) {
        toast({ variant: "destructive", title: data.error });
      }
      setComment(""); // Clear the input field after submission
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MessageCircle className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Responses</SheetTitle>
        </SheetHeader>
        {/* comment section */}
        <div className="flex py-3 gap-3">
          <Input
            id="comment"
            className="col-span-3"
            onChange={handleCommentChange}
            value={comment}
          />
          <Button onClick={handleCommentSubmit} disabled={isPending}>
            Submit
          </Button>
        </div>
        {/* display comment */}
        <div className="flex my-4">
          <p className="text-sm font-medium">Recent Comments</p>
        </div>
        <Comments comments={comments} />
      </SheetContent>
    </Sheet>
  );
}
