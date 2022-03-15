import { UserTokens } from '../models/UserTokens'

import {
  IUserTokensRepository,
  TCreate,
  TDeleteById,
  TFindByRefreshToken,
  TFindByUserIdAndRefreshToken
} from '@modules/accounts/repositories/usersTokens/IUserTokensRepository.types'

import { getRepository, Repository } from 'typeorm'

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  findByRefreshToken: TFindByRefreshToken = async refresh_token =>
    await this.repository.findOne({ refresh_token })

  deleteById: TDeleteById = async id => {
    await this.repository.delete(id)
  }

  findByUserIdAndRefreshToken: TFindByUserIdAndRefreshToken = async data =>
    await this.repository.findOne(data)

  create: TCreate = async data => {
    const newUserToken = this.repository.create(data)
    await this.repository.save(newUserToken)
    return newUserToken
  }
}

export { UserTokensRepository }
