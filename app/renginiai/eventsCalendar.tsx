"use client"

import { useState } from "react"
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { lt } from "date-fns/locale"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export type CalEvent = {
  title: string
  date: string
  link: string
}

export default function EventsCalendar({ events }: { events: CalEvent[] }) {
  const [activeDate, setActiveDate] = useState(new Date())

  const getHeader = () => {
    return (
      <div className="col-span-7 flex items-center justify-between gap-4">
        <h2 className="font-literata text-3xl font-medium capitalize">
          {format(activeDate, "LLLL", { locale: lt })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full bg-white p-1.5 hover:bg-yellow-500 hover:text-white"
            onClick={() => setActiveDate(subMonths(activeDate, 1))}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <button
            className="rounded-full bg-white py-2 px-4 hover:bg-yellow-500 hover:text-white"
            onClick={() => {
              setActiveDate(new Date())
            }}
          >
            Šiandien
          </button>
          <button
            className="rounded-full bg-white p-1.5 hover:bg-yellow-500 hover:text-white"
            onClick={() => setActiveDate(addMonths(activeDate, 1))}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    )
  }

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate, { locale: lt })
    const weekDays = []
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div
          key={`week-${day}`}
          className="font-semibold uppercase text-gray-600"
        >
          {format(addDays(weekStartDate, day), "EEEEEE.", { locale: lt })}
        </div>
      )
    }
    return <div className="hidden grid-cols-7 gap-4 md:grid">{weekDays}</div>
  }

  const getEvent = (currentDate: Date, matchingEvents: CalEvent[]) => {
    const events = matchingEvents.filter((event) => {
      return isSameDay(currentDate, new Date(event.date))
    })

    if (!events) {
      return null
    }

    return (
      <>
        {events.map((event, index) => {
          return (
            <div
              key={`${event.date}-${index}`}
              className="border-t-2 border-dashed py-1 px-2 text-sm"
            >
              {event.title}
            </div>
          )
        })}
      </>
    )
  }

  const generateDatesForCurrentWeek = (
    date: Date,
    activeDate: Date,
    matchingEvents: CalEvent[]
  ) => {
    let currentDate = date
    const week = []
    for (let day = 0; day < 7; day++) {
      week.push(
        <div
          key={format(currentDate, "T")}
          className={`rounded-md border-2 border-dashed md:min-h-[6rem]
          ${
            isSameMonth(currentDate, activeDate)
              ? ""
              : "hidden text-gray-300 md:block"
          }
          ${!isBefore(currentDate, new Date()) ? "" : "text-gray-300 md:block"}
          ${
            isSameDay(currentDate, new Date())
              ? "border-green-600 border-opacity-40"
              : ""
          }`}
        >
          <div className="py-1 px-2">
            <span className="pr-1 capitalize md:hidden">
              {format(currentDate, "EEEEEE.", { locale: lt })}
            </span>
            {format(currentDate, "d", { locale: lt })}
          </div>
          {getEvent(currentDate, matchingEvents)}
        </div>
      )
      currentDate = addDays(currentDate, 1)
    }
    return (
      <div key={format(currentDate, "w")} className="grid gap-2 md:grid-cols-7">
        {week}
      </div>
    )
  }

  const getSelectedMonthEvents = (
    startOfTheSelectedMonth: Date,
    endOfTheSelectedMonth: Date
  ) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        isAfter(eventDate, startOfTheSelectedMonth) &&
        isBefore(eventDate, endOfTheSelectedMonth)
      )
    })
  }

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate)
    const endOfTheSelectedMonth = endOfMonth(activeDate)
    const startDate = startOfWeek(startOfTheSelectedMonth, { locale: lt })
    const endDate = endOfWeek(endOfTheSelectedMonth, { locale: lt })

    const matchingEvents = getSelectedMonthEvents(
      startOfTheSelectedMonth,
      endOfTheSelectedMonth
    )

    let currentDate = startDate

    const allWeeks = []

    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(currentDate, activeDate, matchingEvents)
      )
      currentDate = addDays(currentDate, 7)
    }

    return <div className="space-y-2">{allWeeks}</div>
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {getHeader()}
      {getWeekDaysNames()} {getDates()}
    </div>
  )
}
