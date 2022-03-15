import { AuthenticateUserService } from './AuthenticateUserService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const reqData = req.body
    const authenticateUserService = container.resolve(AuthenticateUserService)
    const resData = await authenticateUserService.execute(reqData)
    return res.json(resData).status(200)
  }
}

export { AuthenticateUserController }
