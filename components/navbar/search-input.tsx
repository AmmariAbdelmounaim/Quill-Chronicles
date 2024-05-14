import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput({ ...props }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute stroke-gray-500 left-2 top-5 -translate-y-1/2 transform" />
      <Input className="w-[20rem]  pl-[2.2rem]" {...props} />
    </div>
  );
}
