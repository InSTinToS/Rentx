import { Rental } from '../models/Rental'
import { ICreateRentalDTO, IRentalRepository } from './IRentalRepository'

import { getRepository, Repository } from 'typeorm'

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ where: { user_id }, relations: ['car'] })
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id, end_date: null } })
  }

  async create(createData: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(createData)
    await this.repository.save(rental)
    return rental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id, end_date: null } })
  }
}

export { RentalRepository }
