import 'express-async-errors'

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { authenticationsRoutes } from './authentications.routes'
import { carsRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes'
import { passwordRoutes } from './password.routes'

import { Router } from 'express'

const routes = Router()

routes.use('/cars', carsRoutes)
routes.use('/users', usersRoutes)
routes.use('/rentals', rentalRoutes)
routes.use('/password', passwordRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/sessions', authenticationsRoutes)
routes.use('/specifications', specificationsRoutes)

export { routes }
