import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express'
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

import AuthRouter from './routes/auth.route'
import RolesRouter from './routes/roles.route'
import UserRouter from './routes/user.route'
import NotesRouter from './routes/notes.route'
import LogsRouter from './routes/logs.route'
import TasksRouter from './routes/tasks.route'

const app = express()
const port = process.env.PORT || 8080
export const authExpiration = 3600 * 1000 * 8
const prisma = new PrismaClient()

const main = async () => {
  app.use(express.json())
  app.use(cookieParser())
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  )

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const x = await prisma.$queryRaw`SELECT 1`
      if (x) next()
    } catch (error) {
      return res.sendStatus(503)
    }
  })

  app.use('/api/auth', AuthRouter)
  app.use('/api/roles', RolesRouter)
  app.use('/api/user', UserRouter)
  app.use('/api/notes', NotesRouter)
  app.use('/api/logs', LogsRouter)
  app.use('/api/tasks', TasksRouter)

  app.all('*', (req: Request, res: Response) => {
    res.status(404).send(`Route ${req.originalUrl} not found`)
  })

  app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
  })
}

main().catch((err) => {
  throw err
})
