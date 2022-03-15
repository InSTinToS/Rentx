import { CreateCarService } from './createCarService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateCarController {
  async handle(req: Request, res: Response) {
    const newCarData = req.body
    const createCarService = container.resolve(CreateCarService)

    const createdCar = await createCarService.execute(newCarData)

    return res.status(201).json(createdCar)
  }
}

export { CreateCarController }
