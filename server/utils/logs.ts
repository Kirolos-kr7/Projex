import { PrismaClient, LogType } from '@prisma/client'
const prisma = new PrismaClient()

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
