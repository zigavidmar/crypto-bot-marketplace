import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from 'geist/font/sans';
import { DM_Sans } from "next/font/google"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const dm_sans = DM_Sans({ subsets: ['latin'] })

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={dm_sans.className}>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" 
            defaultTheme="root"
            enableSystem
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}