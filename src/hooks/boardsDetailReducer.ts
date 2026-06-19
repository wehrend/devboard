import type { Board } from "src/types/board.type"

type BoardDetailAction = {
  type: "UPDATE_BOARD_NAME"
  data: string
}

export function useBoardDetailReducer(
  prevState: Board,
  action: BoardDetailAction
) {
  let newState = prevState

  switch (action.type) {
    case "UPDATE_BOARD_NAME": {
      newState = {
        ...prevState,
        title: action.data,
      }
    }
  }
  return newState
}
