import { Database } from "./supabase"

export interface BoardLocalstorage {
  id: string
  title: string
  tasks: Task[]
}

export type Board = Database["public"]["Tables"]["Boards"]["Row"] & {
  tasks: Database["public"]["Tables"]["Tasks"]["Row"]
}

export interface Task {
  id: string
  title: string
  column: "ToDo" | "InProgress" | "Done"
  description?: string
  assignedTo?: string
  deadline?: string
}
