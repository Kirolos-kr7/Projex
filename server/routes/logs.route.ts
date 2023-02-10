import { Router } from 'express'
import { GetAll } from '../controllers/logs.controller'

const LogsRouter = Router()

LogsRouter.get('/', GetAll)

export default LogsRouter
