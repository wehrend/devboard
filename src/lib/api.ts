import type { Board } from "src/types/board.type"

const LOCALSTORAGE_BOARDS_KEY = "boards"

export function getBoards(): Board[] {
  const boardsStringified = localStorage.getItem(LOCALSTORAGE_BOARDS_KEY)
  const boards: Boards[] = JSON.parse(boardsStringified) ?? []
  return boards
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem(LOCALSTORAGE_BOARDS_KEY, JSON.stringify(boards))
}
