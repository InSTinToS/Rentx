import { User } from '../../typeorm/models/User'

import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { IUserTokensRepository } from '@modules/accounts/repositories/usersTokens/IUserTokensRepository.types'
import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository.types'

import auth from '@config/auth'

import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: User['email']
  password: User['password']
}

interface IResponse {
  token: string
  refresh_token: string
  user: { name: User['name']; email: User['email'] }
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('E-mail or password incorrect', 401)

    const passwordIsValid = await compare(password, user.password)

    if (!passwordIsValid)
      throw new AppError('E-mail or password incorrect', 401)

    const token = sign({}, auth.token.secret, {
      subject: user.id,
      expiresIn: `${auth.token.expires_in}${auth.token.expires_unit}`
    })

    const refresh_token = sign({ email }, auth.refresh_token.secret, {
      subject: user.id,
      expiresIn: `${auth.refresh_token.expires_in}${auth.refresh_token.expires_unit}`
    })

    await this.usersTokensRepository.create({
      refresh_token,
      user_id: user.id,
      expires_date: this.dateProvider.addTime(
        auth.refresh_token.expires_in,
        auth.refresh_token.expires_unit
      )
    })

    return {
      token,
      refresh_token,
      user: { name: user.name, email: user.email }
    }
  }
}
export { AuthenticateUserService }
