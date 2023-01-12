import { Router } from 'express'
import { Add, GetAll } from '../controllers/user.controller'

const UserRouter = Router()

UserRouter.get('/all', GetAll)
UserRouter.post('/add', Add)

export default UserRouter
