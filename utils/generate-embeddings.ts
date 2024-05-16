import { pipeline } from "@xenova/transformers";

export async function generateEmbeddings(text: string) {
  const generateEmbedding = await pipeline(
    "feature-extraction",
    "Supabase/gte-small"
  );

  // Generate a vector using Transformers.js
  const output = await generateEmbedding(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}
