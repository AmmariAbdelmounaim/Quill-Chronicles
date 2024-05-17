import { fetchUserProfile } from "@/actions/auth/fetch-user-profile";
import { CommentButton } from "@/components/comment-section/comment-button";
import LikeButton from "@/components/like-button.tsx";
import NovelPreviewEditor from "@/components/novelPreviewEditor";
import { countLikes } from "@/data/count-likes";
import { hasProfileLikedArticle } from "@/data/get-liked-article";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { JSONContent } from "novel";

export default async function ViewArticle({
  params,
}: {
  params: { articleId: string };
}) {
  const supabase = createClient();

  const userProfile = await fetchUserProfile();

  const { data: articleData, error: articleError } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.articleId)
    .single();

  if (articleError) {
    throw new Error(articleError.message);
  }

  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleData?.id);

  if (commentsError) {
    throw new Error(commentsError.message);
  }

  const likes = await countLikes(supabase, params.articleId);

  const hasLikedArticle = await hasProfileLikedArticle(
    supabase,
    userProfile?.id!,
    params.articleId
  );

  const initialContent: JSONContent =
    articleData.content as unknown as JSONContent;

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-start">
        <NovelPreviewEditor content={initialContent} />
        <div className="ml-[48px] flex gap-2">
          <LikeButton
            likes={likes!}
            profileId={userProfile?.id}
            articleId={params.articleId}
            initialLiked={hasLikedArticle}
          />
          <CommentButton
            comments={commentsData}
            profileId={userProfile?.id!}
            articleId={articleData.id}
          />
        </div>
      </div>
    </main>
  );
}
