import {
  IUsersRepository,
  TCreate,
  TFindByEmail,
  TFindById,
  TRead
} from './IUsersRepository.types'

import { User } from '@modules/accounts/models/User'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  read: TRead = async () => this.users

  findById: TFindById = async id => this.users.find(user => user.id === id)

  findByEmail: TFindByEmail = async email =>
    this.users.find(user => user.email === email)

  create: TCreate = async data => {
    const user = new User()
    this.users.push(Object.assign(user, data))
  }
}

export { FakeUsersRepository }
