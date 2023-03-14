"use client"

import { useState } from "react"
import { Post } from "./shared/Post"

export default function MorePosts({ endCursor }) {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [cursor, setCursor] = useState(endCursor)
  const [end, setEnd] = useState(false)

  const fetchMorePosts = async () => {
    setLoading(true)
    await fetch(`/api/moreRecentPosts/${cursor}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ cursor }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        if (data.data.posts.pageInfo.hasNextPage === false) {
          setEnd(true)
        }

        setPosts((prevPosts) => [...prevPosts, ...data.data.posts.edges])
        setCursor(data.data.posts.pageInfo.endCursor)
        setLoading(false)
      })
  }

  return (
    <>
      {posts.map((post, index) => {
        return (
          <div key={index} className="md:col-span-6 lg:col-span-4">
            <Post post={post} background={false} />
          </div>
        )
      })}

      {loading && (
        <div className="flex items-center justify-center pt-8 md:col-span-12">
          <svg
            className="ring-loader my-2"
            viewBox="25 25 50 50"
            strokeWidth="5"
          >
            <circle cx="50" cy="50" r="20" />
          </svg>
        </div>
      )}

      {!end && !loading && (
        <div className="flex justify-center border-t-2 border-dashed pt-8 md:col-span-12">
          <button
            className={`inline-flex items-center gap-2 rounded-full bg-light-background py-2 px-4 hover:bg-yellow-500 hover:text-white`}
            onClick={() => fetchMorePosts()}
          >
            Senesni straipsniai
          </button>
        </div>
      )}
    </>
  )
}
