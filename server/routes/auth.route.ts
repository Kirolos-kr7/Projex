import { Router } from 'express'
import { Login, User, Logout } from '../controllers/auth.controller'

const AuthRouter = Router()

AuthRouter.get('/me', User)
AuthRouter.post('/login', Login)
AuthRouter.post('/logout', Logout)

export default AuthRouter
