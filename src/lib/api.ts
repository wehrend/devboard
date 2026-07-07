import type { Board } from "src/types/board.type"
import supabase from "./db"

const LOCALSTORAGE_BOARDS_KEY = "boards"

export async function getBoards(): Promise<Board[]> {
  const { data: boards, error } = await supabase
    .from("Boards")
    .select("*, tasks(*)")
  if (error) {
    console.error("Error fetching boards: ", error)
    return []
  }
  console.log("Fetched boards: ", boards)
  return boards
}

export function getBoardsFromLocalstorage(): Board[] {
  const boardsStringified = localStorage.getItem(LOCALSTORAGE_BOARDS_KEY)
  if (boardsStringified) {
    const boards: Board[] = JSON.parse(boardsStringified) ?? []
    return boards
  }
  return []
}

export function getBoardById(id: string): Board | undefined {
  const boards = getBoardsFromLocalstorage()
  return boards.find((board) => board.id === id)
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem(LOCALSTORAGE_BOARDS_KEY, JSON.stringify(boards))
}

export function saveBoard(board: Board): void {
  const boards = getBoards()
  const updatedBoards = boards.map((b) => {
    if (b.id === board.id) {
      return board
    } else {
      return b
    }
  })
  saveBoards(updatedBoards)
}
