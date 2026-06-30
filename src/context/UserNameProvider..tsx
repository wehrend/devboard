import { useState } from "react"
import { UserNameContext } from "./UserNameContext"

export function UserNameProvider({ children }: { children: React.ReactNode }) {
  const [username, setUserName] = useState(getUserNameFromLocalStorage)

  function getUserNameFromLocalStorage() {
    const storedName = localStorage.getItem("kanban-user-name")
    return storedName ?? ""
  }

  return (
    <UserNameContext.Provider
      value={{ userName: username, setUserName: setUserName }}
    >
      {children}
    </UserNameContext.Provider>
  )
}
