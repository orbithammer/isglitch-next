import type { Metadata } from "next"
import Script from 'next/script'
import "./globals.css"
import Header from "@/components/Header"
import ThemeProvider from "@/lib/theme/ThemeProvider"
import CookieConsent from "@/components/CookieConsent"
import ExitIntent from "@/components/ExitIntent"

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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6716330636841627"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="sm:mx-[10%] mx-auto">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <CookieConsent />
          <ExitIntent />
        </ThemeProvider>
      </body>
    </html>
  )
}