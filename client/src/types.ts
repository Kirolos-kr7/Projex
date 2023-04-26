export type User = {
  id: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  roleId: number
  fullName: string
  userName: string
  hasProfileImage: boolean
}

export interface NoteWithUser extends Note {
  author: User
}

export interface UserWithRole extends User {
  role?: Role
}

export type Role = {
  role: string
  id: number
  master: boolean
  createdAt: Date | null
}

export interface LogType {
  notes: 'notes'
  roles: 'roles'
  auth: 'auth'
  tasks: 'tasks'
}

export const TaskPriority = {
  trivial: 'trivial',
  low: 'low',
  lowest: 'lowest',
  medium: 'medium',
  high: 'high',
  highest: 'highest',
  critical: 'critical',
  blocker: 'blocker'
}

export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority]

export const TaskType = {
  bugfix: 'bugfix',
  feature: 'feature',
  refactor: 'refactor',
  other: 'other'
}

export type TaskType = typeof TaskType[keyof typeof TaskType]

export type TaskStatus = {
  id: string
  name: string
  order: number
}

export type Sprint = {
  id: number
  name: string
  startDate: string
  endDate: string
  goal: string
  _count?: { Task: number }
}

export type Task = {
  id: number
  title: string
  priority: TaskPriority
  type: TaskType
  assignedToId: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}

export type Note = {
  id: number
  content: string
  createdAt: Date
  authorId: string
}

export type Logs = {
  id: number
  message: string
  createdOn: Date
  createdAt: Date
  userId: string
  type: LogType
}

export interface Repo {
  origin: string
  name: string
  updatedAt: Date
}

export interface DropDown {
  selected: any
  options: any[]
  fn?: (value?: any) => void
  keyValue?: any
  keyName?: any
  disabled?: boolean
  buttonStyle?: string
  listStyle?: string
}

export type SelectUserBoard = Pick<
  User,
  'id' | 'userName' | 'hasProfileImage'
> & { selected: boolean }
