import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GetTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany()

    res.status(200).json({ tasks })
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}

export const GetTaskStatuses = async (req: Request, res: Response) => {
  try {
    const taskStatuses = await prisma.taskStatus.findMany({
      orderBy: {
        order: 'desc'
      }
    })

    res.status(200).json({ taskStatuses })
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}

export const AddTask = async (req: Request, res: Response) => {
  try {
    const task = req.body

    const id = await getFreeId()

    const newTask = await prisma.task.create({
      data: { ...task, id }
    })

    res.status(200).json('Added task successfully')
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}

export const ChangeTaskStatus = async (req: Request, res: Response) => {
  try {
    const task = req.body

    const id = await getFreeId()

    const newTask = await prisma.task.create({
      data: { ...task, id }
    })

    res.status(200).json('Added task successfully')
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}

export const ChangeStatusName = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body

    const status = await prisma.taskStatus.update({
      where: { id },
      data: { name }
    })

    if (status) return res.status(200).json('Status updated successfully')
    else res.status(400).json('Status upddate failed')
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}

const getFreeId = async () => {
  let id: string

  while (true) {
    id = `PMS-${(Math.random() * 1000).toFixed(0)}`

    const isIdTaken = await prisma.task.findUnique({
      where: { id }
    })

    if (!isIdTaken) break
  }

  return id
}
