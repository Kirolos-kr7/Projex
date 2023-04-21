import prisma from '../prisma/prisma.client'
import { NextFunction, Request, Response } from 'express'
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'fs'
import { getUser } from '../utils/helper'
import { signJwt } from '../utils/jwt'
import { authExpiration } from '..'

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
  } catch (err: any) {
    console.log(err)
    if (err.code == 'P2002')
      return res.status(400).send('Username is already taken.')
    res.status(400).send(err)
  }
}
