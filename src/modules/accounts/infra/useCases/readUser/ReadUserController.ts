import { ReadUserService } from './ReadUserService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ReadUserController {
  async handle(req: Request, res: Response) {
    const readUserService = container.resolve(ReadUserService)

    const users = await readUserService.execute(req.params?.id)

    return res.json(users).status(200)
  }
}

export { ReadUserController }
