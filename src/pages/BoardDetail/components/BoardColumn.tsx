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
  onUpdateTaskStatus,
  handleEditTask,
}: {
  title: "ToDo" | "InProgress" | "Done"
  tasks: Task[]
  onAddTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
  onUpdateTaskStatus: (
    id: string,
    newColumn: "ToDo" | "InProgress" | "Done"
  ) => void
  handleEditTask: (task: Task) => void
}) {
  const [isDragHover, setIsDragHover] = useState(false)

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  function isTaskInTasks(column: string | null): boolean {
    return column === title.toLowerCase()
  }

  function getColumnFromDraggedItem(dataTransfer: DataTransfer): string | null {
    let column: string | null = null
    dataTransfer.types.forEach((type) => {
      if (type.startsWith("column-")) {
        column = type.replace("column-", "")
      }
    })
    return column
  }

  function getIdFromDraggedItem(dataTransfer: DataTransfer): string | null {
    let column: string | null = null
    dataTransfer.types.forEach((type) => {
      if (type.startsWith("id-")) {
        column = type.replace("id-", "")
      }
    })
    return column
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const column = getColumnFromDraggedItem(event.dataTransfer)
    console.log(column)
    if (isTaskInTasks(column)) {
      setIsDragHover(false)
    } else {
      setIsDragHover(true)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const column = getColumnFromDraggedItem(event.dataTransfer)
    const id = getIdFromDraggedItem(event.dataTransfer)
    if (isTaskInTasks(column)) {
      setIsDragHover(false)
    } else {
      // call function to call move task to this column
      if (!isTaskInTasks(column) && id !== null) {
        onUpdateTaskStatus(id, title)
      }
    }
  }

  const [newTaskId, setNewTaskId] = useState(String(Math.random()))

  // Beim Schließen des Dialogs neue ID generieren:
  function handleTaskDialogOpenChange(open: boolean) {
    setIsTaskDialogOpen(open)
    if (!open) setNewTaskId(String(Math.random()))
  }

  function getRandomId() {
    return String(Math.random())
  }

  return (
    <Card
      className={`rounded-lg border border-black bg-gray-50 ${isDragHover && "border-5 border-primary"}`}
      onDrop={handleDrop}
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
            key={newTaskId}
            open={isTaskDialogOpen}
            handleOpenChange={handleTaskDialogOpenChange}
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
