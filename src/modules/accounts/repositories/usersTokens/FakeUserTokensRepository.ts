import {
  IUserTokensRepository,
  TCreate,
  TDeleteById,
  TFindByRefreshToken,
  TFindByUserIdAndRefreshToken
} from './IUserTokensRepository.types'

import { UserTokens } from '@modules/accounts/models/UserTokens'

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = []

  findByRefreshToken: TFindByRefreshToken = async refresh_token =>
    this.userTokens.find(userToken => userToken.refresh_token === refresh_token)

  findByUserIdAndRefreshToken: TFindByUserIdAndRefreshToken = async ({
    refresh_token,
    user_id
  }) =>
    this.userTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    )

  deleteById: TDeleteById = async id => {
    const foundUserToken = this.userTokens.find(
      userToken => userToken.id === id
    )

    this.userTokens.splice(this.userTokens.indexOf(foundUserToken))
  }

  create: TCreate = async data => {
    const userTokens = new UserTokens()

    this.userTokens.push(Object.assign(userTokens, data))

    return userTokens
  }
}

export { FakeUserTokensRepository }
