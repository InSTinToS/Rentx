import { Car } from '@modules/cars/infra/typeorm/models/Car'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 } from 'uuid'

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car

  @Column()
  total: number

  @Column()
  expected_date: Date

  @Column()
  car_id: string

  @Column()
  user_id: string

  @Column()
  end_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  start_date: Date

  constructor() {
    if (!this.id) this.id = v4()
  }
}

export { Rental }
