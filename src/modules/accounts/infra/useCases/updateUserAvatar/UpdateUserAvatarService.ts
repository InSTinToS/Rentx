import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

import { User } from '@modules/accounts/models/User'
import { IUsersRepository } from '@modules/accounts/repositories/users/IUsersRepository.types'

import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: User['id']
  avatar: User['avatar']
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('User not found')

    user?.avatar && (await this.storageProvider.delete(user.avatar, 'avatar'))

    await this.storageProvider.save(avatar, 'avatar')

    user.avatar = avatar

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarService }
