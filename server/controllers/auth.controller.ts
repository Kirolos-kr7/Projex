import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { RegisterSchema, LoginSchema } from '../schemas/user.schema'
import { verifyJwt, signJwt } from '../utils/jwt'
import { authExpiration } from '..'

const prisma = new PrismaClient()

export const User = async (req: Request, res: Response) => {
  const token = req.cookies.authToken
  if (!token) return res.sendStatus(403)

  // @ts-ignore
  const isValid = verifyJwt(token)

  if (isValid) res.send({ token })
  else res.sendStatus(403)
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
        role: req.body.role,
        password: hashedPass
      }
    })

    const cred = { ...user, password: undefined }
    const token = signJwt(cred)

    res.cookie('auth', token, {
      secure: true,
      httpOnly: true,
      maxAge: authExpiration
    })

    return res.status(200).json({ token, user: cred })
  } catch (err) {
    res.status(400).send({ err })
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

      res.cookie('authToken', token, {
        secure: true,
        httpOnly: true,
        maxAge: authExpiration
      })

      return res.status(200).json({ token, user: cred })
    })
  } catch (err) {
    res.status(400).send({ err })
  }
}

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('authToken')

    return res.status(200).send()
  } catch (err) {
    res.status(400).send({ err })
  }
}
