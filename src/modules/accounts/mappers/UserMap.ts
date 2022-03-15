import { User } from '@modules/accounts/models/User'

import { instanceToInstance } from 'class-transformer'

interface IUserResponseDTO {
  id: string
  name: string
  email: string
  avatar: string
  avatar_url(): string
  driver_license: string
}

type TToDTO = (data: User) => IUserResponseDTO

class UserMap {
  static toDTO: TToDTO = ({
    avatar,
    avatar_url,
    driver_license,
    name,
    email,
    id
  }) =>
    instanceToInstance({ id, avatar, avatar_url, driver_license, name, email })
}

export { UserMap }
