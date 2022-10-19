export type TaskType = 'bugfix' | 'feature' | 'refactor'
export type TaskPriority =
  | 'trivial'
  | 'low'
  | 'lowest'
  | 'medium'
  | 'high'
  | 'highest'
  | 'critical'
  | 'blocker'
export type UserRole = 'adminstrator' | 'user'

export interface Task {
  type: TaskType
  title: string
  status: number
  id: string
  priority: TaskPriority
}

export interface Repo {
  origin: string
  name: string
  updatedAt: Date
}

export interface Member {
  name: string
  email: string
  role: UserRole
  id: number
}
