import { RefreshTokenService } from './RefreshTokenService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const refresh_token =
      req.body.refresh_token ||
      req.header['x-access-token'] ||
      req.query.refresh_token

    const refreshTokenService = container.resolve(RefreshTokenService)

    const resData = await refreshTokenService.execute(refresh_token)

    return res.status(200).json(resData)
  }
}

export { RefreshTokenController }
