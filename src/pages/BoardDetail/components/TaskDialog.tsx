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
import { Button } from "src/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Textarea } from "src/components/ui/textarea"

export default function TaskDialog({
  open,
  handleOpenChange,
  onSubmitUpdate,
  task,
}: {
  open: boolean
  handleOpenChange: (open: boolean) => void
  onSubmitUpdate: (task: Task) => void
  task: Task
}) {
  const [taskTitle, setTaskTitle] = useState<string>(task.title)
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description ?? ""
  )
  const [assignedTo, setAssignedTo] = useState<string>(task.assignedTo)
  const [date, setDate] = useState<Date>(new Date(task.Deadline ?? new Date()))

  function handleSubmitUpdate() {
    const updatedTask: Task = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      dateline: date.toISOString(),
      column: task.column,
    }
    onSubmitUpdate(updatedTask)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeite die ausgewählte Aufgabe.
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
            <Button onClick={handleSubmitUpdate}>Speichern</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
