import 'express-async-errors'

import { AppError } from '@shared/errors/AppError'

import auth from '@config/auth'

import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const ensureAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) throw new AppError('Missing refresh token', 400)

  try {
    const { sub: user_id } = verify(token, auth.token.secret)
    req.user = { id: String(user_id) }
  } catch (error) {
    console.log(error)
    throw new AppError('Invalid refresh_token', 401)
  }

  next()
}

export { ensureAuthenticated }
