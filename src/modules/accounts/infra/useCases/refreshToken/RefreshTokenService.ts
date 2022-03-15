import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { UserTokens } from '@modules/accounts/infra/typeorm/models/UserTokens'
import { IUserTokensRepository } from '@modules/accounts/repositories/usersTokens/IUserTokensRepository.types'

import auth from '@config/auth'

import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface ITokenPayload {
  sub: UserTokens['user_id']
  email: UserTokens['user']['email']
}

interface IResponse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<IResponse> {
    if (!refresh_token) throw new AppError('Missing refresh token', 400)

    let user_id: string, email: string

    try {
      const { sub: payloadUserId, email: payloadEmail } = verify(
        refresh_token,
        auth.refresh_token.secret
      ) as ITokenPayload

      user_id = payloadUserId
      email = payloadEmail
    } catch (error) {
      throw new AppError('JWT is invalid', 401)
    }

    const foundUserToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token
      })

    if (!foundUserToken)
      throw new AppError('Not found user with this refresh_token', 404)

    this.userTokensRepository.deleteById(foundUserToken.id)

    const newRefreshToken = sign({ email }, auth.refresh_token.secret, {
      subject: user_id,
      expiresIn: `${auth.refresh_token.expires_in}${auth.refresh_token.expires_unit}`
    })

    await this.userTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date: this.dateProvider.addTime(
        auth.refresh_token.expires_in,
        auth.refresh_token.expires_unit
      )
    })

    const newToken = sign({}, auth.token.secret, {
      subject: user_id,
      expiresIn: `${auth.token.expires_in}${auth.token.expires_unit}`
    })

    return {
      token: newToken,
      refresh_token: newRefreshToken
    }
  }
}

export { RefreshTokenService }
