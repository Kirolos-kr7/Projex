import { Request } from 'express'
import { decodeJwt } from './jwt'
import { User } from '@prisma/client'

interface JwtPayload extends User {
  id: string
}

export const getUserId = (req: Request) =>
  (decodeJwt(req.cookies.authToken) as JwtPayload)?.id

export const getUser = (req: Request) =>
  decodeJwt(req.cookies.authToken) as JwtPayload
