import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { ReadRentalsByUserController } from '@modules/rentals/useCases/readRentalsByUser/ReadRentalsByUserController'

import { Router } from 'express'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const readRentalsByUserController = new ReadRentalsByUserController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalRoutes.post(
  '/devolutions/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
)

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  readRentalsByUserController.handle
)

export { rentalRoutes }
