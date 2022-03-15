import { Rental } from '@modules/rentals/infra/typeorm/models/Rental'
import { IRentalRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalRepository'
import { RentalRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository'

import { inject, injectable } from 'tsyringe'

@injectable()
class ReadRentalsByUserService {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    return this.rentalRepository.findByUser(user_id)
  }
}

export { ReadRentalsByUserService }
