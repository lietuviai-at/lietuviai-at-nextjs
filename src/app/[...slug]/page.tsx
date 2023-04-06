import { getContent } from "@/lib/api"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { lt } from "date-fns/locale"
import parseHTML from "html-react-parser"
import ShareIt from "@/components/shared/Share-It"
import Link from "next/link"
import { Metadata } from "next/types"
import striptags from "striptags"
import Error from "@/components/shared/Error"

export const revalidate = 0

export async function generateMetadata({
  params: { slug },
}: any): Promise<Metadata> {
  const { status, data } = await getContent(slug)
  if (status === "failure") {
    return null
  }
  return {
    title: `${data.contentNode.title} |  ALB`,
    description: striptags(data.contentNode.excerpt) || null,
  }
}

export default async function PostPage({ params: { slug } }: any) {
  const { status, data: dataRes } = await getContent(slug)

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

  const { contentNode: data } = dataRes

  return (
    <article>
      <header className="bg-light-background-transparent">
        <div className="mx-auto flex max-w-screen-md flex-col items-center px-4 pb-12 pt-8 text-center md:px-8">
          {data.categories && data.categories.nodes.length !== 0 && (
            <div className="flex items-center gap-4 pb-4">
              {data.categories.nodes.map((category: any, index: number) => {
                return (
                  <Link
                    href={category.uri}
                    className="text-gray-500"
                    key={category.id}
                  >
                    {category.name}
                    {data.categories.nodes.length - 1 > index && ","}
                  </Link>
                )
              })}
            </div>
          )}

          <h1 className="max-w-3xl pb-6 text-2xl font-medium md:text-3xl xl:text-4xl">
            {data.title}
          </h1>
          <span className="text-gray-500">
            {format(parseISO(data.date), "PPP", { locale: lt })}
          </span>
        </div>

        {data.featuredImage && (
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-white"></div>
            <div className="px-4 md:px-8">
              <div className="relative mx-auto flex max-w-screen-lg justify-center">
                <Image
                  src={data.featuredImage.node.sourceUrl}
                  alt={data.featuredImage.node.title}
                  width={data.featuredImage.node.mediaDetails.width}
                  height={data.featuredImage.node.mediaDetails.width}
                  unoptimized
                  className="rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="bg-white">
        {data.content && (
          <section className="prose prose-neutral mx-auto w-full max-w-screen-md gap-4 space-y-2 px-4 py-14 text-black md:px-8">
            {parseHTML(data.content)}
          </section>
        )}
        <footer className="mx-auto flex max-w-screen-lg flex-col px-4 md:px-8">
          <div className="border-t-2 border-dashed border-gray-200">
            <div className="mx-auto flex max-w-screen-sm flex-col items-center gap-14 py-14">
              {data.tags && data.tags.nodes.length !== 0 && (
                <div>
                  <h3 className="text-center font-semibold uppercase">Žymės</h3>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    {data.tags.nodes.map((tag: any) => {
                      return (
                        <a
                          key={tag.id}
                          href={tag.uri}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm decoration-gray-300 outline-1 outline-green-600 hover:text-green-700 focus:outline-green-700 active:outline-green-600"
                        >
                          {tag.name}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-center font-semibold uppercase">
                  Pasidalink šiuo straipsniu
                </h3>
                <div>
                  <ShareIt pageLink={data.uri} />
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-gray-200 py-14">
              <div className="mx-auto flex max-w-screen-md gap-8 px-4 md:px-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-light-background-transparent">
                  {data.author.node.name.match(/\b(\w)/g).join("")}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Publikavo:</p>
                  <h2 className="font-literata text-xl">
                    {data.author.node.name}
                  </h2>
                  {data.author.node.description && (
                    <p className="text-sm">{data.author.node.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}
