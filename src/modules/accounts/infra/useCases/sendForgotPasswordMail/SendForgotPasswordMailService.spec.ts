import 'reflect-metadata'

import { SendForgotPasswordMailService } from './SendForgotPasswordMailService'

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/MailProviderInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/infra/DayjsDateProvider/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { FakeUserTokensRepository } from '@modules/accounts/repositories/usersTokens/FakeUserTokensRepository'
import { FakeUsersRepository } from '@modules/accounts/repositories/users/FakeUsersRepository'

let dateProvider: IDateProvider
let mailProviderInMemory: MailProviderInMemory
let usersRepositoryInMemory: FakeUsersRepository
let usersTokenRepositoryInMemory: FakeUserTokensRepository
let sendForgotPasswordMailService: SendForgotPasswordMailService

describe('SendForgotPasswordMail Service', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    mailProviderInMemory = new MailProviderInMemory()
    usersRepositoryInMemory = new FakeUsersRepository()
    usersTokenRepositoryInMemory = new FakeUserTokensRepository()

    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    )
  })

  it('should be able to send a forgot password mail', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail')

    await usersRepositoryInMemory.create({
      email: 'caji@za.bs',
      password: 'B61MRJSL',
      name: 'Mabelle Diaz',
      driver_license: '5452'
    })

    await sendForgotPasswordMailService.execute('caji@za.bs')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to sent forgot email if user does not exists', async () => {
    expect(async () => {
      await sendForgotPasswordMailService.execute('tintebin@ebafcur.qa')
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create an users token', async () => {
    const generateToken = jest.spyOn(usersTokenRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      email: 'gace@fap.th',
      password: 'B61MRJSL',
      name: 'Mabelle Diaz',
      driver_license: '5452'
    })

    await sendForgotPasswordMailService.execute('gace@fap.th')

    expect(generateToken).toBeCalled()
  })
})
