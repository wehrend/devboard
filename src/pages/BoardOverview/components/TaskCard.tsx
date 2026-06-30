import { Calendar, CircleUser, Trash2 } from "lucide-react"
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

export default function TaskCard({
  task,
  onDeleteTask,
  handleEditTask,
}: {
  task: Task
  onDeleteTask: (task: Task) => void
  handleEditTask: (task: Task) => void
}) {
  return (
    <Card
      className="hover:cursor-pointer"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData(`column-${task.column}`, "")
        e.dataTransfer.setData(`id-${task.id}`, "")
      }}
      onClick={() => handleEditTask(task)}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className="flex flex-col">
          <span>{task.description}</span>
          {task.assignedTo && (
            <span className="flex items-center gap-1">
              {" "}
              <CircleUser className="size-4" />
              {task.assignedTo}
            </span>
          )}
          <span className="flex items-center gap-1">
            {task.deadline && <Calendar className="size-4" />}
            {task.deadline
              ? new Date(task.deadline).toLocaleDateString("de-DE")
              : ""}
          </span>
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteTask(task)
            }}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Inhalt</CardContent>
    </Card>
  )
}
