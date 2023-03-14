import { NextRequest, NextResponse } from "next/server"
import { getMoreRecentPosts } from "@/lib/api"

export async function POST(request: NextRequest, { params }) {
  const cursor = params.cursor
  const data = await getMoreRecentPosts(cursor)
  return NextResponse.json(data)
}
