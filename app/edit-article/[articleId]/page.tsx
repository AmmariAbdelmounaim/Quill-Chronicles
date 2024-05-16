import NovelEditor from "@/components/novelEditor";
import { createClient } from "@/utils/supabase/server";
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
    throw new Error(error.message);
  }
  const initialContent: JSONContent = data.content as unknown as JSONContent;
  console.log(initialContent);
  return (
    <main className="container flex justify-center px-4 py-12 sm:px-6 lg:px-8">
      <NovelEditor initialContent={initialContent} />
    </main>
  );
}
