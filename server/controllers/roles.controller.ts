import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GetAll = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { createdAt: 'asc' }
    })

    res.status(200).json(roles)
  } catch (err) {
    res.status(400).send({ err })
  }
}
