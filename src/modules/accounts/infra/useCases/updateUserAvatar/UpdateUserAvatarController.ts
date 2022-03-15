import { UpdateUserAvatarService } from './UpdateUserAvatarService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = req.user
    const avatar = req.file.filename

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

    await updateUserAvatarService.execute({ userId: id, avatar })

    return res.status(204).send()
  }
}

export { UpdateUserAvatarController }
