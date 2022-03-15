import { ReadCarsService } from './ReadCarsService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ReadCarsController {
  async handle(req: Request, res: Response) {
    const reqData = req.query
    const readCarsService = container.resolve(ReadCarsService)

    const cars = await readCarsService.execute({
      ...reqData,
      isAuthenticated: !!req.user?.id
    })

    return res.status(200).json(cars)
  }
}

export { ReadCarsController }
