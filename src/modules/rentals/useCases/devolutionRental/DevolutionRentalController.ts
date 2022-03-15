import { DevolutionRentalService } from './DevolutionRentalService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class DevolutionRentalController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { id: user_id } = req.user

    const devolutionRentalService = container.resolve(DevolutionRentalService)

    const rental = devolutionRentalService.execute({ id, user_id })

    return res.status(200).json(rental)
  }
}

export { DevolutionRentalController }
