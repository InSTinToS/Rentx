import 'express-async-errors'

import { AppError } from '@shared/errors/AppError'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'

import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const verifyAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization.split(' ')[1]

  if (!token) throw new AppError('Token is missing')

  const { sub: user_id } = verify(token, 'secret', {})

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(String(user_id))

  if (!user) return next()

  req.user = { id: user.id }

  return next()
}

export { verifyAuthenticated }
