import { User } from './User'

class UserTokens {
  id: string
  user: User
  user_id: string
  created_at: Date
  expires_date: Date
  refresh_token: string
}

export { UserTokens }
