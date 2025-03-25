import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "@repo/ui/styles.css"

import ThemeProvider from '@repo/ui/providers/theme-provider'
import { CourseStoreProvider } from '@repo/supabase/providers/course-provider'
import { ProfileStoreProvider } from "@repo/supabase/providers/user-provider"
import { siteConfig } from "./siteConfig"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.escuelatvp.cl"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "felipe",
      url: "",
    },
  ],
  creator: "felipe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full bg-white`} suppressHydrationWarning>
      <body className="h-full antialiased">
        <ThemeProvider defaultTheme="light" enableSystem={true} attribute="class">
          <ProfileStoreProvider>
            <CourseStoreProvider>
              {children}
            </CourseStoreProvider>            
          </ProfileStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
