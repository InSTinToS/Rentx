import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository.types'
import { IUserTokensRepository } from '@modules/accounts/repositories/usersTokens/IUserTokensRepository.types'

import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, token }: IRequest) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token)

    if (!userToken) throw new AppError('Invalid token', 401)

    if (
      this.dateProvider.isBeforeDate(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    )
      throw new AppError('Token expired')

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)
    await this.userTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordService }
