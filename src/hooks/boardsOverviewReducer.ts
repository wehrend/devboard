import { saveBoards } from "src/lib/api"
import type { Board } from "src/types/board.type"

type BoardsOverviewState = Board[]

type BoardsOverviewAction = {
  type: "ADD" | "DELETE"
  data: Board
}

export function useBoardOverviewReducer(
  prevState: BoardsOverviewState,
  action: BoardsOverviewAction
) {
  let newState = prevState
  switch (action.type) {
    case "ADD": {
      newState = [...prevState, action.data]
      break
    }
    case "DELETE": {
      newState = prevState.filter((board) => board.id !== action.data.id)
      console.log(newState)
      break
    }
    default:
      break
  }

  saveBoards(newState)
  return newState
}
