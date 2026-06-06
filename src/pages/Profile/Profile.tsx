import { use, useState } from "react"
import { Button } from "src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"

export default function Profile() {
  const [username, setUsername] = useState("Sven")

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
            <input id="username" value={username} />
            <Button className="w-fit">Speichern</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
