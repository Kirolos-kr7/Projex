import { Request, Response } from 'express'
import prisma from '../prisma/prisma.client'

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
