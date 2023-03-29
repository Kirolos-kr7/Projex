import { Router } from 'express'
import { GetAll, GetMaxLogs } from '../controllers/logs.controller'

const LogsRouter = Router()

LogsRouter.get('/', GetAll)
LogsRouter.get('/max', GetMaxLogs)

export default LogsRouter
