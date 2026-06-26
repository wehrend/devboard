import { saveBoard } from "src/lib/api"
import type { Board, Task } from "src/types/board.type"

type BoardDetailAction =
  | {
      type: "UPDATE_BOARD_NAME"
      data: string
    }
  | {
      type: "ADD_TASK" | "DELETE_TASK" | "UPDATE_TASK"
      data: Task
    }
  | {
      type: "UPDATE_TASK_STATUS"
      data: { id: string; newColumn: "ToDo" | "InProgress" | "Done" }
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
    case "UPDATE_TASK": {
      newState = { ...prevState }
      const updateTasks = prevState.tasks.map((task) => {
        if (task.id === action.data.id) {
          return action.data
        } else {
          return task
        }
      })
      newState.tasks = updateTasks
      break
    }
    case "UPDATE_TASK_STATUS": {
      const updatedTasks = prevState.tasks.map((task) => {
        if (task.id === action.data.id) {
          return { ...task, column: action.data.newColumn }
        }
        return task
      })
      newState = { ...prevState, tasks: updatedTasks }
      break
    }
  }
  saveBoard(newState)
  return newState
}
