import { cn } from "@/utils/tailwind-merge";

interface HeaderProps {
  label?: string;
  header?: string;
}

export default function Header({ label, header }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold")}>{header}</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
