"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
} from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import useLocalStorage from "@/hooks/use-local-storage";

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
        {children}
        <Toaster />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
