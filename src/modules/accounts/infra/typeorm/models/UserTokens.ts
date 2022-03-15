import { User } from './User'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @Column()
  expires_date: Date

  @Column()
  refresh_token: string

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { UserTokens }
