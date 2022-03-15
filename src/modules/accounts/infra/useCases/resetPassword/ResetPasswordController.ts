import { ResetPasswordService } from './ResetPasswordService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token } = req.query
    const { password } = req.body

    const resetPasswordService = container.resolve(ResetPasswordService)

    await resetPasswordService.execute({ token: String(token), password })

    return res.status(200)
  }
}

export { ResetPasswordController }
