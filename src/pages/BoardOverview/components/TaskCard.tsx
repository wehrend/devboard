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
import type { Task } from "src/types/board.type"

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card
      draggable={true}
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
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
