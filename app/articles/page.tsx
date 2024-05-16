import { fetchUserProfile } from "@/actions/auth/fetch-user-profile";
import ArticlePreviewCard from "@/components/article-preview-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function ArticlesPage() {
  const supabase = createClient();
  const userProfile = await fetchUserProfile();
  let articles: Tables<"articles">[] = [];

  if (userProfile) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("profile_id", userProfile?.id);
    if (error) {
      throw new Error(error.message);
    }
    articles = data;
  }

  revalidatePath("/articles");

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
      <div className="flex justify-between">
        <h2 className="text-3xl mb-6 font-bold font-playfairdisplay tracking-tighter sm:text-5xl">
          Your Articles
        </h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={"/new-article"}
        >
          Write an Article
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticlePreviewCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
