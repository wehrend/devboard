import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { Input } from "../../components/ui/input"

import { Button } from "../../components/ui/button"
import { Link, useParams } from "react-router-dom"
import { useReducer, useState } from "react"
import BoardCard from "../BoardOverview/components/BoardCard"
import BoardColumn from "./components/BoardColumn"
import type { Board, Task } from "src/types/board.type"
import { getBoardById } from "src/lib/api"
import { useBoardDetailReducer } from "src/hooks/boardsDetailReducer"
import TaskDialog from "./components/TaskDialog"

export default function BoardDetail() {
  const { id } = useParams()
  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState("")
  const boardFromLocalStorage = getBoardById(id ?? "") ?? {
    id: "",
    title: "",
    tasks: [],
  }

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>()

  const [board, dispatchBoard] = useReducer(
    useBoardDetailReducer,
    boardFromLocalStorage
  )

  function handleAddTask(task: Task) {
    dispatchBoard({ type: "ADD_TASK", data: task })
  }

  function handleDeleteTask(task: Task) {
    dispatchBoard({ type: "DELETE_TASK", data: task })
  }
  function handleUpdateTaskStatus(
    id: string,
    newColumn: "ToDo" | "InProgress" | "Done"
  ) {
    dispatchBoard({ type: "UPDATE_TASK_STATUS", data: { id, newColumn } })
  }

  function handleEditTask(task: Task) {
    console.log(task)
    setEditTask(task)
    setIsEditTaskDialogOpen(true)
  }

  function handleUpdateTask(task: Task) {
    dispatchBoard({ type: "UPDATE_TASK", data: task })
  }

  function handleEditBoardTitle() {
    setIsEditingBoardName(true)
    setBoardName(board.title)
  }

  function handleSubmitEditBoardTitle() {
    dispatchBoard({ type: "UPDATE_BOARD_NAME", data: boardName })
    setIsEditingBoardName(false)
  }

  function renderBoardDetailHeader() {
    if (isEditingBoardName) {
      return (
        <>
          <Input
            value={boardName}
            className="w-64"
            onChange={(event) => setBoardName(event.target.value)}
          />
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={handleSubmitEditBoardTitle}
          >
            <Check />
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setEditingBoardName(false)}
          >
            <X />
          </Button>
        </>
      )
    } else {
      return (
        <>
          <h1 className="text-2xl font-bold">{board.title}</h1>
          <Button variant="ghost" size="icon-lg" onClick={handleEditBoardTitle}>
            <Pencil />
          </Button>
        </>
      )
    }
  }

  return (
    <>
      <div className="container">
        <div className="flex flex-row items-center gap-2">
          <Link to={"/boards"}>
            <Button variant="ghost" size="icon-lg">
              <ArrowLeft />
            </Button>
          </Link>
          {renderBoardDetailHeader()}
        </div>
        <TaskDialog
          key={editTask?.id ?? "empty-0"}
          open={isEditTaskDialogOpen}
          onSubmitUpdate={(task) => {}}
          handleOpenChange={setIsEditTaskDialogOpen}
          title="Task bearbeiten"
          description="Hier die Task bearbeiten"
          task={
            editTask ?? { id: "", title: "", description: "", column: "ToDo" }
          }
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <BoardColumn
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            title="ToDo"
            tasks={board.tasks.filter((task) => task.column === "ToDo")}
            handleEditTask={handleEditTask}
          />
          <BoardColumn
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            title="InProgress"
            tasks={board.tasks.filter((task) => task.column === "InProgress")}
            handleEditTask={handleEditTask}
          />
          <BoardColumn
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            title="Done"
            tasks={board.tasks.filter((task) => task.column === "Done")}
            handleEditTask={handleEditTask}
          />
        </div>
      </div>
    </>
  )
}
