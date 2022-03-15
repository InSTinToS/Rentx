import { TCreateUserService } from './CreateUser.types'

import { AppError } from '@shared//errors/AppError'

import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository.types'

import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TCreateUserService = async data => {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    )

    if (emailAlreadyExists) throw new AppError('E-mail already exists', 400)

    const encryptedPassword = await hash(data.password, 8)

    await this.usersRepository.create({ ...data, password: encryptedPassword })
  }
}

export { CreateUserService }
