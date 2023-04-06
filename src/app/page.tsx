import MorePosts from "@/components/MorePosts"
import { getRecentPosts } from "@/lib/api"
import { Post } from "./post"
import Error from "@/components/shared/Error"

export const revalidate = 10

export default async function Home() {
  const { status, data } = await getRecentPosts()

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
      <div className="bg-light-background-transparent">
        <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 pb-12 pt-2 md:grid-cols-12 md:px-6 md:pt-4">
          {edges.map((post, index) => {
            if (index <= 1) {
              return (
                <div key={index} className="md:col-span-6">
                  <Post post={post} background={true} priority={true} />
                </div>
              )
            }
          })}
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 py-12 md:grid-cols-12 md:px-6">
          {edges.map((post, index) => {
            if (index > 1) {
              return (
                <div key={index} className="md:col-span-6 lg:col-span-4">
                  <Post post={post} background={false} />
                </div>
              )
            }
          })}
        </div>

        <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 py-12 md:grid-cols-12 md:px-6">
          <MorePosts endCursor={pageInfo.endCursor} />
        </div>
      </div>
    </main>
  )
}
