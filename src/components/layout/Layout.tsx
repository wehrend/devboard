import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
  return (
    <div className="">
      <Header />
      <main className="container mx-auto py-4">
        <Outlet />
      </main>
    </div>
  )
}
