import { fetchUserProfile } from "@/actions/auth/fetch-user-profile";
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

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.articleId)
    .single();

  if (error) {
    redirect("/articles");
  }

  const likes = await countLikes(supabase, params.articleId);
  const hasLikedArticle = await hasProfileLikedArticle(
    supabase,
    userProfile?.id!,
    params.articleId
  );
  const initialContent: JSONContent = data.content as unknown as JSONContent;
  return (
    <main className="container flex justify-center px-4 py-12 sm:px-6 lg:px-8">
      <NovelPreviewEditor content={initialContent} />
      <LikeButton
        likes={likes!}
        profileId={userProfile?.id}
        articleId={params.articleId}
        initialLiked={hasLikedArticle}
      />
    </main>
  );
}
