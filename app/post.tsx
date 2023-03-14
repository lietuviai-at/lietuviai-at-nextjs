import Link from "next/link"
import Image from "next/image"

import parseHTML from "html-react-parser"
import { format, parseISO } from "date-fns"
import { lt } from "date-fns/locale"

export const Post = ({ post, background, priority = false }) => {
  return (
    <div className="flex flex-col gap-4">
      {post.node.featuredImage && post.node.featuredImage.length !== 0 && (
        <Link href={post.node.uri}>
          <Image
            src={post.node.featuredImage.node.sourceUrl}
            alt={post.node.featuredImage.node.title}
            width={post.node.featuredImage.node.mediaDetails.width}
            height={post.node.featuredImage.node.mediaDetails.width}
            unoptimized
            className="w-full rounded-xl"
            priority={priority}
          />
        </Link>
      )}

      <Link href={post.node.uri}>
        <h2 className="font-literata text-2xl">{post.node.title}</h2>
      </Link>
      <span className="text-gray-500">
        {format(parseISO(post.node.date), "PPP", { locale: lt })}
      </span>
      {parseHTML(post.node.excerpt)}
      <div className="pt-2">
        <Link
          href={post.node.uri}
          className={`inline-flex items-center gap-2 rounded-full  py-2 px-4 hover:bg-yellow-500 hover:text-white ${
            background ? "bg-white" : "bg-light-background"
          }`}
        >
          {/* prettier-ignore */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" > <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /> </svg>
          Daugiau
        </Link>
      </div>
    </div>
  )
}
