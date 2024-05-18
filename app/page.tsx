import PaginatedArticles from "@/components/paginated-filtered-articles"

export default async function Index() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-playfairdisplay text-3xl font-bold tracking-tighter sm:text-5xl">
        Latest Posts
      </h2>
      <PaginatedArticles />
    </main>
  )
}
