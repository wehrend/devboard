import { CalendarIcon, Plus } from "lucide-react"
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog"
import { Input } from "src/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover"
import { Calendar } from "src/components/ui/calendar"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select"
import { Textarea } from "src/components/ui/textarea"
import type { Task } from "src/types/board.type"

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
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [assignedTo, setAssignedTo] = useState<string>("")
  const [date, setDate] = useState<Date>()

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

  function handleAddNewTask() {
    const newTask: Task = {
      id: String(Math.random()),
      title: taskTitle,
      description: taskDescription ?? "",
      column: title,
      deadline: date?.toISOString() ?? undefined,
    }
    //   console.log(
    //     "Add new task with title: ",
    //     taskTitle,
    //     taskDescription,
    //     assignedTo,
    //     date
    //   )
    onAddTask(newTask)
    setTaskTitle("")
    setTaskDescription("")
    setAssignedTo("")
    setDate(undefined)
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neue Task erstellen</DialogTitle>
                <DialogDescription>
                  Erstelle eine neue Aufgabe für diese Spalte.
                </DialogDescription>
              </DialogHeader>
              <div>
                <span>Titel</span>
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>
              <div>
                <span>Beschreibung</span>
                <Textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              <div>
                <span>Zugewiesen an</span>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <span>Deadline</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      defaultMonth={date}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"outline"}>Abbrechen</Button>
                </DialogClose>
                <DialogClose>
                  <Button onClick={handleAddNewTask}>Speichern</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isDragHover && (
          <div className="background-primary/10 rounded-lg border-2 border-dashed border-primary p-2 text-center text-primary">
            Hier Ablegen
          </div>
        )}
        {tasks.map((task) => {
          return (
            <TaskCard
              onDeleteTask={onDeleteTask}
              task={task}
              handleEditTask={handleEditTask}
            />
          )
        })}
      </CardContent>

      {/* <CardFooter>Footer </CardFooter> */}
    </Card>
  )
}
