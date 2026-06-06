import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Profile from "./pages/Profile/Profile"
import BoardOverview from "./pages/BoardOverview/BoardOverview"
import BoardDetail from "./pages/BoardDetail/BoardDetail"
import Layout from "./components/layout/Layout"

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/boards",
          children: [
            { index: true, element: <BoardOverview /> },
            { path: ":id", element: <BoardDetail /> },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
