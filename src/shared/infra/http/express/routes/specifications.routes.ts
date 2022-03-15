import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateSpecificationController } from '@modules/cars/useCases/specifications/createSpecification/createSpecificationController'

import { Router } from 'express'

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  createSpecificationController.handle
)

export { specificationsRoutes }
