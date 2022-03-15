import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateCategoryController } from '@modules/cars/useCases/categories/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/categories/importCategory/ImportCategoryController'
import { ReadCategoriesController } from '@modules/cars/useCases/categories/readCategories/ReadCategoriesController'

import uploadConfig from '@config/upload'

import { Router } from 'express'
import multer from 'multer'

const categoriesRoutes = Router()
const upload = multer(uploadConfig)
const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const readCategoriesController = new ReadCategoriesController()

categoriesRoutes.get('/', readCategoriesController.handle)

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('category'),
  importCategoryController.handle
)

export { categoriesRoutes }
