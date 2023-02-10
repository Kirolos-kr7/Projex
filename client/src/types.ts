// export type TaskType = 'bugfix' | 'feature' | 'refactor'
// export type TaskPriority =
//   | 'trivial'
//   | 'low'
//   | 'lowest'
//   | 'medium'
//   | 'high'
//   | 'highest'
//   | 'critical'
//   | 'blocker'
export type UserRole = 'adminstrator' | 'user'

export interface Role {
  role: UserRole
  privileges?: string[]
  id: number
  master: boolean
}

// export interface Task {
//   type: TaskType
//   title: string
//   status: number
//   id: string
//   priority: TaskPriority
// }

export interface Repo {
  origin: string
  name: string
  updatedAt: Date
}

export interface User {
  name: string
  email: string
  role?: Role
  roleId: number
  id: string
}

export interface DropDown {
  selected: any
  options: any[]
  fn?: (value?: any) => void
  keyValue?: any
  keyName?: any
  className?: string
}

export interface Note {
  id: string
  content: string
  createdAt: Date
  authorId: string
  author: User
}

export interface Log {
  id: number
  type: string
  message: string
  createdAt: Date
  userId: string
}
