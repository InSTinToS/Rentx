import { Category } from './Category'
import { Specification } from './Specification'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('cars')
class Car {
  @PrimaryColumn()
  id?: string

  @Column()
  category_id?: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column()
  daily_rate: number

  @Column()
  fine_amount: number

  @Column()
  license_plate: string

  @Column()
  available: boolean

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: Specification[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.available = true
    }
  }
}

export { Car }
