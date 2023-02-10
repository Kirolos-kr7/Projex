import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { getUserId } from '../utils/helper'
import { logThis } from '../utils/logs'
import z from 'zod'

const prisma = new PrismaClient()

export const GetAll = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.notes.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: true
      }
    })

    res.status(200).json(notes)
  } catch (err) {
    res.status(400).send({ err })
  }
}

export const AddNote = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req)
    const { content } = req.body

    const zz = z
      .string()
      .min(3, 'Note must contain atleast 3 characters')
      .max(255, 'Note must not exceed 255 characters')
      .safeParse(content)
    if (!zz.success) return res.status(400).json(zz.error)

    const note = await prisma.notes.create({
      data: {
        content: content,
        authorId: userId
      }
    })

    res.status(200).send('Note added successfully')
    logThis('notes', `A note was created w/ id: ${note.id}`, userId)
  } catch (err) {
    res.status(400).send({ err })
  }
}

export const DeleteNote = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req)
    const { noteId } = req.body

    await prisma.notes.delete({
      where: {
        id: noteId
      }
    })

    res.status(200).send('Note deleted successfully')
    logThis('notes', `A note was deleted w/ id: ${noteId}`, userId)
  } catch (err) {
    res.status(400).send({ err })
  }
}

export const EditNote = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req)
    const { noteId, content } = req.body

    await prisma.notes.update({
      where: {
        id: noteId
      },
      data: {
        content
      }
    })

    res.status(200).send('Note edited successfully')
    logThis('notes', `A note was edited w/ id: ${noteId}`, userId)
  } catch (err) {
    res.status(400).send({ err })
  }
}
