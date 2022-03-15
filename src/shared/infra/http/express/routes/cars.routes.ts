import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'

import { CreateCarController } from '@modules/cars/useCases/cars/createCar/CreateCarController'
import { ReadCarsController } from '@modules/cars/useCases/cars/readCars/ReadCarsController'
import { CreateCarSpecificationsController } from '@modules/cars/useCases/carsSpecifications/createCarSpecifications/CreateCarSpecificationsController'
import { UploadCarImageController } from '@modules/cars/useCases/carsImages/uploadCarImage/UploadCarImageController'

import upload from '@config/upload'

import { Router } from 'express'
import multer from 'multer'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const readCarsController = new ReadCarsController()
const uploadCarImageController = new UploadCarImageController()
const createCarSpecificationsController =
  new CreateCarSpecificationsController()

const uploadCarImage = multer(upload)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImageController.handle
)

carsRoutes.get('/', verifyAuthenticated, readCarsController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
)

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

export { carsRoutes }
