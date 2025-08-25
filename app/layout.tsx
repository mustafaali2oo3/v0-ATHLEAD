import type React from "react"
import type { Metadata } from "next"
import { Jockey_One } from "next/font/google"
import "./globals.css"

const jockeyOne = Jockey_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jockey-one",
})

export const metadata: Metadata = {
  title: "ATHLEAD - Empowering Athletes",
  description: "Global platform for athletes to showcase talent and connect",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${jockeyOne.style.fontFamily};
  --font-jockey-one: ${jockeyOne.variable};
}
        `}</style>
      </head>
      <body className={jockeyOne.className}>{children}</body>
    </html>
  )
}
