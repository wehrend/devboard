import { useContext, useState } from "react"
import { Button } from "src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import { UserNameContext } from "src/context/UserNameContext"

export default function Profile() {
  const context = useContext(UserNameContext)

  const [username, setUsername] = useState(context?.userName ?? "")

  function handleSubnmit() {
    //Speicher im context
    context?.setUserName(username)
    //Speicher im localstorage
    localStorage.setItem("kanban-user-name", username)
  }

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-2xl font-bold">Profil</h1>
      <Card>
        <CardHeader>
          <CardTitle>Benutzernamen ändern</CardTitle>
          <CardDescription>
            Ändere deinen Anzeigenamen für das Kanban-Board
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <label>Benutzername</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button className="w-fit" onClick={handleSubnmit}>
              Speichern
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
