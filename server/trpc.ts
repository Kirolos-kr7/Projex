import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { z } from 'zod'
import prisma from './prisma/prisma.client'
import { getUserId } from './utils/helper'
import { logThis } from './utils/logs'
import bcrypt from 'bcryptjs'
import { signJwt, verifyJwt } from './utils/jwt'
import { authExpiration } from '.'

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res
})
type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create()
export const publicProcedure = t.procedure
export const router = t.router

const logsRouter = router({
  getAll: publicProcedure
    .input(z.object({ page: z.number(), limit: z.number() }))
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

      logs.forEach(({ user }) => {
        if (user) delete (user as any).password
      })

      if (!logs) throw new TRPCError({ code: 'NOT_FOUND' })

      return logs
    }),
  getMaxLogs: publicProcedure.query(() => {
    const max = prisma.logs.count()
    return max
  }),
  dailyProgress: publicProcedure.query(async () => {
    const logs = await prisma.logs.groupBy({
      by: ['createdOn'],
      _count: {
        createdOn: true
      },
      orderBy: {
        createdOn: 'asc'
      },
      take: 7
    })

    return logs.map(({ createdOn, _count }) => ({
      createdOn,
      count: _count.createdOn
    }))
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

    notes.forEach(({ author }) => {
      if (author) delete (author as any).password
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
  }),
  changeRole: publicProcedure
    .input(z.object({ userId: z.string(), roleId: z.number() }))
    .mutation(async ({ input }) => {
      const { userId, roleId } = input

      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          roleId
        }
      })
    })
})

const tasksRouter = router({
  getAll: publicProcedure.query(async () => {
    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: true
      }
    })

    tasks.forEach(({ assignedTo }) => {
      if (assignedTo) delete (assignedTo as any).password
    })

    if (!tasks) throw new TRPCError({ code: 'NOT_FOUND' })

    return tasks
  }),
  getTaskStatuses: publicProcedure.query(async () => {
    const taskStatuses = await prisma.taskStatus.findMany({
      orderBy: {
        order: 'desc'
      }
    })

    if (!taskStatuses) throw new TRPCError({ code: 'NOT_FOUND' })

    return taskStatuses
  }),
  getProjectProgress: publicProcedure.query(async () => {
    const tasks = await prisma.task.findMany({
      select: {
        status: true
      }
    })

    const counts = { done: 0, all: 0 }

    for (let i = 0; i < tasks.length; i++) {
      const { status } = tasks[i]
      if (status == 'done') counts.done += 1
      counts.all += 1
    }

    return counts
  }),
  getBoardStatus: publicProcedure.query(async () => {
    const taskStatuses = await prisma.taskStatus.findMany({
      select: {
        name: true,
        id: true,
        _count: true
      }
    })

    return taskStatuses.map(({ _count, id, name }) => {
      return { count: _count.Task, name, id }
    })
  }),
  changeStatusName: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input
      const userId = getUserId(ctx.req)

      const status = await prisma.taskStatus.update({
        where: { id },
        data: { name }
      })

      logThis('tasks', 'Changed status name task w/ id: ' + status.id, userId)
    }),
  changeTaskStatus: publicProcedure
    .input(z.object({ taskId: z.number(), statusId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { taskId, statusId } = input
      const userId = getUserId(ctx.req)

      const updatedTask = await prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          status: statusId
        }
      })

      logThis('tasks', 'Updated task status w/ id: ' + updatedTask.id, userId)
    }),
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string().min(2, 'Title must contain at least 2 character(s)'),
        priority: z.any(),
        type: z.any(),
        status: z.string(),
        assignedToId: z.string().nullable()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = getUserId(ctx.req)
      const { title, priority, type, status, assignedToId } = input

      const newTask = await prisma.task.create({
        data: { title, priority, status, type, assignedToId }
      })

      logThis('tasks', 'Added task w/ id: ' + newTask.id, userId)
    }),
  editTask: publicProcedure
    .input(
      z.object({
        title: z.string().min(2, 'Title must contain at least 2 character(s)'),
        priority: z.any(),
        type: z.any(),
        status: z.string(),
        assignedToId: z.string().nullable(),
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = getUserId(ctx.req)
      const { title, priority, type, status, assignedToId, id } = input

      const newTask = await prisma.task.update({
        where: { id },
        data: { title, priority, status, type, assignedToId }
      })

      logThis('tasks', 'Added task w/ id: ' + newTask.id, userId)
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number({
          invalid_type_error: 'Invalid task id.',
          required_error: 'Task id is required.'
        })
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx.req)
      const { id } = input

      await prisma.task.delete({
        where: {
          id
        }
      })

      logThis('tasks', 'Deleted task w/ id: ' + id, userId)
    })
})

