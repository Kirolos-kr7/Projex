import { Router } from 'express'
import multer from 'multer'
import { Add, GetAll, UpdateProfile } from '../controllers/user.controller'

const UserRouter = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

UserRouter.get('/all', GetAll)
UserRouter.post('/add', Add)
UserRouter.patch('/profile', upload.single('profile-img'), UpdateProfile)

export default UserRouter
