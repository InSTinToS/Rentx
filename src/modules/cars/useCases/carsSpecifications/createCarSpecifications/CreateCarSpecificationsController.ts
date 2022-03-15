import { CreateCarSpecificationsService } from './CreateCarSpecificationsService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateCarSpecificationsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { specifications_id } = req.body

    const createCarSpecificationsService = container.resolve(
      CreateCarSpecificationsService
    )

    const cars = await createCarSpecificationsService.execute({
      car_id: id,
      specifications_id
    })

    return res.json(cars)
  }
}

export { CreateCarSpecificationsController }
