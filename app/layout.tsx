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
        <Script id="metricool-tracking" strategy="afterInteractive">
            {`
              function loadScript(a){
                var b=document.getElementsByTagName("head")[0],
                c=document.createElement("script");
                c.type="text/javascript",
                c.src="https://tracker.metricool.com/resources/be.js",
                c.onreadystatechange=a,
                c.onload=a,
                b.appendChild(c)
              }
              loadScript(function(){
                beTracker.t({hash:"46d3ba3cef2d0d3d6d9e7f956730041d"})
              });
            `}
        </Script>
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