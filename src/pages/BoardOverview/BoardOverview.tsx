import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import BoardCard from "./components/BoardCard"
import type { Board } from "src/types/board.type"
import { Plus } from "lucide-react"

export default function BoardOverview() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "1",
      title: "test",
      tasks: [{ id: "1", title: "ABC", column: "ToDo", description: "DEF" }],
    },
  ])

  return (
    <>
      <div className="place-content-betwee flex flex-row">
        <h1 className="text-xl font-bold">Meine Boards</h1>
        <Button>
          <Plus />
          Neues Board
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => {
          return <BoardCard board={board} />
        })}
      </div>
    </>
  )
}
