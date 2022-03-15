import { AppError } from '@shared/errors/AppError'

import { UserMap } from '@modules/accounts/mappers/UserMap'
import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository.types'

import { inject, injectable } from 'tsyringe'

@injectable()
class ReadUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id?: string) {
    if (id) {
      const foundUser = await this.usersRepository.findById(id)
      if (!foundUser) throw new AppError('Not found user', 404)

      return UserMap.toDTO(foundUser)
    } else {
      const users = await this.usersRepository.read()
      const usersDTO = users.map(user => UserMap.toDTO(user))
      return usersDTO
    }
  }
}

export { ReadUserService }
