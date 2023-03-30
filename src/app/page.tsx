import MorePosts from "@/components/MorePosts"
import { getRecentPosts } from "@/lib/api"
import { Post } from "./post"

export default async function Home() {
  const {
    data: {
      posts: { edges, pageInfo },
    },
  } = await getRecentPosts()

  return (
    <main>
      <div className="bg-light-background-transparent">
        <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 pt-2 pb-12 md:grid-cols-12 md:px-6 md:pt-4">
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
