"use client"

import { createRef, useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"

export default function Slapukai() {
  const [open, setOpen] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [performanceCookies, setPerformanceCookies] = useState(
    Cookies.get("consent") === "granted" ? true : false || false
  )
  const consentRef = createRef<HTMLInputElement>()

  const handleAllAccept = () => {
    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "granted",
    })
    setPerformanceCookies(true)
    Cookies.set("consent", "granted", { expires: 365 })
    setOpen(false)
  }

  const handleAllReject = () => {
    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
    })
    setPerformanceCookies(false)
    Cookies.set("consent", "denied", { expires: 31 })
    setOpen(false)
  }

  const handelSaveSettings = () => {
    consentRef.current!.checked ? handleAllAccept() : handleAllReject()
  }

  useEffect(() => {
    const consent = Cookies.get("consent")

    if (consent && consent === "granted") {
      handleAllAccept()
    }

    if (!consent) {
      setOpen(true)
    }
  }, [])

  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-wrap justify-end gap-x-4 gap-y-2">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-600 duration-75 hover:text-green-700"
          >
            Privatumo politika
          </Link>

          <button
            className="text-sm text-gray-600 duration-75 hover:text-green-700"
            onClick={() => setOpen(!open)}
          >
            Slapukų nustatymai
          </button>
        </div>
      </div>

      {open && (
        <div className="shadow-xl-flat fixed bottom-0 left-0 z-50 m-4 flex max-w-3xl flex-col gap-2 rounded-xl bg-white p-6 shadow-normal md:m-6">
          <div className="items font-pt-sans flex items-center gap-2 text-xl text-black">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"  className="shrink-0"> <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.937.005-.034.016-.136.017-.17a.998.998 0 0 0-1.254-1.006A2.963 2.963 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM12 20c-4.411 0-8-3.589-8-8a7.962 7.962 0 0 1 6.006-7.75A5.006 5.006 0 0 0 15 9l.101-.001a5.007 5.007 0 0 0 4.837 4C19.444 16.941 16.073 20 12 20z"></path> <circle cx="12.5" cy="11.5" r="1.5"></circle> <circle cx="8.5" cy="8.5" r="1.5"></circle> <circle cx="7.5" cy="12.5" r="1.5"></circle> <circle cx="15.5" cy="15.5" r="1.5"></circle> <circle cx="10.5" cy="16.5" r="1.5"></circle> </svg>
            Ši svetainė naudoja slapukus
          </div>
          <div className="pb-1">
            <p className="text-gray-700">
              Ši svetainė naudoja slapukus, kad užtikrintų geriausią patirtį
              svetainėje.
              <Link href="/privacy-policy">
                <span className="dark:hover:text-site-primary pl-1 underline hover:text-green-700">
                  Sužinokite daugiau apie slapuku politiką
                </span>
              </Link>
              .
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <button
              className="grow rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-2 text-black hover:border-green-700 hover:bg-green-600"
              onClick={handleAllAccept}
            >
              Aš sutinku su slapuku politika
            </button>
            <button
              className="rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-2 text-black hover:border-red-700 hover:bg-red-500"
              onClick={handleAllReject}
            >
              Aš nesutinku
            </button>

            {openSettings ? (
              <button
                className="hover:bg-orange rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-2 text-black hover:bg-gray-300"
                onClick={handelSaveSettings}
              >
                Išsaugoti nustatymus
              </button>
            ) : (
              <button
                className="hover:bg-orange rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-2 text-black hover:bg-gray-300"
                onClick={() => setOpenSettings(!openSettings)}
              >
                Noriu pasirinkti, su kuo sutinku
              </button>
            )}
          </div>

          {openSettings && (
            <div className="flex flex-col items-start gap-1 text-black">
              <h2 className="font-pt-sans text-lg">Nustatymai:</h2>
              <div className="flex flex-col items-start gap-1 ">
                <label>
                  <input
                    type="checkbox"
                    disabled={true}
                    checked={true}
                    className="focus:ring-site-primary mr-2 h-5 w-5 rounded-md border-2 border-gray-400 bg-gray-100 text-gray-400 focus:border-transparent focus:ring-4 focus:ring-offset-0"
                  />
                  <span>
                    Reikalingi slapukai{" "}
                    <i>
                      (nustatymai / duomenys, kuriuos reikia laikyti tarp
                      puslapių navigacijos šiame puslapyje)
                    </i>
                  </span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={performanceCookies}
                    className="focus:ring-site-primary mr-2 h-5 w-5 rounded-md border-2 border-gray-400 bg-gray-200 text-green-600 focus:border-transparent focus:ring-2 focus:ring-offset-0"
                    onChange={() => setPerformanceCookies(!performanceCookies)}
                    ref={consentRef}
                  />
                  <span>
                    Našumo slapukai{" "}
                    <i>(rinkti analitinius duomenis apie svetainės našumą)</i>
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
