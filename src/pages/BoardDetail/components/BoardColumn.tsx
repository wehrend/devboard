import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import TaskCard from "../../BoardOverview/components/TaskCard"
import { useState } from "react"

export default function BoardColumn({
  title,
  tasks,
}: {
  title: string
  tasks: Task[]
}) {
  const [isDragHover, setIsDragHover] = useState(false)

  function isIdInTasks(id: string): boolean {
    return tasks.some((task) => task.id === id)
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    const taskId = event.dataTransfer.getData("taskId")
    if (!isIdInTasks(taskId)) {
      setIsDragHover(true)
    } else {
      setIsDragHover(false)
    }
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
          <Button>
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isDragHover && (
          <div className="background-primary/10 rounded-lg border-2 border-dashed border-primary p-2 text-center text-primary">
            Hier Ablegen
          </div>
        )}
        {tasks.map((task) => {
          return <TaskCard task={task} />
        })}
      </CardContent>

      {/* <CardFooter>Footer </CardFooter> */}
    </Card>
  )
}
