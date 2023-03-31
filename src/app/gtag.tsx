"use client"

import Script from "next/script"
import Cookies from "js-cookie"

export default function Gtag() {
  const consent = Cookies.get("consent")

  return (
    <div>
      <Script
        id="google_analytics_datalayer"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': "${consent || "denied"}",
              'wait_for_update': 500
            });
          `,
        }}
      />

      <Script
        id="google_tag_manager"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_DOMAIN}`}
          height="0"
          width="0"
          className="hidden"
        ></iframe>
      </noscript>
    </div>
  )
}
