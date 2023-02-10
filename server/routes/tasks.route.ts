import { Router } from 'express'
import {
  AddTask,
  GetTasks,
  ChangeTaskStatus,
  ChangeStatusName,
  GetTaskStatuses
} from '../controllers/tasks.controller'

const TasksRouter = Router()

TasksRouter.get('/', GetTasks)
TasksRouter.get('/statuses', GetTaskStatuses)
TasksRouter.post('/', AddTask)
TasksRouter.patch('/change-status', ChangeTaskStatus)
TasksRouter.patch('/status-name', ChangeStatusName)

export default TasksRouter
