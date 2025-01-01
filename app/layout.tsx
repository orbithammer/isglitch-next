import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import Navbar from "@/components/Navbar"
import Header from "@/components/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="sm:mx-24 md:mx-96">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}