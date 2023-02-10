import { Router } from 'express'
import {
  GetAll,
  AddNote,
  DeleteNote,
  EditNote
} from '../controllers/notes.controller'

const NotesRouter = Router()

NotesRouter.get('/', GetAll)
NotesRouter.post('/', AddNote)
NotesRouter.put('/', EditNote)
NotesRouter.delete('/', DeleteNote)

export default NotesRouter
