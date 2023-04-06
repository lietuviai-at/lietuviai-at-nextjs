import MorePosts from "@/components/MorePosts"
import { getTagPosts } from "@/lib/api"
import { Post } from "../../post"
import { Metadata } from "next/types"
import Error from "@/components/shared/Error"

export const revalidate = 10

export async function generateMetadata({
  params: { slug },
}: any): Promise<Metadata> {
  return { title: `Žymė: ${slug} | ALB` }
}

export default async function Page({ params: { slug } }) {
  const { status, data } = await getTagPosts(slug)

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
        <div className="mx-auto flex max-w-screen-md flex-col items-center px-4 pb-12 pt-8 text-center md:px-8">
          <h1 className="max-w-3xl pb-6 text-2xl font-medium md:text-3xl xl:text-4xl">
            Žymė
          </h1>
          <p className="text-lg capitalize">{slug}</p>
        </div>
      </header>

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
