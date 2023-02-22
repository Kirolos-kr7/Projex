import prisma from '../prisma/prisma.client'
import { LogType } from '@prisma/client'

export const logThis = async (
  type: LogType,
  message: string,
  userId: string
) => {
  try {
    await prisma.logs.create({
      data: { type, message, userId }
    })
  } catch (err) {
    console.log(err)
  }
}
