import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { RegisterSchema } from '../schemas/user.schema'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const GetAll = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'asc' }
    })

    res.status(200).json(users)
  } catch (err) {
    res.status(400).send({ err })
  }
}

export const Add = async (req: Request, res: Response) => {
  try {
    const isUserExisting = await prisma.user.count({
      where: {
        email: req.body.email
      }
    })

    if (isUserExisting > 0)
      return res.status(400).json({ message: 'User email already exists.' })

    RegisterSchema.parse(req.body)

    const hashedPass = await bcrypt.hash(req.body.password, 10)

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        roleId: req.body.roleId,
        password: hashedPass
      }
    })

    if (user)
      return res.status(200).json({ message: 'User added successfully' })
    res.status(400).json({ message: "Couldn't add user" })
  } catch (err) {
    res.status(400).send(err)
  }
}
