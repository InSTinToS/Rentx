import { User } from '@modules/accounts/models/User'

import { RequestHandler } from 'express'

interface IRequest {
  name: User['name']
  email: User['email']
  avatar?: User['avatar']
  password: User['password']
  driver_license: User['driver_license']
}

type TCreateUserController = RequestHandler<void, void, IRequest>

type TCreateUserService = (data: IRequest) => Promise<void>

export type { TCreateUserService, TCreateUserController }
