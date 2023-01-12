import { Router } from 'express'
import { GetAll } from '../controllers/roles.controller'

const RolesRouter = Router()

RolesRouter.get('/', GetAll)

export default RolesRouter
