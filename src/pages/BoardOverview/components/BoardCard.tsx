import { Trash2 } from "lucide-react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Link } from "react-router-dom"

export default function BoardCard() {
  return (
    <Link to={`/boards/1`}>
      <Card className="border border-black transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Name von Board</CardTitle>
          <CardDescription>3 Spalten - 0 Tasks</CardDescription>
          <CardAction>
            <Button
              className="text-muted-foreground hover:text-destructive"
              size="icon-lg"
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  )
}
