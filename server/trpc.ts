import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { z, number } from 'zod'
import prisma from './prisma/prisma.client'

export const createContext = ({ req }: CreateExpressContextOptions) => ({
  req
})
type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create()
export const publicProcedure = t.procedure
export const router = t.router

const logsRouter = router({
  getAll: publicProcedure
    .input(z.object({ page: number(), limit: number() }))
    .query(async ({ input }) => {
      const { page = 1, limit = 10 } = input
      const logs = await prisma.logs.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: true
        },
        take: limit,
        skip: page * limit
      })

      if (!logs) throw new TRPCError({ code: 'NOT_FOUND' })

      return logs
    }),
  getMaxLogs: publicProcedure.query(() => {
    const max = prisma.logs.count()
    return max
  })
})

export const appRouter = router({
  logs: logsRouter
})
export type AppRouter = typeof appRouter
