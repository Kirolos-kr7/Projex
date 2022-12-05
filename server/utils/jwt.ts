import jwt, { JwtPayload } from 'jsonwebtoken'

export const signJwt = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: '8h' })
