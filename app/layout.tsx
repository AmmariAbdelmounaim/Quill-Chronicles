import { fetchUserProfile } from "@/actions/auth/fetch-user-profile";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import "@/styles/globals.css";
import "@/styles/prosemirror.css";

import { cn } from "@/utils/tailwind-merge";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";

// const defaultUrl = process.env.VERCEL_URL || "http://localhost:3000";

export const metadata = {
  // metadataBase: new URL(defaultUrl),
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchedProfile = await fetchUserProfile();
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
        <Providers>
          <Navbar profile={fetchedProfile} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
