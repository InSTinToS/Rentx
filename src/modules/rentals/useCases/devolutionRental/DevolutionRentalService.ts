import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/cars/ICarsRepository'
import { IRentalRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalRepository'

import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id)
    if (!rental) throw new AppError('Rental does not exist', 400)

    const car = await this.carsRepository.findById(rental.car_id)
    if (!car) throw new AppError('Car of this rental does not exist', 400)

    const minimumDaily = 1
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compare(rental.start_date, dateNow, 'd')
    if (daily <= 0) daily = minimumDaily

    let total = 0
    const delay = this.dateProvider.compare(dateNow, rental.expected_date, 'd')

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount
      total = calculateFine
    }

    total += daily * car.daily_rate
    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(rental.car_id, true)

    return true
  }
}

export { DevolutionRentalService }
