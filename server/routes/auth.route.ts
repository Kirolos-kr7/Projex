import { Router } from 'express'
import { Login, Register, User } from '../controllers/auth.controller'

const AuthRouter = Router()

AuthRouter.get('/me', User)
AuthRouter.post('/login', Login)
AuthRouter.post('/register', Register)

export default AuthRouter
