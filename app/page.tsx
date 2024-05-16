import ArticleCard from "@/components/article-card";
import { generateEmbeddings } from "@/utils/generate-embeddings";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const queryEmbedding = await generateEmbeddings("banana");

  const { data: articles } = await supabase.rpc("match_articles", {
    // @ts-ignore
    query_embedding: queryEmbedding, // Pass the embedding you want to compare
    match_threshold: 0.78, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  });
  console.log(articles);
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl mb-6 font-bold font-playfairdisplay tracking-tighter sm:text-5xl">
        Latest Posts
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </main>
  );
}
