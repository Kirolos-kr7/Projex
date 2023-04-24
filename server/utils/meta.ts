import prisma from '../prisma/prisma.client'

const getMeta = async (key: string) =>
  (
    await prisma.meta.findUnique({
      where: {
        key
      }
    })
  )?.value

const setMeta = async (key: string, value: string) =>
  await prisma.meta.upsert({
    where: { key },
    create: { key, value },
    update: { key, value }
  })

export { setMeta, getMeta }
