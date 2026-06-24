import { saveBoard } from "src/lib/api"
import type { Board, Task } from "src/types/board.type"

type BoardDetailAction =
  | {
      type: "UPDATE_BOARD_NAME"
      data: string
    }
  | {
      type: "ADD_TASK" | "DELETE_TASK"
      data: Task
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
      break
    }
    case "ADD_TASK": {
      newState = {
        ...prevState,
        tasks: [...prevState.tasks, action.data],
      }
      break
    }
    case "DELETE_TASK": {
      newState = { ...prevState }
      const newTasks = prevState.tasks.filter(
        (task) => task.id !== action.data.id
      )
      newState.tasks = newTasks
      break
    }
  }
  saveBoard(newState)
  return newState
}
