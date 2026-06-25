import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import TaskCard from "../../BoardOverview/components/TaskCard"
import { useState } from "react"
import type { Task } from "src/types/board.type"
import TaskDialog from "./TaskDialog"

export default function BoardColumn({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  handleEditTask,
}: {
  title: "ToDo" | "InProgress" | "Done"
  tasks: Task[]
  onAddTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
  handleEditTask: (task: Task) => void
}) {
  const [isDragHover, setIsDragHover] = useState(false)

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  function isTaskInTasks(id: string): boolean {
    return tasks.some((task) => task.id === id)
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    const taskId = event.dataTransfer.getData("taskId")
    if (!isTaskInTasks(taskId)) {
      setIsDragHover(true)
    } else {
      setIsDragHover(false)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const column = event.dataTransfer.getData("column")
    if (isTaskInTasks(column)) {
      setIsDragHover(false)
    } else {
      // call function to call move task to this column
    }
  }

  function getRandomId() {
    return String(Math.random())
  }

  return (
    <Card
      className={`rounded-lg border border-black bg-gray-50 ${isDragHover && "border-5 border-primary"}`}
      onDrop={() => setIsDragHover(false)}
      onDragEnter={handleDragHover}
      onDragOver={handleDragHover}
      onDragLeave={() => setIsDragHover(false)}
    >
      <CardHeader>
        <CardTitle className="justify-between font-bold">{title}</CardTitle>
        <CardAction>
          <Button variant="ghost" onClick={() => setIsTaskDialogOpen(true)}>
            <Plus />
          </Button>
          <TaskDialog
            open={isTaskDialogOpen}
            handleOpenChange={setIsTaskDialogOpen}
            onSubmitUpdate={onAddTask}
            title="Neue Task erstellen"
            description="Erstelle eine neue Aufgabe für diese Spalte."
            task={{
              id: getRandomId(),
              title: "",
              description: "",
              column: title,
              deadline: "",
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        {isDragHover && (
          <div className="background-primary/10 rounded-lg border-2 border-dashed border-primary p-2 text-center text-primary">
            Hier Ablegen
          </div>
        )}
        <div className="flex flex-col gap-4">
          {tasks.map((task) => {
            return (
              <TaskCard
                onDeleteTask={onDeleteTask}
                task={task}
                handleEditTask={handleEditTask}
              />
            )
          })}
        </div>
      </CardContent>

      {/* <CardFooter>Footer </CardFooter> */}
    </Card>
  )
}
