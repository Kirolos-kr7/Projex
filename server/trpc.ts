import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { z, number } from 'zod'
import prisma from './prisma/prisma.client'
import { getUserId } from './utils/helper'
import { logThis } from './utils/logs'

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

const notesRouter = router({
  getAll: publicProcedure.query(async ({ input }) => {
    const notes = await prisma.notes.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: true
      }
    })

    if (!notes) throw new TRPCError({ code: 'NOT_FOUND' })

    return notes
  }),
  create: publicProcedure
    .input(
      z
        .string()
        .min(3, 'Note must contain atleast 3 characters')
        .max(255, 'Note must not exceed 255 characters')
    )
    .mutation(async ({ ctx, input: content }) => {
      const { req } = ctx
      const userId = getUserId(req)

      const note = await prisma.notes.create({
        data: {
          content: content,
          authorId: userId
        }
      })

      logThis('notes', `A note was created w/ id: ${note.id}`, userId)
    }),
  edit: publicProcedure
    .input(
      z.object({
        content: z
          .string()
          .min(3, 'Note must contain atleast 3 characters')
          .max(255, 'Note must not exceed 255 characters'),
        noteId: z.number()
      })
    )
    .mutation(async ({ ctx, input: { content, noteId } }) => {
      const { req } = ctx
      const userId = getUserId(req)

      await prisma.notes.update({
        where: {
          id: noteId
        },
        data: {
          content
        }
      })

      logThis('notes', `A note was edited w/ id: ${noteId}`, userId)
    }),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: noteId }) => {
      const userId = getUserId(ctx.req)

      await prisma.notes.delete({
        where: {
          id: noteId
        }
      })

      logThis('notes', `A note was deleted w/ id: ${noteId}`, userId)
    })
})

const rolesRouter = router({
  getAll: publicProcedure.query(async () => {
    const roles = await prisma.role.findMany({
      orderBy: { createdAt: 'asc' }
    })

    if (!roles) throw new TRPCError({ code: 'NOT_FOUND' })

    return roles
  })
})

export const appRouter = router({
  logs: logsRouter,
  roles: rolesRouter,
  notes: notesRouter
})
export type AppRouter = typeof appRouter
