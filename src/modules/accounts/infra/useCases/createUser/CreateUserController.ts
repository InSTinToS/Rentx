import { CreateUserService } from './CreateUserService'
import { TCreateUserController } from './CreateUser.types'

import { container } from 'tsyringe'

class CreateUserController {
  handle: TCreateUserController = async (req, res) => {
    const userData = req.body
    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute(userData)
    return res.status(201).send()
  }
}

export { CreateUserController }
