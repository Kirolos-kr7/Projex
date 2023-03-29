import { Request, Response } from 'express'
import prisma from '../prisma/prisma.client'

export const GetAll = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query

  try {
    const logs = await prisma.logs.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true
      },
      take: parseInt(limit as string),
      skip: parseInt(page as string) * parseInt(limit as string)
    })

    res.status(200).json(logs)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}

export const GetMaxLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.logs.count()

    res.status(200).json(logs)
  } catch (err) {
    console.log(err)
    res.status(400).send({ err })
  }
}
