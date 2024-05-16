import ArticleCard from "@/components/article-card";

export default async function Index() {
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
