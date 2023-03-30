import Slapukai from "@/components/layout/Slapukai"
import Gtag from "./gtag"
import Header from "./header"
import { format } from "date-fns"
import "./globals.css"

import { Literata, Noto_Sans } from "next/font/google"

const noto_sans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
})

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
})

export const metadata = {
  title: "Austrijos Lietuvių Bendruomenė",
  description:
    "Savanoriška, nevyriausybinė, politiškai neutrali, ne pelno siekianti organizacija, siekianti vienyti ir bendrai veiklai telkti Austrijoje gyvenančius lietuvius bei Lietuvos draugus.",
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${noto_sans.className} ${literata.variable}`}>
      <body>
        <Gtag />

        <div className="text-gray-900">
          <div className="bg-light-background-transparent">
            {/* @ts-ignore */}
            <Header />
          </div>

          {children}

          <div className="bg-light-background-transparent">
            <div className="mx-auto flex max-w-screen-2xl justify-between gap-8 px-4 md:px-8">
              <p className="py-8 text-sm text-gray-500">
                {format(new Date(), "yyyy")} &copy; Austrijos lietuvių
                bendruomenė
              </p>
              <Slapukai />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
