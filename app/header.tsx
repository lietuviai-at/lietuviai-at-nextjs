import { getMainNavigationMenu } from "@/lib/api"
import Navigation from "./navigation"

export default async function Header() {
  const data = await getMainNavigationMenu()

  return (
    <div className="py-4 px-4">
      <div className="relative overflow-visible rounded-lg bg-white shadow-normal">
        <Navigation data={data} />
      </div>
    </div>
  )
}
