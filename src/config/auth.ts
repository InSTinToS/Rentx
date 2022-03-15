import { UnitTypeShort } from 'dayjs'

interface Token {
  secret: string
  expires_in: number
  expires_unit: UnitTypeShort
}

interface Auth {
  token: Token
  refresh_token: Token
}

const auth: Auth = {
  token: {
    expires_in: 15,
    expires_unit: 'm',
    secret: process.env.JWT_TOKEN_SECRET
  },
  refresh_token: {
    expires_in: 30,
    expires_unit: 'd',
    secret: process.env.JWT_REFRESH_TOKEN_SECRET
  }
}

export default auth
