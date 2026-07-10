import type {
  Board,
  CreateTask,
  Task,
  UpdateBoard,
  UpdateTask,
} from "src/types/board.type"
import supabase from "./db"

const LOCALSTORAGE_BOARDS_KEY = "boards"

export async function getBoards(): Promise<Board[]> {
  const { data: boards, error } = await supabase
    .from("Boards")
    .select("*, tasks:Tasks(*)")
  if (error) {
    console.error("Error fetching boards: ", error)
    return []
  }
  console.log("Fetched boards: ", boards)
  return boards as Board[]
}

export function getBoardsFromLocalstorage(): Board[] {
  const boardsStringified = localStorage.getItem(LOCALSTORAGE_BOARDS_KEY)
  if (boardsStringified) {
    const boards: Board[] = JSON.parse(boardsStringified) ?? []
    return boards
  }
  return []
}

export async function getBoardById(id: string): Promise<Board | undefined> {
  const { data: board, error } = await supabase
    .from("Boards")
    .select("*, tasks:Tasks(*)")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching Board by id: ", error)
    return undefined
  }
  return board as Board
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

export async function deleteBoard(id: string): Promise<void> {
  const { error } = await supabase.from("Boards").delete().eq("id", id)
  if (error) {
    console.error("Error deleting Board: ", error)
    throw error
  }
}

export async function insertBoard(board: Board): Promise<Board | null> {
  const { data, error } = await supabase
    .from("Boards")
    .insert({ title: board.title, created_at: board.created_at })
    .select("*, tasks:Tasks(*)")
    .single()

  if (error) {
    console.error("Error inserting board: ", error)
    return null
  }
  return data as Board
}

export async function updatedBoard(
  id: string,
  board: UpdateBoard
): Promise<Board | null> {
  const { data, error } = await supabase
    .from("Boards")
    .update(board)
    .eq("id", id)
    .select("*, tasks:Tasks(*)")
    .single()

  if (error) {
    console.error("Error updating board: ", error)
    return null
  }
  return data as Board
}

export async function insertTask(task: CreateTask): Promise<Task | null> {
  const { data, error } = await supabase
    .from("Tasks")
    .insert(task)
    .select("*")
    .single()

  if (error) {
    console.error("Error inserting task: ", error)
    throw error
  }
  return data as Task
}

export async function updateTask(
  id: string,
  task: UpdateTask
): Promise<Task | null> {
  const { data, error } = await supabase
    .from("Tasks")
    .update(task)
    .eq("id", id)
    .select("*")
    .single()

  if (error) {
    console.error("Error updating task: ", error)
    throw error
  }
  return data as Task
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("Tasks").delete().eq("id", id)
  if (error) {
    console.error("Error deleting Task: ", error)
    throw error
  }
}
