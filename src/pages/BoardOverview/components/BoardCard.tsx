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
import type { Board } from "src/types/board.type"

export default function BoardCard({
  board,
  onDelete,
}: {
  board: Board
  onDelete: (id: string) => void
}) {
  return (
    <Link to={`/boards/${board.id}`}>
      <Card className="border border-black transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{board.title}</CardTitle>
          <CardDescription>
            3 Spalten - {board.tasks.length} Tasks
          </CardDescription>
          <CardAction>
            <Button
              className="text-muted-foreground hover:text-destructive"
              size="icon-lg"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault()
                onDelete(board.id)
              }}
            >
              <Trash2 />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  )
}
