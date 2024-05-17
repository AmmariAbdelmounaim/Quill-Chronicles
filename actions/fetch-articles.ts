"use server";

import { createClient } from "@/utils/supabase/server";
import { embeddingsSearch } from "./search-articles";
import { Tables } from "@/types/supabase";

export async function fetchArticles(page: number, searchQuery?: string) {
  const supabase = createClient();

  const pageSize = 6;

  let filteredArticleIds = null;
  let articles = null;
  let error = null;

  if (searchQuery && searchQuery.length >= 3) {
    filteredArticleIds = await embeddingsSearch(searchQuery);
    console.log(filteredArticleIds);
    if (filteredArticleIds) {
      // remove duplicates
      const uniqueArticleIds = Array.from(
        new Set(filteredArticleIds.map((article) => article.id))
      );
      console.log(uniqueArticleIds);
      // retrieve articles
      const response = await supabase
        .from("articles")
        .select("*")
        .in("id", uniqueArticleIds)
        .range((page - 1) * pageSize, page * pageSize - 1);

      const unorderedArticles = response.data as Tables<"articles">[];
      const orderedArticles = uniqueArticleIds
        .map((id) => unorderedArticles.find((article) => article.id === id))
        .filter((article) => article !== undefined);

      console.log(orderedArticles);
      articles = orderedArticles as Tables<"articles">[];
      console.log(articles);
      error = response.error;
    }
  } else {
    // retrieve articles without filtering
    const response = await supabase
      .from("articles")
      .select("*")
      .range((page - 1) * pageSize, page * pageSize - 1);

    console.log(response);

    articles = response.data;
    error = response.error;
  }

  if (error) {
    throw new Error(error.message);
  }

  return articles;
}
