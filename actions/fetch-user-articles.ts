"use server"

import { revalidatePath } from "next/cache"
import { getUserArticles } from "@/data/get-user-articles"
import { createClient } from "@/utils/supabase/server"

import { Tables } from "@/types/supabase"

import { fetchUserProfile } from "./auth/fetch-user-profile"

export async function fetchUserArticles() {
  const supabase = createClient()
  const userProfile = await fetchUserProfile()
  let articles: Tables<"articles">[] = []

  if (userProfile) {
    articles = await getUserArticles(supabase, userProfile.id)
  }

  revalidatePath("/articles")

  return articles
}
