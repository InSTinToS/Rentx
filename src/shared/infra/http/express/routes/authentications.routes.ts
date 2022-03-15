import 'express-async-errors'

import { AuthenticateUserController } from '@modules/accounts/infra/useCases/authentications/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/infra/useCases/refreshToken/RefreshTokenController'

import { Router } from 'express'

const authenticationsRoutes = Router()
const refreshTokenController = new RefreshTokenController()
const authenticateUserController = new AuthenticateUserController()

authenticationsRoutes.post('/', authenticateUserController.handle)
authenticationsRoutes.post('/refresh-token', refreshTokenController.handle)

export { authenticationsRoutes }