const usersRouter = router({
  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'asc' }
    })

    if (!users) throw new TRPCError({ code: 'NOT_FOUND' })

    return users
  }),
  create: publicProcedure
    .input(
      z
        .object({
          fullName: z.string().min(3).max(255),
          userName: z.string().min(2).max(128),
          email: z.string().email({ message: 'Invalid email address.' }),
          password: z.string().min(8, {
            message: "Password can't be less than 8 characters long."
          }),
          confirmPassword: z.string().min(8),
          roleId: z.number()
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
          if (confirmPassword !== password) {
            ctx.addIssue({
              code: 'custom',
              message: 'Passwords does not match.'
            })
          }
        })
    )
    .mutation(async ({ input }) => {
      const isUserExisting = await prisma.user.count({
        where: {
          email: input.email
        }
      })

      if (isUserExisting > 0)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User email already exists'
        })

      const hashedPass = await bcrypt.hash(input.password, 10)

      await prisma.user.create({
        data: {
          fullName: input.fullName,
          userName: input.userName,
          email: input.email,
          roleId: input.roleId,
          password: hashedPass
        }
      })
    }),
  remove: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      await prisma.user.delete({
        where: {
          id: input.userId
        }
      })
    })
})

const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    const { cookies } = ctx.req
    const token = cookies.authToken
    if (!token) return

    const isValid = verifyJwt(token)

    if (isValid) return token
    else throw new TRPCError({ code: 'FORBIDDEN' })
  }),
  login: publicProcedure
    .input(
      z.object({
        eou: z.string(),
        password: z.string().min(8, {
          message: "Password can't be less than 8 characters long."
        })
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { eou, password } = input
      const where: { email?: string; userName?: string } = {}

      const { success: isEmail } = await z.string().email().safeParseAsync(eou)
      if (isEmail) where.email = eou
      else where.userName = eou

      const user = await prisma.user.findUnique({
        where,
        include: {
          role: true
        }
      })

      if (!user)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Provide a correct email or username.'
        })

      const isMatch = await bcrypt.compare(input.password, user.password)

      if (!isMatch)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Incorrect password.'
        })

      const cred = { ...user, password: undefined }
      const token = signJwt(cred)
      ctx.res.cookie('authToken', token, {
        secure: true,
        httpOnly: true,
        maxAge: authExpiration
      })

      return { token }
    }),
  logout: publicProcedure.query(async ({ ctx }) => {
    ctx.res.clearCookie('authToken')
  })
})

const githubRouter = router({
  repos: publicProcedure.query(async ({ ctx }) => {
    return [
      {
        origin: 'Github',
        name: 'Bidit Backend',
        updatedAt: new Date('2/9/2022')
      },
      {
        origin: 'Github',
        name: 'Bidit Client',
        updatedAt: new Date()
      },
      {
        origin: 'Github',
        name: 'Unamed',
        updatedAt: new Date('10/2/2022')
      }
    ]
  })
})

export const appRouter = router({
  logs: logsRouter,
  roles: rolesRouter,
  notes: notesRouter,
  tasks: tasksRouter,
  users: usersRouter,
  auth: authRouter,
  github: githubRouter
})

export type AppRouter = typeof appRouter
