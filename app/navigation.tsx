"use client"

import type { manuItem } from "@/lib/api"
import { Fragment, useRef, useState } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"

export default function Navigation({ data }: { data: manuItem[] }) {
  const [navOpen, setNavOpen] = useState(false)

  const DropDown = ({ subItems }: { subItems: manuItem[] }) => {
    const buttonRef = useRef(null)
    const dropdownRef = useRef(null)
    const timeoutDuration = 200
    let timeout: any

    // @ts-ignore
    const openMenu = () => buttonRef?.current.click()
    const closeMenu = () =>
      // @ts-ignore
      dropdownRef?.current?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        })
      )

    const onMouseEnter = (closed?: any) => {
      clearTimeout(timeout)
      closed && openMenu()
    }
    const onMouseLeave = (open: any) => {
      open && (timeout = setTimeout(() => closeMenu(), timeoutDuration))
    }

    return (
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div
              //onClick={openMenu}
              onMouseEnter={() => onMouseEnter(!open)}
              onMouseLeave={() => onMouseLeave(open)}
              className="inline-block text-left leading-3"
            >
              <Menu.Button
                ref={buttonRef}
                className="rounded-full px-1 py-1 outline-green-600 hover:bg-yellow-500 hover:text-white"
              >
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" > <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /> </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                ref={dropdownRef}
                onMouseEnter={() => onMouseEnter()}
                onMouseLeave={() => onMouseLeave(open)}
                static
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right overflow-hidden rounded-md bg-white shadow-normal focus:outline-none"
              >
                <div>
                  {subItems.map((item: manuItem) => {
                    return (
                      <Menu.Item key={item.key}>
                        {({ active }) => (
                          <Link
                            href={item.uri}
                            className={`block text-sm ${
                              active
                                ? "bg-yellow-500 text-white"
                                : "text-gray-700"
                            }`}
                          >
                            <div className="py-3 px-4 decoration-2 underline-offset-2 hover:bg-yellow-500 hover:text-white hover:underline-offset-2">
                              {item.title}
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    )
  }

  const BigScreenNav = () => {
    if (!data) return <div>Nepavyko įkelti svetainės navigacijos</div>

    return (
      <div className="flex flex-wrap items-center justify-end gap-x-1">
        {data.map((mainItem) => {
          return (
            <div key={mainItem.key} className="relative flex items-center">
              <Link
                href={mainItem.uri}
                className={`rounded-full py-2 text-sm decoration-gray-300 outline-1 outline-green-600 hover:bg-yellow-500 hover:text-white focus:outline-green-700 active:outline-green-600 ${
                  mainItem.children.length !== 0 ? "pl-3 pr-2" : "px-3"
                }`}
              >
                {mainItem.title}
              </Link>

              {mainItem.children.length !== 0 && (
                <DropDown subItems={mainItem.children} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const SmallScreenNav = () => {
    if (!data) return <div>Nepavyko įkelti svetainės navigacijos</div>

    return (
      <div className="flex flex-col items-end gap-4">
        {data.map((mainItem) => {
          return (
            <div key={mainItem.key} className="flex flex-col items-end">
              <Link
                href={mainItem.uri}
                onClick={() => setNavOpen(false)}
                className="text-base decoration-gray-300 hover:text-green-700"
              >
                {mainItem.title}
              </Link>
              {mainItem.children.length !== 0 && (
                <div className="mt-2 flex flex-col items-end gap-1 border-r-2 py-1">
                  {mainItem.children.map((item) => {
                    return (
                      <div key={item.key} className="pr-4">
                        <Link
                          href={item.uri}
                          onClick={() => setNavOpen(false)}
                          className="text-sm text-gray-500 decoration-gray-300 decoration-2 underline-offset-2 hover:text-green-600 hover:underline"
                        >
                          {item.title}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 py-4 px-4 md:py-8 md:px-8">
      <div className="flex items-center justify-between gap-8">
        <div className="flex w-60 items-center gap-2 xs:w-auto lg:min-w-[440px]">
          <Link href="/" onClick={() => setNavOpen(false)}>
            <div className="flex flex-col">
              <span className="text-base font-medium uppercase leading-tight md:text-xl">
                Austrijos Lietuvių Bendruomenė
              </span>
              <span className="text-xs md:text-base">
                Litauische Gemeinschaft in Österreich
              </span>
            </div>
          </Link>

          <div>
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="64" fill="none" className="object-cover h-16 w-12"> <g stroke="#000" strokeLinejoin="round" clipPath="url(#a)"> <path fill="#fff" d="M19.89 38.18c-3.494-5.59-8.964-7.071-8.964-7.071s.129 4.951 3.754 10.653c3.626 5.702 14.808 16.619 14.808 16.619s-6.103-14.61-9.598-20.2Z"/> <path fill="#C63631" d="M23.798 32.32c-6.69-2.082-12.816-.43-12.816-.43s3.431 3.894 10.301 5.98c6.87 2.085 23.471 3.259 23.471 3.259s-14.266-6.728-20.956-8.81Z"/> <path fill="#467523" d="M13.704 21.248c-3.785 5.432-3.123 11.07-3.123 11.07s3.85-2.224 7.681-7.814 10.52-21.063 10.52-21.063-11.294 12.375-15.079 17.807Z"/> <path fill="#FFB617" d="M5.237 22.55c1.124 6.35 5.632 9.638 5.632 9.638s1.38-3.821 0-11.265C9.489 13.479 3.968.734 3.968.734s.146 15.467 1.27 21.817Z"/> <path fill="#C63631" d="M11.75 43.065c1.258-6.328-.707-11.82-.707-11.82S6.8 35.273 5.563 41.763C4.327 48.252 6.07 63 6.07 63s4.42-13.607 5.679-19.935Z"/> <path fill="#D0112B" d="M20.541 25.807c-6.733 1.963-9.92 6.07-9.92 6.07s4.853 1.23 11.733-.828c6.88-2.058 21.424-10.1 21.424-10.1s-16.503 2.895-23.236 4.858Z"/> </g> <defs> <clipPath id="a"> <path fill="#fff" d="M0 0h48v64H0z"/> </clipPath> </defs> </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/*<button className="shrink-0 lg:order-last">*/}
          {/* prettier-ignore */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> */}
          {/*</button>*/}

          <div className="hidden lg:flex">
            <BigScreenNav />
          </div>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="shrink-0 rounded-full p-1 lg:hidden"
          >
            {navOpen ? (
              <>
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </>
            ) : (
              <>
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {navOpen && (
        <div className="flex border-t-2 border-dashed bg-white pt-4 pb-2 lg:hidden">
          <div className="gap2 flex w-full flex-col items-end">
            <SmallScreenNav />
          </div>
        </div>
      )}
    </div>
  )
}
