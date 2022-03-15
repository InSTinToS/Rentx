import { SendForgotPasswordMailService } from './SendForgotPasswordMailService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class SendForgotPasswordMailController {
  async handle(req: Request, res: Response) {
    const { email } = req.body

    const sendForgotPasswordMailService = container.resolve(
      SendForgotPasswordMailService
    )

    await sendForgotPasswordMailService.execute(email)

    return res.status(200).json({ message: 'E-mail sent' })
  }
}

export { SendForgotPasswordMailController }
