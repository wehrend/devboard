import { Database } from "./supabase"

export interface BoardLocalstorage {
  id: string
  title: string
  tasks: Task[]
}

export type UpdateBoard = Database["public"]["Tables"]["Boards"]["Update"]

export type Board = Database["public"]["Tables"]["Boards"]["Row"] & {
  tasks: Database["public"]["Tables"]["Tasks"]["Row"]
}

export type Task = Database["public"]["Tables"]["Tasks"]["Row"] & {
  column: "ToDo" | "InProgress" | "Done"
}

export type UpdateTask = Database["public"]["Tables"]["Tasks"]["Update"]

export type CreateTask = Database["public"]["Tables"]["Tasks"]["Insert"]

// export interface Task {
//   id: string
//   title: string
//   column: "ToDo" | "InProgress" | "Done"
//   description?: string
//   assignedTo?: string
//   deadline?: string
// }
