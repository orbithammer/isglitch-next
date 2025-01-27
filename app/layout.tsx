import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import ThemeProvider from "@/lib/theme/ThemeProvider"
import CookieConsent from "@/components/CookieConsent"

export const metadata: Metadata = {
  metadataBase: new URL('https://isglitch.com'),
  icons: {
    icon: '/logo.svg',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed',
    },
  },
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="sm:mx-[10%] mx-auto">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}