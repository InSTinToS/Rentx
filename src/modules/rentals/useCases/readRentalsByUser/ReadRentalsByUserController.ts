import { ReadRentalsByUserService } from './ReadRentalsByUserService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ReadRentalsByUserController {
  async handle(req: Request, res: Response) {
    const readRentalsByUserService = container.resolve(ReadRentalsByUserService)

    const rentals = await readRentalsByUserService.execute(req.user?.id)

    return res.status(200).json(rentals)
  }
}

export { ReadRentalsByUserController }
