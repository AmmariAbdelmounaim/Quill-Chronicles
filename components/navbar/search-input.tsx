"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { useDebounce } from "use-debounce";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput({ ...props }: SearchInputProps) {
  const { setSearchQuery } = useSearch();

  return (
    <div className="relative w-full">
      <Search className="absolute stroke-gray-500 left-2 top-5 -translate-y-1/2 transform" />
      <Input
        className="w-[20rem]  pl-[2.2rem]"
        {...props}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Don't worry about keywords we use embeddings for search ;)"
      />
    </div>
  );
}
