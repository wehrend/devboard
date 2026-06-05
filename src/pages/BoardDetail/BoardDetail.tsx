import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { Input } from "../../components/ui/input"

import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"
import BoardCard from "../BoardOverview/components/BoardCard"
import BoardColumn from "./components/BoardColumn"

export default function BoardDetail() {
  const [isEditingBoardName, setEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState("Name des Boards")

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
            onClick={() => setEditingBoardName(false)}
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
          <h1 className="text-2xl font-bold">{boardName}</h1>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setEditingBoardName(true)}
          >
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
        <div className="mt-4 grid grid-cols-3 gap-4">
          <BoardColumn title="ToDo" />
          <BoardColumn title="inProgress" />
          <BoardColumn title="Done" />
        </div>
      </div>
    </>
  )
}
