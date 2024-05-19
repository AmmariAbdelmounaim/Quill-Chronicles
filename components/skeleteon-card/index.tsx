import { Skeleton } from "../ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col items-end space-y-3">
      <Skeleton className="h-[200px] w-[400px] rounded-xl" />
      <div className="space-y-2 ">
        <Skeleton className="h-[40px] w-[100px]" />
      </div>
    </div>
  )
}
