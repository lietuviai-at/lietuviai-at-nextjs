import { getMainNavigationMenu } from "@/lib/api"
import Navigation from "./navigation"

export default async function Header() {
  const { status, data } = await getMainNavigationMenu()

  return (
    <div className="px-4 py-4">
      <div className="relative overflow-visible rounded-lg bg-white shadow-normal">
        {status === "success" && <Navigation data={data} />}
      </div>
    </div>
  )
}
