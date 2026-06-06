import { LayoutDashboard, UserCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-black py-5">
      <div className="container mx-auto flex justify-between">
        <Link
          to="/boards"
          className="flex flex-row items-center gap-2 text-lg text-blue-100"
        >
          <LayoutDashboard className="w5 h-5" />
          Devkarriere
        </Link>

        <Link
          to="/profile"
          className="flex flex-row items-center gap-2 text-lg text-blue-100"
        >
          <UserCircle className="w5 h-5" />
          Profile
        </Link>
      </div>
    </header>
  )
}
