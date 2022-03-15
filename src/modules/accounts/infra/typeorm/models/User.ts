import { Expose } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  avatar: string

  @Column()
  password: string

  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  created_at: Date

  @Column()
  driver_license: string

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    const avatarUrl = `/avatar/${this.avatar}`

    return process.env.LOCAL_STORAGE === 'true'
      ? `${process.env.BASE_URL}${avatarUrl}`
      : `${process.env.AWS_BUCKET_URL}${avatarUrl}`
  }

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { User }
