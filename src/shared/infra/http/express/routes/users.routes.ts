import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateUserController } from '@modules/accounts/infra/useCases/createUser/CreateUserController'
import { ReadUserController } from '@modules/accounts/infra/useCases/readUser/ReadUserController'
import { UpdateUserAvatarController } from '@modules/accounts/infra/useCases/updateUserAvatar/UpdateUserAvatarController'

import uploadConfig from '@config/upload'

import { Router } from 'express'
import multer from 'multer'

const usersRoutes = Router()
const upload = multer(uploadConfig)
const readUserController = new ReadUserController()
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.get('/:id?', readUserController.handle)

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
