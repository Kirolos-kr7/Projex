import jwt, { JwtPayload } from 'jsonwebtoken'
import { authExpiration } from '..'

export const signJwt = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: authExpiration
  })

export const verifyJwt = (token: string) => jwt.verify(token, 'alex')

export const decodeJwt = (token: string) => jwt.decode(token)
