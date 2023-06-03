import Slapukai from "@/components/layout/Slapukai"
import Gtag from "./gtag"
import Header from "./header"
import { format } from "date-fns"
import "./globals.css"

export const revalidate = 30

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

          <div className="bg-light-background-transparent py-8">
            <div className="mx-auto flex max-w-screen-2xl justify-between gap-8 px-4 md:items-center md:px-6">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 md:flex-row">
                <p className="hidden text-sm text-gray-500 md:block">
                  {format(new Date(), "yyyy")} &copy; Austrijos lietuvių
                  bendruomenė
                </p>

                <a
                  href="https://wordpress.lietuviai.at/admin"
                  rel="noopener noreferrer"
                  className="mr-auto inline-flex items-center gap-1 text-sm text-gray-600 duration-75 hover:text-green-700"
                >
                  Prisijungti
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </a>
              </div>
              <Slapukai />
            </div>
            <div className="px-4 pt-8 text-center md:hidden">
              <p className="text-sm text-gray-500">
                {format(new Date(), "yyyy")} &copy; Austrijos lietuvių
                bendruomenė
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
