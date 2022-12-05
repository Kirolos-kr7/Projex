import express, { type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

import { PrismaClient } from '@prisma/client'
import AuthRouter from './routes/auth.route'

const app = express()
const port = process.env.PORT || 8080
const prisma = new PrismaClient()

const main = async () => {
  await prisma.$connect()

  app.use(express.json())
  app.use(cookieParser())
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(
    cors({
      origin: ['localhost:3000'],
      credentials: true
    })
  )

  app.use('/api/auth', AuthRouter)

  app.all('*', (req: Request, res: Response) => {
    res.status(404).send(`Route ${req.originalUrl} not found`)
  })

  app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
  })
}

main()
  .catch((err) => {
    throw err
  })
  .finally(async () => await prisma.$disconnect())
