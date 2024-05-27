import { SkeletonCard } from "@/components/skeleteon-card"

export default function LoadingRoot() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-playfairdisplay text-3xl font-bold tracking-tighter sm:text-5xl">
        Latest Posts
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      </div>
    </main>
  )
}
