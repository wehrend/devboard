import { Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

export default function TaskCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titel</CardTitle>
        <CardDescription>Beschreibung</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-lg">
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Inhalt</CardContent>
    </Card>
  )
}
