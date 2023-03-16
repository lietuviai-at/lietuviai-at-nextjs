import EventsCalendar from "./eventsCalendar"

export default async function Renginiai() {
  const events = [
    {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      date: "2023-03-18",
      link: "/",
    },
    {
      title: "event-2",
      date: "2023-03-29",
      link: "/",
    },
    {
      title: "event-3",
      date: "2023-03-29",
      link: "/",
    },
    {
      title: "event-4",
      date: "2023-04-29",
      link: "/",
    },
  ]

  return (
    <main>
      <header className="bg-light-background-transparent">
        <div className="mx-auto flex max-w-screen-md flex-col items-center px-4 pt-8 text-center md:px-8">
          <h1 className="max-w-3xl pb-6 text-2xl font-medium md:text-3xl xl:text-4xl">
            Renginiai
          </h1>
        </div>
      </header>

      <div className="bg-light-background-transparent">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-12 px-4 pt-2 pb-12 md:px-6 md:pt-4">
          <EventsCalendar events={events} />
        </div>
      </div>
    </main>
  )
}
