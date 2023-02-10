import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GetAll = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.logs.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true
      }
    })

    res.status(200).json(logs)
  } catch (err) {
    res.status(400).send({ err })
  }
}
