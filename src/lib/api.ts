import type { Board } from "src/types/board.type"

const LOCALSTORAGE_BOARDS_KEY = "boards"

export function getBoards(): Board[] {
  const boardsStringified = localStorage.getItem(LOCALSTORAGE_BOARDS_KEY)
  if (boardsStringified) {
    const boards: Board[] = JSON.parse(boardsStringified) ?? []
    return boards
  }
  return []
}

export function getBoardById(id: string): Board | undefined {
  const boards = getBoards()
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
