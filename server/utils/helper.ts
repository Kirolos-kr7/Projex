import { Request } from 'express'
import { decodeJwt } from './jwt'

interface JwtPayload {
  id: string
}

export const getUserId = (req: Request) =>
  (decodeJwt(req.cookies.authToken) as JwtPayload)?.id
