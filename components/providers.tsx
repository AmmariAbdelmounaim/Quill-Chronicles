"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import useLocalStorage from "@/hooks/use-local-storage";
import { SearchProvider } from "@/context/search-provider";

export const AppContext = createContext<{
  font: string;
  setFont: (value: string) => void | Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => {},
});

export default function Providers({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");

  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme="light"
    >
      <AppContext.Provider
        value={{
          font,
          setFont,
        }}
      >
        <SearchProvider>{children}</SearchProvider>
      </AppContext.Provider>
      <Toaster />
    </ThemeProvider>
  );
}
