import { AuthenticateUserService } from './AuthenticateUserService'
import { CreateUserService } from '../createUser/CreateUserService'

import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/infra/DayjsDateProvider/DayjsDateProvider'

import { FakeUsersRepository } from '@modules/accounts/repositories/users/FakeUsersRepository'
import { FakeUserTokensRepository } from '@modules/accounts/repositories/usersTokens/FakeUserTokensRepository'

let authenticateUserService: AuthenticateUserService
let usersRepositoryInMemory: FakeUsersRepository
let createUserService: CreateUserService
let userTokensRepositoryInMemory: FakeUserTokensRepository
let dateProvider: IDateProvider

describe('Authenticate user', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    usersRepositoryInMemory = new FakeUsersRepository()
    userTokensRepositoryInMemory = new FakeUserTokensRepository()

    authenticateUserService = new AuthenticateUserService(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    )

    createUserService = new CreateUserService(usersRepositoryInMemory)
  })

  it('Should be able to authenticate an user', async () => {
    const user = {
      name: 'user.name-test',
      email: 'user.email-test',
      password: 'user.password-test',
      driver_license: 'user.driver_license-test'
    }

    await createUserService.execute(user)

    const { token } = await authenticateUserService.execute({
      email: user.email,
      password: user.password
    })

    expect(token).toBeTruthy()
  })

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserService.execute({ email: '', password: '' })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate with incorrect password', async () => {
    const user = {
      name: 'user.name-test',
      email: 'user.email-test',
      password: 'user.password-test',
      driver_license: 'user.driver_license-test'
    }

    await createUserService.execute(user)

    expect(async () => {
      await authenticateUserService.execute({
        email: user.email,
        password: ''
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
