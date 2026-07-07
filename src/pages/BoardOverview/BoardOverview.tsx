import { useEffect, useReducer, useState } from "react"
import { Button } from "../../components/ui/button"
import BoardCard from "./components/BoardCard"
import type { Board } from "src/types/board.type"
import { Plus } from "lucide-react"

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
import { deleteBoard, getBoards, insertBoard } from "src/lib/api"
import { useBoardOverviewReducer } from "src/hooks/boardsOverviewReducer"

export default function BoardOverview() {
  const [boards, boardsDispatch] = useReducer(useBoardOverviewReducer, [])

  const [boardNameInput, setBoardNameInput] = useState("Neues Board")

  async function fetchBoards() {
    const boards = await getBoards()
    boardsDispatch({ type: "SET", data: boards })
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  async function handleAddNewBoard() {
    const newBoard: Board = {
      id: "",
      title: boardNameInput,
      created_at: new Date().toISOString(),
      tasks: [],
    }
    const insertedBoard = await insertBoard(newBoard)
    if (insertedBoard) {
      boardsDispatch({ type: "ADD", data: insertedBoard })
      setBoardNameInput("")
    }
  }

  function handleDeleteBoard(id: string) {
    try {
      console.log("delete board with id", id)
      deleteBoard(id)
      boardsDispatch({
        type: "DELETE",
        data: { id: id, title: "", tasks: [], created_at: "" },
      })
    } catch (error) {
      console.error("Error deleting board: ", error)
    }
  }

  return (
    <>
      <div className="flex flex-row place-content-between">
        <h1 className="text-xl font-bold">Meine Boards</h1>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus />
              Neues Board
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Board erstellen</DialogTitle>
              <DialogDescription>
                Gib dem Board einen Namen. Es werden automatisch drei Spalten
                angelegt (ToDo, In Progress, Done).
              </DialogDescription>
            </DialogHeader>
            <Input
              onChange={(e) => setBoardNameInput(e.target.value)}
              id="name-1"
              name="name"
              defaultValue="Neues Board"
              value={boardNameInput}
            />
            <DialogFooter>
              <DialogClose>
                <Button variant={"outline"}>Abbrechen</Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={handleAddNewBoard}>Speichern</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => {
          return <BoardCard board={board} onDelete={handleDeleteBoard} />
        })}
      </div>
    </>
  )
}
