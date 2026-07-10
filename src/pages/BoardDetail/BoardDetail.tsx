import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { Input } from "../../components/ui/input"

import { Button } from "../../components/ui/button"
import { Link, useParams } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import BoardColumn from "./components/BoardColumn"
import type { CreateTask, Task, UpdateTask } from "src/types/board.type"
import {
  deleteTask,
  getBoardById,
  insertTask,
  updatedBoard,
  updateTask,
} from "src/lib/api"
import { useBoardDetailReducer } from "src/hooks/boardsDetailReducer"
import TaskDialog from "./components/TaskDialog"

export default function BoardDetail() {
  const { id } = useParams()
  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState("")
  const [board, dispatchBoard] = useReducer(useBoardDetailReducer, {
    title: "test",
    created_at: "",
    id: "",
    tasks: [],
  })

  async function fetchBoard() {
    const board = await getBoardById(id ?? "")
    if (board) {
      dispatchBoard({ type: "SET_BOARD", data: board })
    }
  }

  useEffect(() => {
    fetchBoard()
  }, [])

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>()

  if (!board) {
    return <div>Loading...</div>
  }

  async function handleAddTask(task: CreateTask) {
    try {
      const insertedTask = await insertTask({
        ...task,
        boardid: board?.id ?? "",
      })
      if (insertedTask) {
        dispatchBoard({ type: "ADD_TASK", data: insertedTask })
      }
    } catch (error: unknown) {
      console.error("Error adding Task: ", error)
    }
  }

  async function handleDeleteTask(task: Task) {
    try {
      await deleteTask(task.id)
      dispatchBoard({ type: "DELETE_TASK", data: task })
    } catch (error: unknown) {
      console.error("Error deleteing Task: ", error)
    }
  }

  async function handleUpdateTaskStatus(
    id: string,
    newColumn: "ToDo" | "InProgress" | "Done"
  ) {
    try {
      await updateTask(id, { column: newColumn })
      dispatchBoard({
        type: "UPDATE_TASK_STATUS",
        data: { id, newColumn },
      })
    } catch (error: unknown) {
      console.error("Error on update task status: ", error)
    }
  }

  function handleEditTask(task: Task) {
    console.log(task)
    setEditTask(task)
    setIsEditTaskDialogOpen(true)
  }

  async function handleUpdateTask(task: UpdateTask) {
    try {
      const updatedTask = await updateTask(editTask?.id ?? "", {
        ...task,
        boardid: board?.id ?? "",
      })
      if (updatedTask) {
        dispatchBoard({ type: "UPDATE_TASK", data: updatedTask })
      }
    } catch (error: unknown) {
      console.error("Error updating task: ", error)
    }
  }

  function handleEditBoardTitle() {
    setIsEditingBoardName(true)
    setBoardName(board?.title ?? "")
  }

  async function handleSubmitEditBoardTitle() {
    if (!board) return
    const updateBoard = await updatedBoard(board.id, { title: boardName })
    if (updateBoard) {
      dispatchBoard({ type: "UPDATE_BOARD_NAME", data: boardName })
      setIsEditingBoardName(false)
    }
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
            onClick={() => setIsEditingBoardName(false)}
          >
            <X />
          </Button>
        </>
      )
    } else {
      return (
        <>
          <h1 className="text-2xl font-bold">{board?.title ?? ""}</h1>
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
          onSubmitUpdate={handleUpdateTask}
          handleOpenChange={setIsEditTaskDialogOpen}
          title="Task bearbeiten"
          description="Hier die Task bearbeiten"
          task={
            editTask ?? {
              id: "",
              title: "",
              description: "",
              column: "ToDo",
              assignedTo: null,
              deadline: "",
              boardid: board.id ?? "",
              created_at: new Date().toString(),
            }
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
