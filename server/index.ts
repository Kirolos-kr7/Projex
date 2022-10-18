import express, { type Request, Response } from 'express'

const app = express()
const port = 8080

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world' })
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
