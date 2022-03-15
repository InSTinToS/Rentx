import { User } from '@modules/accounts/infra/typeorm/models/User'
import {
  IUsersRepository,
  TCreate,
  TFindByEmail,
  TFindById,
  TRead
} from '@modules/accounts/repositories/users/IUsersRepository.types'

import { getRepository, Repository } from 'typeorm'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  findById: TFindById = async id => await this.repository.findOne({ id })

  findByEmail: TFindByEmail = async email =>
    await this.repository.findOne({ email })

  read: TRead = async () => this.repository.find()

  create: TCreate = async data => {
    const newUser = this.repository.create(data)
    await this.repository.save(newUser)
  }
}

export { UsersRepository }
