import Loader from "@/components/shared/Loader"

export default async function Loading() {
  return (
    <main className="bg-light-background-transparent">
      <div className="color-change mx-auto flex max-w-screen-2xl justify-center gap-12 px-4 py-12 md:px-6">
        <Loader />
      </div>
    </main>
  )
}
