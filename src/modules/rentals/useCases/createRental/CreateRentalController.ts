import { CreateRentalService } from './CreateRentalService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateRentalController {
  async handle(req: Request, res: Response) {
    const { car_id, expected_date } = req.body
    const createData = { car_id, expected_date, user_id: req.user.id }

    const createRentalService = container.resolve(CreateRentalService)

    const rental = await createRentalService.execute(createData)

    return res.status(200).json(rental)
  }
}

export { CreateRentalController }
