import NovelEditor from "@/components/novelEditor";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { JSONContent } from "novel";

export default async function EditArticle({
  params,
}: {
  params: { articleId: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.articleId)
    .single();

  if (error) {
    redirect("/articles");
  }
  const initialContent: JSONContent = data.content as unknown as JSONContent;
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <NovelEditor initialContent={initialContent} />
    </main>
  );
}
