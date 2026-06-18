import { saveBoards } from "src/lib/api"
import type { Board } from "src/types/board.type"

type BoardsOverviewState = Board[]

type BoardsOverviewAction = {
  type: "ADD" | "DELETE"
  data: Board
}

export default function useBoardOverviewReducer(
  prevstate: BoardsOverviewState,
  action: BoardsOverviewAction
) {
  switch (action.type) {
    case "ADD": {
      const newState = [...prevstate, action.data]
      saveBoards(newState)
      return newState
    }
    case "DELETE":
      break
    default:
      break
  }
}
