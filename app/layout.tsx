import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { cn } from "@/utils/tailwind-merge";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js Full Stack blog app",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairdisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfairdisplay",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        playfairdisplay.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
