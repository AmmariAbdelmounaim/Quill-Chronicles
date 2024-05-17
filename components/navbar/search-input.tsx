"use client"

import { InputHTMLAttributes } from "react"
import { Search } from "lucide-react"
import { useDebounce } from "use-debounce"

import { useSearch } from "@/hooks/use-search"
import { Input } from "@/components/ui/input"

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput({ ...props }: SearchInputProps) {
  const { setSearchQuery } = useSearch()

  return (
    <div className="relative hidden w-full sm:block ">
      <Search className="absolute left-2 top-5 -translate-y-1/2 transform stroke-gray-500" />
      <Input
        className="w-[26rem]  pl-[2.2rem]"
        {...props}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Don't worry about keywords we use embeddings for search ;)"
      />
    </div>
  )
}
