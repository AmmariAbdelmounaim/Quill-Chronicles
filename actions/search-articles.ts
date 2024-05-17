"use server";
import { generateEmbeddings } from "@/utils/generate-embeddings";
import { createClient } from "@/utils/supabase/server";

export async function embeddingsSearch(query: string) {
  const supabase = createClient();

  const queryEmbedding = await generateEmbeddings(query);

  const { data: articles } = await supabase.rpc("match_articles", {
    // @ts-ignore
    query_embedding: queryEmbedding, // Pass the embedding you want to compare
    match_threshold: 0.78, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  });
  return articles;
}
