import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
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

export default function BoardOverview() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "1",
      title: "test",
      tasks: [{ id: "1", title: "ABC", column: "ToDo", description: "DEF" }],
    },
  ])

  const [boardNameInput, setBoardNameInput] = useState("Neues Board")

  return (
    <>
      <div className="place-content-betwee flex flex-row">
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
                <Button>Speichern</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => {
          return <BoardCard board={board} />
        })}
      </div>
    </>
  )
}
