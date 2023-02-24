import prisma from '../prisma/prisma.client'
import { NextFunction, Request, Response } from 'express'
import { RegisterSchema } from '../schemas/user.schema'
import bcrypt from 'bcryptjs'
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'fs'
import { getUser } from '../utils/helper'
import { signJwt } from '../utils/jwt'
import { authExpiration } from '..'

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
        fullName: req.body.fullName,
        userName: req.body.userName,
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

export const UpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = getUser(req)
    const { userName, fullName } = req.body

    if (userName || fullName) {
      const user = await prisma.user.update({
        where: { id: userData?.id },
        data: {
          userName: userName,
          fullName: fullName
        }
      })
    }

    if (req.file) {
      const path = `../client/public/storage/users`

      if (!existsSync(path)) mkdirSync(path, { recursive: true })

      const data = await sharp(req.file?.buffer)
        .resize(400)
        .webp({ lossless: true, quality: 100 })
        .toFile(path + `/${userData?.id}.webp`)

      if (!data) return res.status(400).send('Profile update failed')

      if (!userData?.hasProfileImage)
        await prisma.user.update({
          where: { id: userData?.id },
          data: {
            hasProfileImage: {
              set: true
            }
          }
        })
    }

    const user = await prisma.user.findUnique({
      where: { id: userData?.id },
      include: {
        role: true
      }
    })

    const cred = { ...user, password: undefined }
    const token = signJwt(cred)

    res.cookie('authToken', token, {
      secure: true,
      httpOnly: true,
      maxAge: authExpiration
    })

    res.send({
      message: 'Profile updated successfully',
      user: cred,
      token
    })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}
