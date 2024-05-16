"use client";

import { ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tables } from "@/types/supabase";
import { getInitials } from "@/utils/get-initials";
import { useEffect, useState } from "react";
import { fetchCommentData } from "@/actions/fetch-comment";
import { Skeleton } from "../ui/skeleton";

interface SingleCommentProps {
  comment: Tables<"comments">;
}

export default function SingleComment({ comment }: SingleCommentProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchComment = async () => {
      const data = await fetchCommentData(comment);
      setAvatarUrl(data?.avatar_url!);
      setFullName(data?.full_name!);
      setCreatedAt(data?.createdAt!);
      setIsLoading(false);
    };

    fetchComment();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="w-full items-start">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage alt="Profile picture" src={avatarUrl} />
              <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium capitalize">{fullName}</p>
              <p className="text-xs text-gray-500">{createdAt}</p>
              <p className="mt-1">{comment.comment}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
