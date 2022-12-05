import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { RegisterSchema, LoginSchema } from '../schemas/user.schema'
import { signJwt } from '../utils/jwt'

const prisma = new PrismaClient()

export const User = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst()

  res.send({ user: { ...user, password: undefined } })
}

export const Register = async (req: Request, res: Response) => {
  try {
    const isUserExisting = await prisma.user.count({
      where: {
        email: req.body.email
      }
    })

    if (isUserExisting > 0)
      return res.status(400).json({ message: 'Email already exists.' })

    RegisterSchema.parse(req.body)

    const hashedPass = await bcrypt.hash(req.body.password, 10)

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
      }
    })

    const cred = { ...user, password: undefined }
    const token = signJwt(cred)

    res.cookie('auth', token, {
      secure: true,
      httpOnly: true,
      maxAge: 3600 * 24 * 3
    })

    return res.status(200).json({ token, user: cred })
  } catch (err) {
    res.status(400).send(err)
  }
}

export const Login = async (req: Request, res: Response) => {
  try {
    LoginSchema.parse(req.body)

    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    })

    if (!user) return res.status(400).json({ message: 'Email does not exist.' })

    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) return res.status(400).json({ message: 'Email does not exist.' })

      if (!result)
        return res.status(400).json({ message: 'Incorrect password.' })

      const cred = { ...user, password: undefined }
      const token = signJwt(cred)

      res.cookie('auth', token, {
        secure: true,
        httpOnly: true,
        maxAge: 3600 * 8
      })

      return res.status(200).json({ token, user: cred })
    })
  } catch (err) {
    res.status(400).send(err)
  }
}
