import { UserTokens } from '@modules/accounts/models/UserTokens'

interface ICreateParams {
  user_id: UserTokens['id']
  expires_date: UserTokens['expires_date']
  refresh_token: UserTokens['refresh_token']
}

interface IFindByUserIdAndRefreshTokenParams {
  user_id: UserTokens['user_id']
  refresh_token: UserTokens['refresh_token']
}

type TDeleteById = (id: string) => Promise<void>
type TCreate = (data: ICreateParams) => Promise<UserTokens>
type TFindByRefreshToken = (token: string) => Promise<UserTokens>
type TFindByUserIdAndRefreshToken = (
  data: IFindByUserIdAndRefreshTokenParams
) => Promise<UserTokens>

interface IUserTokensRepository {
  create: TCreate
  deleteById: TDeleteById
  findByRefreshToken: TFindByRefreshToken
  findByUserIdAndRefreshToken: TFindByUserIdAndRefreshToken
}

export type {
  TCreate,
  TDeleteById,
  TFindByRefreshToken,
  IUserTokensRepository,
  TFindByUserIdAndRefreshToken
}
