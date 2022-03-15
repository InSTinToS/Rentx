import { User } from '@modules/accounts/models/User'

interface ICreateParams {
  id?: User['id']
  name: User['name']
  email: User['email']
  avatar?: User['avatar']
  password: User['password']
  driver_license: User['driver_license']
}

type TRead = () => Promise<User[]>
type TFindById = (id: User['id']) => Promise<User>
type TCreate = (data: ICreateParams) => Promise<void>
type TFindByEmail = (email: User['email']) => Promise<User>

interface IUsersRepository {
  read: TRead
  create: TCreate
  findById: TFindById
  findByEmail: TFindByEmail
}

export type { TRead, TCreate, TFindById, TFindByEmail, IUsersRepository }
