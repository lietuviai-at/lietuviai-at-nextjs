"use client"

import Script from "next/script"

export default function Ga() {
  return (
    <div>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-5XN136YS81" />
      <Script
        id="google_analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5XN136YS81');`,
        }}
      />
    </div>
  )
}
