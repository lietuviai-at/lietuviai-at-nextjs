import { getAllEvents, getCategoryPosts } from "@/lib/api"
import EventsCalendar from "./eventsCalendar"
import MorePosts from "@/components/MorePosts"
import { Post } from "../../post"
import { Metadata } from "next/types"
import Error from "@/components/shared/Error"

export const revalidate = 30

export async function generateMetadata(): Promise<Metadata> {
  return { title: `Renginiai | ALB` }
}

export default async function Renginiai() {
  const { status, data } = await getCategoryPosts("renginiai")
  const events = await getAllEvents()

  if (status === "failure") {
    return (
      <main>
        <div className="bg-light-background-transparent">
          <div className="mx-auto max-w-screen-2xl items-center px-4 pb-12 pt-2 md:px-6 md:pt-4">
            <Error message="Nepavyko gauti informacijos iš duomenų bazės." />
          </div>
        </div>
      </main>
    )
  }

  const { edges, pageInfo } = data

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
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-12 px-4 pb-12 pt-2 md:px-6 md:pt-4">
          {events.status === "success" && (
            <EventsCalendar
              events={events.data.edges.map((event: any) => {
                return {
                  id: event.node.id,
                  title: event.node.title,
                  date: event.node.event_info.eventDate,
                  link: event.node.uri,
                }
              })}
            />
          )}
        </div>

        <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pt-8 text-center md:px-8">
          <h1 className="max-w-3xl pb-12 text-2xl font-medium md:text-3xl xl:text-4xl">
            Visi Renginiai
          </h1>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 py-12 md:grid-cols-12 md:px-6">
          {edges.map((post, index) => {
            return (
              <div key={index} className="md:col-span-6 lg:col-span-4">
                <Post post={post} background={false} />
              </div>
            )
          })}
        </div>

        <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 py-12 md:grid-cols-12 md:px-6">
          <MorePosts endCursor={pageInfo.endCursor} />
        </div>
      </div>
    </main>
  )
}
