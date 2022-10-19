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

export interface Task {
  type: TaskType
  title: string
  status: number
  id: string
  priority: TaskPriority
}
